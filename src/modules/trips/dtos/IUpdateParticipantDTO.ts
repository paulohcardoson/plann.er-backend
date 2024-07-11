import Trip from "@base/modules/trips/infra/typeorm/entities/Trip";

interface IUpdateParticipantDTO {
	email?: string;
	is_owner?: boolean;
	is_confirmed?: boolean;
	trip?: Trip;
}

export default IUpdateParticipantDTO;
