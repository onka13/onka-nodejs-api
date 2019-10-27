import moment from 'moment';

/**
 * Generates guid
 */
export function uuidv4() :string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

/**
 * Created instance of the type with partial fields 
 * 
 * @param type Data type 
 * @param data Partial data of `type`
 */
export function createInstance<T>(type: new () => T, data: Partial<T>) {
	return { ...new type(), ...data };
}

/**
 * Returns ISO format
 * 
 * @param date Date
 */
export const dateToString = date => {
	return moment(date).toISOString();
};
