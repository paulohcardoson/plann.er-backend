import { FindOneOptions } from "typeorm";
import ICreateTripDTO from "../dtos/ICreateTripDTO.js";
import IUpdateTripDTO from "../dtos/IUpdateTripDTO.js";
import Trip from "../infra/typeorm/entities/Trip.js";

export type TFindOptions = Omit<FindOneOptions<Trip>, "where">;

interface ITripsRepository {
	create(data: ICreateTripDTO): Promise<Trip>;
	update(id: string, data: IUpdateTripDTO): Promise<void>;
	findById(id: string, options?: TFindOptions): Promise<Trip | null>;
}

export default ITripsRepository;
