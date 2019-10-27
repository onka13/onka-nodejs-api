import { Request, Response, NextFunction } from 'express';
import { DeviceType } from '../../moduleLibs/mobile/enums/DeviceType';

/**
 * This is the wrapper handler for all routes.
 * Provides final error handler and sets some request parameters
 */
export const requestHandlerWrapper = fn => (req: Request, res: Response, next: NextFunction) => {
	req.deviceType =  DeviceType.Android; //parseInt(req.header('device')) as DeviceType;
	return fn(req, res, next).catch(next);
};
