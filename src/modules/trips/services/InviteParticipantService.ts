import fs from "fs";
import path from "path";
import { inject, injectable } from "tsyringe";

import IDateManagerProvider from "@base/shared/container/providers/DateManagerProvider/models/IDateManagerProvider";
import AppError from "@base/shared/errors/AppError";

import ITripsRepository from "../repositories/ITripsRepository";
import IParticipantsRepository from "../repositories/IParticipantsRepository";
import IMailTemplateCompilerProvider from "@base/shared/container/providers/MailTemplateCompilerProvider/models/IMailTemplateCompilerProvider";
import IMailProvider from "@base/shared/container/providers/MailProvider/models/IMailProvider";
import { WEB_APP_URL } from "@base/shared/env";
import TripDoesNotExist from "@base/shared/errors/customs/TripDoesNotExist";

interface IRequest {
	trip_id: string;
	email: string;
}

@injectable()
class InviteParticipantService {
	private tripConfirmationMailTemplate: string;

	constructor(
		@inject("TripsRepository")
		private tripsRepository: ITripsRepository,

		@inject("TripsParticipantsRepository")
		private participantsRepository: IParticipantsRepository,

		@inject("MailProvider")
		private mailProvider: IMailProvider,

		@inject("MailTemplateCompilerProvider")
		private mailTemplateCompilerProvider: IMailTemplateCompilerProvider,

		@inject("DateManagerProvider")
		private dateManagerProvider: IDateManagerProvider,
	) {
		this.tripConfirmationMailTemplate = fs.readFileSync(
			path.resolve(__dirname, "..", "views", "trip_confirmation.hbs"),
			{ encoding: "utf-8" },
		);
	}

	async execute({ trip_id, email }: IRequest) {
		const trip = await this.tripsRepository.findById(trip_id, {
			select: {
				id: true,
				destination: true,
				starts_at: true,
				ends_at: true,
			},
			relations: { participants: true },
		});

		if (!trip) {
			throw new TripDoesNotExist();
		}

		if (trip.participants.find((participant) => participant.email === email)) {
			throw new AppError("Participant already exists");
		}

		const participant = await this.participantsRepository.create({
			email,
			trip,
		});

		await this.mailProvider.sendMail({
			to: email,
			subject: `Confirme sua viagem para ${trip.destination}`,
			html: this.mailTemplateCompilerProvider.compile(
				this.tripConfirmationMailTemplate,
				{
					destination: trip.destination,
					formattedStartDate: this.dateManagerProvider.format(
						trip.starts_at,
						"LL",
					),
					formattedEndDate: this.dateManagerProvider.format(trip.ends_at, "LL"),
					confirmationLink: `${WEB_APP_URL}/trips/${trip.id}/confirm`,
				},
			),
		});

		return participant;
	}
}

export default InviteParticipantService;
