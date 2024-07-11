import Trip from "../infra/typeorm/entities/Trip";

interface ICreateActivityDTO {
	title: string;
	occurs_at: Date;
	trip: Trip;
}

export default ICreateActivityDTO;
