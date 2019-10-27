import DeviceRegisterEntity from '../entities/DeviceEntity';
import LowDbRepository from '../../common/LowDbRepository';

class DeviceRepository extends LowDbRepository<DeviceRegisterEntity> {
	constructor() {
		super();
		this.init('devices');
	}
}

export default DeviceRepository;
