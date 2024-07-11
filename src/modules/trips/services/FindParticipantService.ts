import { inject, injectable } from "tsyringe";

import IParticipantsRepository from "../repositories/IParticipantsRepository";
import TripParticipantDoesNotExist from "@base/shared/errors/customs/TripParticipantDoesNotExist";

interface IRequest {
	participant_id: string;
}

@injectable()
class FindParticipantService {
	constructor(
		@inject("TripsParticipantsRepository")
		private participantsRepository: IParticipantsRepository,
	) {}

	async execute({ participant_id }: IRequest) {
		const participant =
			await this.participantsRepository.findById(participant_id);

		if (!participant) {
			throw new TripParticipantDoesNotExist();
		}

		return participant;
	}
}

export default FindParticipantService;
