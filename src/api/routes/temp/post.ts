import express, { Request, Response, NextFunction } from 'express';
import middlewares from '../../middlewares';
import { requestHandlerWrapper } from '../../../business/helpers/apiHelper';
import TempService from '../../../moduleLibs/temp/services/TempService';
const router = express.Router();

// router.use(middlewares.mobileToken, middlewares.authUser);

router.get(
	'/list',
	requestHandlerWrapper(async (req: Request, res: Response, next: NextFunction) => {
		var result = await TempService.sample();
		res.json(result);
	}),
);

export default router;
