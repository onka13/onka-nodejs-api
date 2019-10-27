import DeviceRegisterEntity from '../entities/DeviceEntity';
import ServiceResult from '../../../domain/business/serviceResult';
import ServiceResultCodes from '../../../domain/business/serviceResultCodes';
import AppSettingRepository from '../repositories/AppSettingRepository';
import { DeviceType } from '../enums/DeviceType';
import DeviceRepository from '../repositories/DeviceRepository';
import { DeviceStatus } from '../enums/DeviceStatus';
import { createInstance } from '../../../infra/utils';
import TokenResponse from '../models/TokenResponse';
import { getHash } from '../../../business/managers/CryptoManager';
import config from '../../../config';
import JwtManager from '../../../business/managers/JwtManager';
import AuthMobileData from '../models/AuthMobileData';

/**
 * Service for mobile app business
 */
class DeviceService {
	repository: DeviceRepository;
	appSettingRepository: AppSettingRepository; 
	constructor() {
		this.repository = new DeviceRepository();
		this.appSettingRepository = new AppSettingRepository();
	}
	/**
	 * Register device and generate token
	 * 
	 * @param deviceModel 
	 * @param hash 
	 */
	async register(deviceModel: DeviceRegisterEntity, hash: string): Promise<ServiceResult<TokenResponse>> {
		var response = ServiceResult.instance(TokenResponse).errorResult(ServiceResultCodes.GenericError);

		if (!deviceModel || !hash) return response.errorResult(ServiceResultCodes.InvalidParameter);

		// check hash
		if (!this.checkHash(deviceModel, hash)) {
			return response.errorResult(ServiceResultCodes.InvalidHash);
		}

		const appSetting = await this.appSettingRepository.getById(deviceModel.appId);
		// force update
		var minVersion = deviceModel.osType == DeviceType.Ios ? appSetting.iosMinVersion : appSetting.androidMinVersion;
		if (deviceModel.appVersion < minVersion) return response.errorResult(ServiceResultCodes.ForceUpdate);

		var registerEntity = await this.repository.get(x => x.deviceId == deviceModel.deviceId);
		if (registerEntity == null) {
			// first install
			deviceModel.registerKey = 'k' + new Date().getTime();
			registerEntity = await this.repository.add(deviceModel);
		} else {
			if (registerEntity.registerKey != deviceModel.registerKey) {
				// client: compute hash with this key then call register again
				return response.errorResult(ServiceResultCodes.InvalidRegisterKey).setValue({ registerKey: registerEntity.registerKey });
			}

			if (registerEntity.status == DeviceStatus.Blocked) return response.errorResult(ServiceResultCodes.DeviceBlocked);

			if (!this.checkHash(registerEntity, hash)) {
				// something changed in device
				registerEntity.registerKey = 'k' + new Date().getTime();
				registerEntity.appVersion = deviceModel.appVersion;
				registerEntity.osVersion = deviceModel.osVersion;
				registerEntity.ipAddress = deviceModel.ipAddress;
				await this.repository.update(registerEntity);
			}
		}

		// create token
		let token = await JwtManager.createToken(
			JwtManager.mobileSecret,
			createInstance(AuthMobileData, {
				registerId: deviceModel.id,
				appId: deviceModel.appId,
			}),
			'10m',
		);

		return response.successResult({
			token,
			registerKey: deviceModel.registerKey,
			registerId: deviceModel.id,
		});
	}
	/**
	 * Validates hash
	 * 
	 * @param deviceModel 
	 * @param hash 
	 */
	checkHash(deviceModel: DeviceRegisterEntity, hash: string) {
		let msg = this.getHashMsg(deviceModel);
		let computedHash = getHash(msg, config.jwtMobileKey);
		return computedHash == hash;
	}
	/**
	 * Union text to generate hash
	 * 
	 * @param deviceModel 
	 */
	getHashMsg(deviceModel: DeviceRegisterEntity) {
		// generate this text as same as in mobile app. make it complicated as possible for security issues!
		var registerKey = deviceModel.registerKey || deviceModel.appId;
		return registerKey + '_' + deviceModel.appId + '.' + deviceModel.appVersion + '.' + deviceModel.osVersion + '.' + deviceModel.osType;
	}
}

export default new DeviceService();
