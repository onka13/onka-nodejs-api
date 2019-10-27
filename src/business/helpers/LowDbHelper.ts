import lowdb from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync';
import EntityBase from '../../domain/entity/EntityBase';

/**
 * Helper class for managing data storing in json files.
 * ! This lowdb is only for development env.
 * We don not suggest to use in production.
 */
const low = { adapter: undefined, db: undefined };
low.adapter = new FileAsync('db.json');
lowdb(low.adapter).then(db => {
	low.db = db;
});
export default class LowDbHelper<T extends EntityBase> {
	tableName;
	tableNameStat;
	private constructor() {}

	static instance<T1 extends EntityBase>(name: string): LowDbHelper<T1> {
		const helper = new LowDbHelper<T1>();
		helper.tableName = name;
		helper.tableNameStat = '_' + name;
		return helper;
	}
	private async init() {
		await this.writeDefault();
	}
	async writeDefault() {
		await low.db.defaults({ [this.tableName]: [], [this.tableNameStat]: { lastId: 0 } }).write();
	}
	async getStat(autoIncrement = false) {
		await this.init()
		let stat = await low.db.get(this.tableNameStat).value();
		if (autoIncrement) {
			stat.lastId = stat.lastId + 1;
			await low.db.set(this.tableNameStat + '.lastId', stat.lastId).write();
		}
		return stat;
	}
	async get(filter: (arg0: T) => boolean): Promise<T> {
		return (await low.db
			.get(this.tableName)
			.first(filter)
			.value()) as T;
	}
	async getById(id): Promise<T> {
		return (await low.db
			.get(this.tableName)
			.first({ id })
			.value()) as T;
	}
	async add(entity: T) {
		await this.init();
		const stat = await this.getStat(true);
		entity.id = stat.lastId;
		return await low.db
			.get(this.tableName)
			.push(entity)
			.write();
	}
	async update(entity: T) {
		await this.init();
		return await low.db
			.get(this.tableName)
			.find(x => x.id == entity.id)
			.assign(entity)
			.write();
	}
	async find(filter: (arg0: T) => boolean) {
		return await low.db
			.get(this.tableName)
			.find(filter)
			.value();
	}
	async list(filter: (arg0: T) => boolean, skip: number, take: number) {
		return await low.db
			.get(this.tableName)
			.filter(filter)
			.skip(skip)
			.take(take)
			.value();
	}
}
