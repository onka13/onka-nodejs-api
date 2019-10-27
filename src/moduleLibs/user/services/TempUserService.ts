import UserRepository from '../repositories/UserRepository';
import ServiceResult from '../../../domain/business/serviceResult';
import ServiceResultCodes from '../../../domain/business/serviceResultCodes';

class TempUserService {
	repository: UserRepository;
	constructor() {
		this.repository = new UserRepository();
	}
	async sample(): Promise<ServiceResult<string>> {
		var response = ServiceResult.instance().errorResult(ServiceResultCodes.GenericError);

		return response;
	}
}

export default new TempUserService();
