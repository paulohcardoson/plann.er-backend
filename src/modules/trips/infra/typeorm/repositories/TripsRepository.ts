import ITripsRepository, {
	TFindOptions,
} from "@base/modules/trips/repositories/ITripsRepository";
import Trip from "../entities/Trip";
import PostgreSQLDataSource from "@base/shared/infra/typeorm/databases/postgresql";
import ICreateTripDTO from "@base/modules/trips/dtos/ICreateTripDTO";
import IUpdateTripDTO from "@base/modules/trips/dtos/IUpdateTripDTO";

class TripsRepository implements ITripsRepository {
	constructor(private repository = PostgreSQLDataSource.getRepository(Trip)) {}

	async create(data: ICreateTripDTO): Promise<Trip> {
		const trip = this.repository.create(data);

		await this.repository.save(trip);

		return trip;
	}

	async update(id: string, data: IUpdateTripDTO): Promise<void> {
		await this.repository.update({ id }, data);
	}

	async findById(id: string, options: TFindOptions) {
		const trip = await this.repository.findOne({ ...options, where: { id } });

		return trip;
	}
}

export default TripsRepository;
