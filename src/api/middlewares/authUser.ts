import jwtManager from '../../business/managers/JwtManager';
import { Request, Response, NextFunction } from 'express';
import ServiceResultCodes from '../../domain/business/serviceResultCodes';
import ServiceResult from '../../domain/business/serviceResult';
import config from '../../config';
import UserTokenData from '../../moduleLibs/user/models/UserTokenData';

/**
 * Middleware for user authentication.
 * Reads token from authorization in request header.
 * Validates token then if expire an error response will be send. (-30: LoginUser)
 * If token is live pass 'UserTokenData' to the Request object then go to next request handler. 
 * 
 * This token creates by 'user/account/login' or 'user/account/register'.
 */
const authUser = async (req: Request, res: Response, next: NextFunction) => {
	const authorization = (req.headers.authorization || '').split(' ');
	if (authorization[0] != 'Bearer' || authorization.length != 2) return next(ServiceResult.instance<string>().errorResult(ServiceResultCodes.LoginUser));

	const data = await jwtManager.verifyToken(config.jwtUserKey, authorization[1].trim());
	if (!data) return next(ServiceResult.instance().errorResult(ServiceResultCodes.LoginUser));
	req.user = data as UserTokenData;
	//console.log('user data', data);
	next()
};

export default authUser;
