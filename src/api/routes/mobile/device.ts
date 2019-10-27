import express, { Request, Response, NextFunction } from 'express';
import { requestHandlerWrapper } from '../../../business/helpers/apiHelper';
import DeviceService from '../../../moduleLibs/mobile/services/DeviceService';
import DeviceRegisterEntity from '../../../moduleLibs/mobile/entities/DeviceEntity';
import ServiceResult from '../../../domain/business/serviceResult';
const router = express.Router();

/**
 * Register mobile device details.
 * Mobile app sends device details and an encypted hash. Encyption of hash is special and complicated.
 * App and api has same algorithm. App code is obfuscated but of course it can be resolvable. 
 * Therefore in mobile app this function must be very complicated!
 * 
 * method post
 * 
 * body parameters;
 * @param appId Application id
 * @param deviceId: Device unique id
 * @param osVersion: device os version
 * @param appVersion: app version installed in device
 * @param brand?: device brand
 * @param model?: device model
 * @param osType: device os
 * @param registerKey defined key in DeviceRegisterEntity. empty for first call
 * 
 * @returns { [[ServiceResult<{ token, registerKey, registerId }>]] }
 */
router.post(
	'/register',
	requestHandlerWrapper(async (req: Request, res: Response, next: NextFunction) => {
		var model = req.body as DeviceRegisterEntity;
		model.ipAddress = req.ip;
		var hash = req.body.hash;
		var result = await DeviceService.register(model, hash);
		res.json(result);
	}),
);
export default router;
