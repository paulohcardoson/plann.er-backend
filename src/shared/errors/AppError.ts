class AppError {
	message: string = "Algo deu errado.";
	code: number;

	constructor(message: string, code = 400) {
		this.message = message;
		this.code = code;
	}
}

export default AppError;
