import UserRepository from '../repositories/UserRepository';
import ServiceResult from '../../../domain/business/serviceResult';
import ServiceResultCodes from '../../../domain/business/serviceResultCodes';
import { DeviceType } from '../../mobile/enums/DeviceType';
import { LoginProvider } from '../enums/LoginProvider';
import UserLoginRepository from '../repositories/UserLoginRepository';
import { createInstance, uuidv4 } from '../../../infra/utils';
import UserEntity from '../entities/UserEntity';
import UserLoginProviderEntity from '../entities/UserLoginProviderEntity';
import { UserStatus } from '../enums/UserStatus';
import { encrypt } from '../../../business/managers/CryptoManager';
import moment = require('moment');
import JwtManager from '../../../business/managers/JwtManager';
import SignInUserResponseModel from '../models/SignInUserResponseModel';
import UserTokenData from '../models/UserTokenData';
import config from '../../../config';

/**
 * User Business Logic
 */
class UserService {
	repository: UserRepository;
	providerRepository: UserLoginRepository;
	constructor() {
		this.repository = new UserRepository();
		this.providerRepository = new UserLoginRepository();
	}
	/**
	 * Signup a user
	 *
	 * @param name
	 * @param email
	 * @param password
	 * @param device
	 * @param provider
	 * @param providerKey
	 * @param token
	 * @param expireDate
	 */
	async register(
		name: string,
		email: string,
		password: string,
		device: DeviceType,
		provider: LoginProvider,
		providerKey: string,
		token: string,
		expireDate: string,
	): Promise<ServiceResult<SignInUserResponseModel>> {
		const response = ServiceResult.instance<SignInUserResponseModel>().errorResult(ServiceResultCodes.GenericError);
		let user = await this.repository.get(x => x.email == email);
		if (user && user.id > 0) {
			if (provider == LoginProvider.None) {
				return this.login(device, email, password);
			}
			var login = await this.providerRepository.get(
				x => x.userId == user.id && x.device == device && x.provider == provider && x.providerKey == providerKey,
			);
			if (login != null) {
				login.token = token;
				login.expireDate = expireDate;
				await this.providerRepository.update(login);
			} else {
				await this.providerRepository.add(
					createInstance(UserLoginProviderEntity, {
						userId: user.id,
						device,
						provider,
						providerKey,
						token,
						expireDate,
					}),
				);
			}
		} else {
			var emailConfirmed = false;
			if (provider == LoginProvider.Facebook || provider == LoginProvider.Google) emailConfirmed = true;
			var passwordHash = null;
			if (provider == LoginProvider.None) {
				passwordHash = encrypt(password, config.passSecret);
			}
			user = createInstance(UserEntity, {
				name,
				email,
				passwordHash,
				emailConfirmed,
				LockoutEnabled: true,
				SecurityStamp: uuidv4(),
				status: UserStatus.Active,
			});
			await this.repository.add(user);
			await this.providerRepository.add(
				createInstance(UserLoginProviderEntity, {
					userId: user.id,
					device,
					provider,
					providerKey,
					token,
					expireDate,
				}),
			);
		}
		return this.signInUser(device, user.id, user.email, moment.duration(1, 'days').asSeconds(), provider, providerKey, user.emailConfirmed);
	}
	/**
	 * Sign in a user
	 *
	 * @param device
	 * @param email
	 * @param password
	 */
	async login(device: DeviceType, email: string, password: string): Promise<ServiceResult<SignInUserResponseModel>> {
		var response = ServiceResult.instance(SignInUserResponseModel).errorResult(ServiceResultCodes.GenericError);

		var user = await this.repository.get(x => x.email == email);
		if (!user || user.status != UserStatus.Active) {
			return response.errorResult(ServiceResultCodes.UserNotFound);
		}

		if (user.LockoutEnabled && moment(user.LockoutEndDateUtc).diff(moment(), 'minutes') > 0) {
			return response.errorResult(ServiceResultCodes.UserLockout);
		}

		var hash = encrypt(password, config.passSecret);
		if (user.passwordHash != hash) {
			if (user.LockoutEnabled && user.AccessFailedCount % 5 == 4) {
				user.LockoutEndDateUtc = moment(user.LockoutEndDateUtc)
					.add(10, 'minutes')
					.toISOString();
			}
			user.AccessFailedCount++;
			this.repository.update(user);
			return response.errorResult(ServiceResultCodes.InvalidPassword);
		}

		return this.signInUser(device, user.id, user.email, moment.duration(1, 'days').asSeconds(), LoginProvider.None, '', user.emailConfirmed);
	}
	/**
	 * Returns access token
	 *
	 * @param device
	 * @param userId
	 * @param email
	 * @param expireInSeconds
	 * @param provider
	 * @param providerKey
	 * @param emailConfirmed
	 */
	async signInUser(
		device: DeviceType,
		userId: number,
		email: string,
		expireInSeconds: number,
		provider: LoginProvider,
		providerKey: string,
		emailConfirmed: boolean,
	): Promise<ServiceResult<SignInUserResponseModel>> {
		var access_token = await JwtManager.createToken(
			JwtManager.userSecret,
			createInstance(UserTokenData, {
				provider,
				providerKey,
				userId,
				email,
			}),
			expireInSeconds + 'seconds',
		);

		return ServiceResult.instance(SignInUserResponseModel).successResult({
			userId,
			emailConfirmed,
			email,
			access_token,
			expires_in: expireInSeconds,
			token_type: 'bearer',
		});
	}
	async me(userId: number) {
		var response = ServiceResult.instance(UserEntity).errorResult(ServiceResultCodes.GenericError);

		var user = await this.repository.get(x => x.id == userId);
		return response.successResult({
			id: user.id,
			emailConfirmed: user.emailConfirmed,
			name: user.name,
		});
	}
}

export default new UserService();
