export interface Response<T> {
	code: number;
	error: string;
	res: T;
}
