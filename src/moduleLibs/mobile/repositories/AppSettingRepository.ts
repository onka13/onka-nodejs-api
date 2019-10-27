import AppSettingEntity from '../entities/AppSettingEntity';
import LowDbRepository from '../../common/LowDbRepository';

class AppSettingRepository extends LowDbRepository<AppSettingEntity> {
	constructor() {
		super();
		this.init('appSettings');
	}
}

export default AppSettingRepository;
