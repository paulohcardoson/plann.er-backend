import Trip from "@base/modules/trips/infra/typeorm/entities/Trip";

interface ICreateParticipantDTO {
	name?: string;
	email: string;
	is_owner?: boolean;
	is_confirmed?: boolean;
	trip: Trip;
}

export default ICreateParticipantDTO;
