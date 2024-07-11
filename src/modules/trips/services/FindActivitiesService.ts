import { inject, injectable } from "tsyringe";

import ITripsRepository from "../repositories/ITripsRepository";
import TripDoesNotExist from "@base/shared/errors/customs/TripDoesNotExist";

interface IRequest {
	trip_id: string;
}

@injectable()
class FindActivitiesService {
	constructor(
		@inject("TripsRepository")
		private tripsRepository: ITripsRepository,
	) {}

	async execute({ trip_id }: IRequest) {
		const trip = await this.tripsRepository.findById(trip_id, {
			relations: { activities: true },
			order: {
				activities: {
					occurs_at: {
						direction: "asc",
					},
				},
			},
		});

		if (!trip) {
			throw new TripDoesNotExist();
		}

		return trip.activities;
	}
}

export default FindActivitiesService;
