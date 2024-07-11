import { inject, injectable } from "tsyringe";
import path from "path";
import fs from "fs";

import IDateManagerProvider from "@base/shared/container/providers/DateManagerProvider/models/IDateManagerProvider";
import AppError from "@base/shared/errors/AppError";
import IMailProvider from "@base/shared/container/providers/MailProvider/models/IMailProvider";

import DataSource from "@base/shared/infra/typeorm/databases/postgresql";
import TripsRepository from "../infra/typeorm/repositories/TripsRepository";
import Trip from "../infra/typeorm/entities/Trip";
import ICreateParticipantDTO from "@base/modules/trips/dtos/ICreateParticipantDTO";
import Participant from "@base/modules/trips/infra/typeorm/entities/Participant";
import ParticipantsRepository from "@base/modules/trips/infra/typeorm/repositories/ParticipantsRepository";
import IMailTemplateCompilerProvider from "@base/shared/container/providers/MailTemplateCompilerProvider/models/IMailTemplateCompilerProvider";
import { WEB_APP_URL } from "@base/shared/env";

interface IRequest {
	destination: string;
	starts_at: Date;
	ends_at: Date;
	owner: {
		name: string;
		email: string;
	};
	emails_to_invite: string[];
}

@injectable()
class CreateTripService {
	private tripConfirmationMailTemplate: string;

	constructor(
		@inject("DateManagerProvider")
		private dateManagerProvider: IDateManagerProvider,

		@inject("MailProvider")
		private mailProvider: IMailProvider,

		@inject("MailTemplateCompilerProvider")
		private mailTemplateCompilerProvider: IMailTemplateCompilerProvider,
	) {
		this.tripConfirmationMailTemplate = fs.readFileSync(
			path.resolve(__dirname, "..", "views", "trip_confirmation.hbs"),
			{ encoding: "utf-8" },
		);
	}

	async execute({
		destination,
		starts_at,
		ends_at,
		owner,
		emails_to_invite,
	}: IRequest) {
		const currentDate = new Date();

		// If start date is before current date
		if (this.dateManagerProvider.isBefore(starts_at, currentDate)) {
			throw new AppError("Invalid trip start date.");
		}

		// If end date is before start date
		if (this.dateManagerProvider.isBefore(ends_at, starts_at)) {
			throw new AppError("Invalid trip end date.");
		}

		// Undo in case of failure
		const trip = await DataSource.transaction(async (manager) => {
			const tripsRepository = new TripsRepository(manager.getRepository(Trip));
			const participantsRepository = new ParticipantsRepository(
				manager.getRepository(Participant),
			);

			const trip = await tripsRepository.create({
				destination,
				starts_at,
				ends_at,
			});
			const participants = await participantsRepository.createMany([
				{
					...owner,
					is_owner: true,
					is_confirmed: true,
					trip,
				},
				...emails_to_invite.map<ICreateParticipantDTO>((email) => ({
					email,
					trip,
				})),
			]);
			trip.participants = participants;
			return trip;
		});

		await this.mailProvider.sendMail({
			to: {
				name: owner.name,
				address: owner.email,
			},
			subject: `Confirme sua viagem para ${destination}`,
			html: this.mailTemplateCompilerProvider.compile(
				this.tripConfirmationMailTemplate,
				{
					destination,
					formattedStartDate: this.dateManagerProvider.format(starts_at, "LL"),
					formattedEndDate: this.dateManagerProvider.format(ends_at, "LL"),
					confirmationLink: `${WEB_APP_URL}/trips/${trip.id}/confirm`,
				},
			),
		});

		return trip;
	}
}

export default CreateTripService;
