import LowDbHelper from '../../business/helpers/LowDbHelper';
import EntityBase from '../../domain/entity/EntityBase';

/**
 * Repository class for lowdb
 */
export default class LowDbRepository<T extends EntityBase> {
	repository: LowDbHelper<T>;
	init(name) {
		this.repository = LowDbHelper.instance<T>(name)
	}
	async getById(id: number): Promise<T> {
		return this.repository.getById(id);
	}
	async get(filter: (arg0: T) => boolean): Promise<T> {
		return this.repository.get(filter);
	}
	async add(entity: T) {
		return this.repository.add(entity);
	}
	async update(entity: T) {
		return this.repository.update(entity);
	}
	async find(filter: (arg0: T) => boolean) {
		return this.repository.find(filter);
	}
	async list(filter: (arg0: T) => boolean, skip: number, take: number) {
		return this.repository.list(filter, skip, take);
	}
}
