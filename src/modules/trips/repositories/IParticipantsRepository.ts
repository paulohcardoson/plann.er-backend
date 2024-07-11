import { FindOneOptions } from "typeorm";
import ICreateParticipantDTO from "../dtos/ICreateParticipantDTO";
import Participant from "../infra/typeorm/entities/Participant";
import IUpdateParticipantDTO from "../dtos/IUpdateParticipantDTO";

export type TFindOptions = Omit<FindOneOptions<Participant>, "where">;

interface IParticipantsRepository {
	findById(id: string, options?: TFindOptions): Promise<Participant | null>;
	create(data: ICreateParticipantDTO): Promise<Participant>;
	createMany(data: ICreateParticipantDTO[]): Promise<Participant[]>;
	update(id: string, data: IUpdateParticipantDTO): Promise<void>;
}

export default IParticipantsRepository;
