import { inject, injectable } from "tsyringe";
import fs from "fs/promises";
import path from "path";
import { WEB_APP_URL } from "@base/shared/env";

import AppError from "@base/shared/errors/AppError";
import ITripsRepository from "../repositories/ITripsRepository";
import IMailProvider from "@base/shared/container/providers/MailProvider/models/IMailProvider";
import IMailTemplateCompilerProvider from "@base/shared/container/providers/MailTemplateCompilerProvider/models/IMailTemplateCompilerProvider";
import IDateManagerProvider from "@base/shared/container/providers/DateManagerProvider/models/IDateManagerProvider";
import TripDoesNotExist from "@base/shared/errors/customs/TripDoesNotExist";

interface IRequest {
	trip_id: string;
}

@injectable()
class ConfirmTripService {
	constructor(
		@inject("TripsRepository")
		private tripsRepository: ITripsRepository,

		@inject("DateManagerProvider")
		private dateManagerProvider: IDateManagerProvider,

		@inject("MailProvider")
		private mailProvider: IMailProvider,

		@inject("MailTemplateCompilerProvider")
		private mailTemplateCompilerProvider: IMailTemplateCompilerProvider,
	) {}

	async execute({ trip_id }: IRequest) {
		const trip = await this.tripsRepository.findById(trip_id, {
			select: {
				id: true,
				destination: true,
				starts_at: true,
				is_confirmed: true,
			},
			relations: { participants: true },
		});

		if (!trip) {
			throw new TripDoesNotExist();
		}

		if (trip.is_confirmed) {
			throw new AppError("Trip already confirmed");
		}

		await this.tripsRepository.update(trip_id, { is_confirmed: true });

		const confirmTripEmail = await fs.readFile(
			path.resolve(
				__dirname,
				"..",
				"views",
				"participant_trip_confirmation.hbs",
			),
			{ encoding: "utf-8" },
		);

		await Promise.all(
			trip.participants
				.filter((participant) => !participant.is_owner)
				.map(async (participant) => {
					await this.mailProvider.sendMail({
						to: participant.email,
						subject: "",
						html: this.mailTemplateCompilerProvider.compile(confirmTripEmail, {
							destination: trip.destination,
							formattedStartDate: this.dateManagerProvider.format(
								trip.starts_at,
								"LL",
							),
							formattedEndDate: this.dateManagerProvider.format(
								trip.ends_at,
								"LL",
							),
							confirmationLink: `${WEB_APP_URL}/participants/${participant.id}/confirm/`,
						}),
					});
				}),
		);
	}
}

export default ConfirmTripService;
