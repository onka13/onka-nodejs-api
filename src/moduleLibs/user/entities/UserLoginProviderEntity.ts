import EntityBase from '../../../domain/entity/EntityBase';
import { LoginProvider } from '../enums/LoginProvider';
import { DeviceType } from '../../mobile/enums/DeviceType';

export default class UserLoginProviderEntity extends EntityBase {
	userId: number;
	provider: LoginProvider;
	providerKey: string;
	token: string;
	device: DeviceType;
	expireDate: string;
}
