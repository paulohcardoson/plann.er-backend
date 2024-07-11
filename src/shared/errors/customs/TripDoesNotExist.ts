import AppError from "../AppError";

class TripDoesNotExist extends AppError {
	constructor() {
		super("Trip doesn't exist", 400);
	}
}

export default TripDoesNotExist;
