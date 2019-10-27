import EntityBase from '../../../domain/entity/EntityBase';

export default class AppSettingEntity extends EntityBase {
	iosMinVersion: number;
	androidMinVersion: number;
	iosLastVersion: number;
	androidLastVersion: number;
	enabled: boolean;
}
