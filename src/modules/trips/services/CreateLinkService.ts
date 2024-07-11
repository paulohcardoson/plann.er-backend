import { inject, injectable } from "tsyringe";

import ITripsRepository from "../repositories/ITripsRepository";
import ILinksRepository from "../repositories/ILinksRepository";
import TripDoesNotExist from "@base/shared/errors/customs/TripDoesNotExist";

interface IRequest {
	trip_id: string;
	title: string;
	url: string;
}

@injectable()
class CreateLinkService {
	constructor(
		@inject("TripsRepository")
		private tripsRepository: ITripsRepository,

		@inject("TripsLinksRepository")
		private linksRepository: ILinksRepository,
	) {}

	async execute({ trip_id, title, url }: IRequest) {
		const trip = await this.tripsRepository.findById(trip_id, {
			select: {
				id: true,
			},
		});

		if (!trip) {
			throw new TripDoesNotExist();
		}

		const link = await this.linksRepository.create({
			title,
			url,
			trip,
		});

		return link;
	}
}

export default CreateLinkService;
