import { DeviceType } from '../enums/DeviceType';
import { DeviceStatus } from '../enums/DeviceStatus';
import EntityBase from '../../../domain/entity/EntityBase';

export default class DeviceRegisterEntity extends EntityBase {
	appId: number;
	deviceId: string;
	osVersion: string;
	appVersion: number;
	brand?: string;
	model?: string;
	osType: DeviceType;
	ipAddress: string;
	registerKey?: string;
	status: DeviceStatus;
}
