import LowDbRepository from '../../common/LowDbRepository';
import UserEntity from '../entities/TempEntity';

class TempRepository extends LowDbRepository<UserEntity> {
	constructor() {
		super();
		this.init('temps');
	}
}

export default TempRepository;
