/**
 * Common structure for all service and api responses.
 */
export default class ServiceResult<T> {
	success: boolean;
	code: number;
	message: string;
	value: T;

	static instance<T = any>(type?: { new (): T }): ServiceResult<T> {
		var result = new ServiceResult<T>();
		//result.value = new type();
		return result;
	}

	public errorResult(resultCode: number = 0, message: string = ''): ServiceResult<T> {
		return this.setResult(false, resultCode, message);
	}

	public successResult(resultValue: Partial<T>, resultCode: number = 0): ServiceResult<T> {
		this.value = { ...this.value, ...resultValue };//x
		return this.setResult(true, resultCode, null);
	}
	public setValue(resultValue: Partial<T>): ServiceResult<T> {
		this.value = { ...this.value, ...resultValue };
		return this;
	}
	private setResult(success: boolean, code: number, message: string): ServiceResult<T> {
		this.success = success;
		this.code = code;
		this.message = message;
		return this;
	}
}
