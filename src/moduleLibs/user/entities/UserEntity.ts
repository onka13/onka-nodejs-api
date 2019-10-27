import EntityBase from '../../../domain/entity/EntityBase';
import { UserStatus } from '../enums/UserStatus';

export default class UserEntity extends EntityBase {
	email: string;
	emailConfirmed: boolean;
	passwordHash: string;
	LockoutEnabled: boolean;
	LockoutEndDateUtc: string;
	AccessFailedCount: number;
	PhoneNumber: string;
	PhoneNumberConfirmed: boolean;
	SecurityStamp: string;
	name: string;
	status: UserStatus;
}
