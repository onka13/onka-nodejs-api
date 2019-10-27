import express, { Response, Request, NextFunction } from 'express';
import { requestHandlerWrapper } from '../../../business/helpers/apiHelper';
import UserService from '../../../moduleLibs/user/services/UserService';
import { LoginProvider } from '../../../moduleLibs/user/enums/LoginProvider';
import middlewares from '../../middlewares';
import ServiceResult from '../../../domain/business/serviceResult';
const router = express.Router();

router.use(middlewares.mobileToken);

/**
 * Signin user with email and password.
 *
 * method post
 *
 * body parameters;
 * @param email user email
 * @param password user password
 *
 * @returns { [[ServiceResult<{ userId, emailConfirmed, email, access_token, expires_in:(secs) }>]] }
 */
router.post(
	'/login',
	requestHandlerWrapper(async (req: Request, res: Response, next: NextFunction) => {
		var result = await UserService.login(req.deviceType, req.body.email, req.body.password);
		res.json(result);
	}),
);

/**
 * Signup user with email and password.
 *
 * method post
 *
 * body parameters;
 * @param name user name
 * @param email user email
 * @param password user password
 *
 * @returns { [[ServiceResult<{ userId, emailConfirmed, email, access_token, expires_in:(secs)}>]] }
 */
router.post(
	'/register',
	requestHandlerWrapper(async (req: Request, res: Response, next: NextFunction) => {
		var result = await UserService.register(req.body.name, req.body.email, req.body.password, req.deviceType, LoginProvider.None, '', '', null);
		res.json(result);
	}),
);

export default router;
