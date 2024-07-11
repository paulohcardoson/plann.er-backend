interface IUpdateTripDTO {
	description?: string;
	starts_at?: Date;
	ends_at?: Date;
	is_confirmed?: boolean;
}

export default IUpdateTripDTO;
