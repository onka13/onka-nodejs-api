import jwtManager from '../../business/managers/JwtManager';
import { Request, Response, NextFunction } from 'express';
import ServiceResultCodes from '../../domain/business/serviceResultCodes';
import ServiceResult from '../../domain/business/serviceResult';
import AuthMobileData from '../../moduleLibs/mobile/models/AuthMobileData';

/**
 * Middleware for mobile device authentication.
 * Reads token from 'token' parameter in request header.
 * Validates token then if expire an error response will be send. (-20: NewToken)
 * If token is live pass 'AuthMobileData' to the Request object then go to next request handler. 
 * 
 * This token creates by 'mobile/device/register'.
 */
const mobileToken = async (req: Request, res: Response, next: NextFunction) => {
	let token = req.header('token');
	if (!token) return next(ServiceResult.instance().errorResult(ServiceResultCodes.NewToken));

	let data = await jwtManager.verifyToken(jwtManager.mobileSecret, token);
	if (!data) return next(ServiceResult.instance().errorResult(ServiceResultCodes.NewToken));
	req.mobileData = data as AuthMobileData;
	next();
};

export default mobileToken;
