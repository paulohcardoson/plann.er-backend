import Trip from "../infra/typeorm/entities/Trip";

interface ICreateLinkDTO {
	title: string;
	url: string;
	trip: Trip;
}

export default ICreateLinkDTO;
