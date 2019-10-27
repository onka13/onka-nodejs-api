import LowDbRepository from '../../common/LowDbRepository';
import UserEntity from '../entities/UserEntity';

class UserRepository extends LowDbRepository<UserEntity> {
	constructor() {
		super();
		this.init('users');
	}
}

export default UserRepository;
