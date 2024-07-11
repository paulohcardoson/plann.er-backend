import { inject, injectable } from "tsyringe";

import ITripsRepository from "../repositories/ITripsRepository";
import TripDoesNotExist from "@base/shared/errors/customs/TripDoesNotExist";

interface IRequest {
	trip_id: string;
}

@injectable()
class FindTripService {
	constructor(
		@inject("TripsRepository")
		private tripsRepository: ITripsRepository,
	) {}

	async execute({ trip_id }: IRequest) {
		const trip = await this.tripsRepository.findById(trip_id, {
			select: {
				id: true,
				destination: true,
				starts_at: true,
				ends_at: true,
				is_confirmed: true,
			},
		});

		if (!trip) {
			throw new TripDoesNotExist();
		}

		return trip;
	}
}

export default FindTripService;
