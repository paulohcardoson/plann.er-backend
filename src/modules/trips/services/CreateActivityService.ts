import { inject, injectable } from "tsyringe";

import IDateManagerProvider from "@base/shared/container/providers/DateManagerProvider/models/IDateManagerProvider";
import AppError from "@base/shared/errors/AppError";

import ITripsRepository from "../repositories/ITripsRepository";
import IActivitiesRepository from "../repositories/IActivitiesRepository";
import TripDoesNotExist from "@base/shared/errors/customs/TripDoesNotExist";

interface IRequest {
	trip_id: string;
	title: string;
	occurs_at: Date;
}

@injectable()
class CreateActivityService {
	constructor(
		@inject("TripsRepository")
		private tripsRepository: ITripsRepository,

		@inject("TripsActivitiesRepository")
		private activitesRepository: IActivitiesRepository,

		@inject("DateManagerProvider")
		private dateManagerProvider: IDateManagerProvider,
	) {}

	async execute({ trip_id, title, occurs_at }: IRequest) {
		const trip = await this.tripsRepository.findById(trip_id, {
			select: {
				id: true,
				starts_at: true,
				ends_at: true,
			},
		});

		if (!trip) {
			throw new TripDoesNotExist();
		}

		const isBeforeStartDate = this.dateManagerProvider.isBefore(
			occurs_at,
			trip.starts_at,
		);
		const isAfterEndDate = this.dateManagerProvider.isAfter(
			occurs_at,
			trip.ends_at,
		);

		if (isBeforeStartDate || isAfterEndDate) {
			throw new AppError("Invalid activity date");
		}

		const activity = await this.activitesRepository.create({
			title,
			occurs_at,
			trip,
		});

		return activity;
	}
}

export default CreateActivityService;
