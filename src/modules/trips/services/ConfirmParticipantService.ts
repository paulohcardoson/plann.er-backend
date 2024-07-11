import { inject, injectable } from "tsyringe";

import AppError from "@base/shared/errors/AppError";
import IParticipantsRepository from "@base/modules/trips/repositories/IParticipantsRepository";

interface IRequest {
	participant_id: string;
}

@injectable()
class ConfirmParticipantService {
	constructor(
		@inject("TripsParticipantsRepository")
		private participantsRepository: IParticipantsRepository,
	) {}

	async execute({ participant_id }: IRequest) {
		const participant = await this.participantsRepository.findById(
			participant_id,
			{
				relations: { trip: true },
			},
		);

		if (!participant) {
			throw new AppError("Participant not found", 404);
		}

		if (participant.is_confirmed) {
			throw new AppError("Participant is already confirmed");
		}

		await this.participantsRepository.update(participant_id, {
			is_confirmed: true,
		});
	}
}

export default ConfirmParticipantService;
