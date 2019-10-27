import LowDbRepository from '../../common/LowDbRepository';
import UserLoginProviderEntity from '../entities/UserLoginProviderEntity';

class UserLoginRepository extends LowDbRepository<UserLoginProviderEntity> {
	constructor() {
		super();
		this.init('userLoginProviders');
	}
}

export default UserLoginRepository;
