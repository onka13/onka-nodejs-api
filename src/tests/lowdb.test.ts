import low from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync';
import AppSettingEntity from '../moduleLibs/mobile/entities/AppSettingEntity';
import LowDbHelper from '../business/helpers/LowDbHelper';
import DeviceRegisterEntity from '../moduleLibs/mobile/entities/DeviceEntity';
import { DeviceType } from '../moduleLibs/mobile/enums/DeviceType';
import { DeviceStatus } from '../moduleLibs/mobile/enums/DeviceStatus';

const adapter = new FileAsync('db.json');

test('lowdb_write', async () => {
	const db = await low(adapter);
	const entity: AppSettingEntity = {
		id: 1,
		iosMinVersion: 1,
		androidMinVersion: 1,
		iosLastVersion: 1,
		androidLastVersion: 1,
		enabled: false,
	};

	db.defaults({ appSettings: [] }).write();

	let val = db
		.get('appSetting')
		.push(entity)
		.write();

	expect(entity).toEqual(val);
});

test('lowdb_read', async () => {
	const db = await low(adapter);
	let val = await db
		.get('appSettings')
		.first({ id: 1 })
		.value();

	expect(val).not.toBeNull();
	expect(val.id).toEqual(1);
});

test('lowdb_defaults', async () => {
	const db = await low(adapter);
	await db.defaults({ test1: [] }).write();
});

test('lowdb_helper', async () => {
	let helper = await LowDbHelper.instance<DeviceRegisterEntity>('DeviceEntity');
	helper.writeDefault();
	let entity: DeviceRegisterEntity = {
		id: new Date().getTime(),
		appId: 1,
		appVersion: 1,
		deviceId: '123',
		ipAddress: '127.0.0.1',
		osType: DeviceType.WindowsMobile,
		osVersion: '1.1',
		status: DeviceStatus.Active,
	};
	let val = await helper.add(entity);
	expect(entity).toEqual(val);
});

test('lowdb_helper_get', async () => {
	let helper = await LowDbHelper.instance<DeviceRegisterEntity>('DeviceEntity');
	let entity = await helper.getById(1571612570747);
	console.log('entity', entity.id);
});

test('lowdb_get_lambda', async () => {
	let helper = await LowDbHelper.instance<DeviceRegisterEntity>('DeviceEntity');
	let entity = await helper.getById(x => x.id == 1571612570747);
	console.log('entity', entity.id);
});
