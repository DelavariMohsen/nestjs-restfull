export class ResponseResult<T> {
	data: T | T[];
	code: number;
	error: string;
	totalItems: number;

	constructor(init?: Partial<ResponseResult<T>>) {
		Object.assign(this, init);
	}

	static error(errorMessage: any | any[], errorCode = 404): ResponseResult<any | any[]> {
		return new ResponseResult({
			code: errorCode,
			error: errorMessage,
		});
	}

	static success<T>(data: T[]): ResponseResult<T>;
	static success<T>(data: T): ResponseResult<T>;

	static success<T>(data: T | T[]): ResponseResult<T> {
		return new ResponseResult<T>({
			data,
		});
	}
}
