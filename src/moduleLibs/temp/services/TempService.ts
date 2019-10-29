import TempRepository from '../repositories/TempRepository';
import ServiceResult from '../../../domain/business/serviceResult';
import ServiceResultCodes from '../../../domain/business/serviceResultCodes';

class TempService {
	repository: TempRepository;
	constructor() {
		this.repository = new TempRepository();
	}
	async sample(): Promise<ServiceResult<string>> {
		var response = ServiceResult.instance().errorResult(ServiceResultCodes.GenericError);
		return response.successResult({ msg: 'temp module' });
	}
}

export default new TempService();
