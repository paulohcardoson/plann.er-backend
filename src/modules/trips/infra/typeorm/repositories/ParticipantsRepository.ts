import ICreateParticipantDTO from "@base/modules/trips/dtos/ICreateParticipantDTO";
import IParticipantsRepository from "@base/modules/trips/repositories/IParticipantsRepository";
import Participant from "../entities/Participant";
import PostgreSQLDataSource from "@base/shared/infra/typeorm/databases/postgresql";
import { TFindOptions } from "@base/modules/trips/repositories/IParticipantsRepository";
import IUpdateParticipantDTO from "@base/modules/trips/dtos/IUpdateParticipantDTO";

class ParticipantsRepository implements IParticipantsRepository {
	constructor(
		private repository = PostgreSQLDataSource.getRepository(Participant),
	) {}

	async findById(
		id: string,
		options?: TFindOptions,
	): Promise<Participant | null> {
		const participant = await this.repository.findOne({
			where: { id },
			...options,
		});

		return participant;
	}

	async create(data: ICreateParticipantDTO): Promise<Participant> {
		const participant = this.repository.create(data);

		await this.repository.save(participant);

		return participant;
	}

	async createMany(data: ICreateParticipantDTO[]): Promise<Participant[]> {
		const participants = this.repository.create(data);

		await this.repository.save(participants);

		return participants;
	}

	async update(id: string, data: IUpdateParticipantDTO): Promise<void> {
		await this.repository.update(id, data);
	}
}

export default ParticipantsRepository;
