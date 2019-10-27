import { DeviceType } from '../../moduleLibs/mobile/enums/DeviceType';
import UserTokenData from '../../moduleLibs/user/models/UserTokenData';
import AuthMobileData from '../../moduleLibs/mobile/models/AuthMobileData';

/**
 * Declare extra types for Express
 * 
 * Check [[requestHandlerWrapper]] for deviceType 
 * Check user middleware [[authUser]] for user
 * Check mobileToken middleware [[mobileToken]] for mobileData
 */
declare module 'express-serve-static-core' {
	interface Request {
		deviceType: DeviceType;
		user: UserTokenData;
		mobileData: AuthMobileData;
	}
}
