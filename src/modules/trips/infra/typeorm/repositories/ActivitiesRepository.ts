import PostgreSQLDataSource from "@base/shared/infra/typeorm/databases/postgresql";
import ICreateTripActivityDTO from "@base/modules/trips/dtos/ICreateActivityDTO";
import Activity from "../entities/Activity";
import IActivitiesRepository from "@base/modules/trips/repositories/IActivitiesRepository";

class ActivitiesRepository implements IActivitiesRepository {
	constructor(
		private repository = PostgreSQLDataSource.getRepository(Activity),
	) {}

	async create(data: ICreateTripActivityDTO): Promise<Activity> {
		const activity = this.repository.create(data);

		await this.repository.save(activity);

		return activity;
	}
}

export default ActivitiesRepository;
