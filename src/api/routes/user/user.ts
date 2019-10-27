import express, { Request, Response, NextFunction } from 'express';
import middlewares from '../../middlewares';
import { requestHandlerWrapper } from '../../../business/helpers/apiHelper';
import UserService from '../../../moduleLibs/user/services/UserService';
import ServiceResult from '../../../domain/business/serviceResult';
const router = express.Router();

/** 
 * All requests in this route will be validated
 * validate request from is our mobile app
 * validate user is loggedin
 */	
router.use(middlewares.mobileToken, middlewares.authUser);

/**
 * Gets user info
 * 
 * @returns { [[ServiceResult<{ id, emailConfirmed, name }>]] }
 */
router.get(
	'/me',
	requestHandlerWrapper(async (req: Request, res: Response, next: NextFunction) => {
		var result = UserService.me(req.user.userId);
		res.json(result);
	}),
);

export default router;
