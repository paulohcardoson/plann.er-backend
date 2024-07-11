import Activity from "../infra/typeorm/entities/Activity.js";
import ICreateTripActivityDTO from "../dtos/ICreateActivityDTO.js";

interface IActivitiesRepository {
	create(data: ICreateTripActivityDTO): Promise<Activity>;
}

export default IActivitiesRepository;
