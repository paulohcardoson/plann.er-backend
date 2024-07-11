import { inject, injectable } from "tsyringe";

import ITripsRepository from "../repositories/ITripsRepository";
import TripDoesNotExist from "@base/shared/errors/customs/TripDoesNotExist";

interface IRequest {
	trip_id: string;
}

@injectable()
class FindParticipantsService {
	constructor(
		@inject("TripsRepository")
		private tripsRepository: ITripsRepository,
	) {}

	async execute({ trip_id }: IRequest) {
		const trip = await this.tripsRepository.findById(trip_id, {
			relations: { participants: true },
		});

		if (!trip) {
			throw new TripDoesNotExist();
		}

		return trip.participants;
	}
}

export default FindParticipantsService;
