import AppError from "../AppError";

class TripParticipantDoesNotExist extends AppError {
	constructor() {
		super("Participant doesn't exist", 400);
	}
}

export default TripParticipantDoesNotExist;
