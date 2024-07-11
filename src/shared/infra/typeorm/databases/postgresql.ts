import { DataSource } from "typeorm";
import env from "@shared/env";

import Trip from "@modules/trips/infra/typeorm/entities/Trip";
import Participant from "@base/modules/trips/infra/typeorm/entities/Participant";
import Activity from "@base/modules/trips/infra/typeorm/entities/Activity";
import Link from "@base/modules/trips/infra/typeorm/entities/Link";

const PostgreSQLDataSource = new DataSource({
	type: "postgres",
	url: env.POSTGRESQL_URL,
	entities: [Trip, Participant, Activity, Link],
	//logging: true,
	//synchronize: true,
});

export default PostgreSQLDataSource;
