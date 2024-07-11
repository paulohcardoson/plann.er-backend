import { inject, injectable } from "tsyringe";

import AppError from "@base/shared/errors/AppError";

import ITripsRepository from "../repositories/ITripsRepository";
import IDateManagerProvider from "@base/shared/container/providers/DateManagerProvider/models/IDateManagerProvider";
import TripDoesNotExist from "@base/shared/errors/customs/TripDoesNotExist";

interface IRequest {
	trip_id: string;
	destination: string;
	starts_at: Date;
	ends_at: Date;
}

@injectable()
class UpdateTripService {
	constructor(
		@inject("TripsRepository")
		private tripsRepository: ITripsRepository,

		@inject("DateManagerProvider")
		private dateManagerProvider: IDateManagerProvider,
	) {}

	async execute({ trip_id, ...data }: IRequest) {
		const currentDate = new Date();

		const trip = await this.tripsRepository.findById(trip_id, {
			select: { id: true },
		});

		if (!trip) {
			throw new TripDoesNotExist();
		}

		// If start date is before current date
		if (this.dateManagerProvider.isBefore(data.starts_at, currentDate)) {
			throw new AppError("Invalid trip start date.");
		}

		// If end date is before start date
		if (this.dateManagerProvider.isBefore(data.ends_at, data.starts_at)) {
			throw new AppError("Invalid trip end date.");
		}

		await this.tripsRepository.update(trip_id, data);

		trip.destination = data.destination;
		trip.starts_at = data.starts_at;
		trip.ends_at = data.ends_at;

		return trip;
	}
}

export default UpdateTripService;
