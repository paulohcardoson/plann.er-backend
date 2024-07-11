import { container } from "tsyringe";

import "@shared/container/providers";

import TripsRepository from "@base/modules/trips/infra/typeorm/repositories/TripsRepository";
import ITripsRepository from "@base/modules/trips/repositories/ITripsRepository";

import IActivitiesRepository from "@base/modules/trips/repositories/IActivitiesRepository";
import ActivitiesRepository from "@base/modules/trips/infra/typeorm/repositories/ActivitiesRepository";

import LinksRepository from "@base/modules/trips/infra/typeorm/repositories/LinksRepository";
import ILinksRepository from "@base/modules/trips/repositories/ILinksRepository";

import IParticipantsRepository from "@base/modules/trips/repositories/IParticipantsRepository";
import ParticipantsRepository from "@base/modules/trips/infra/typeorm/repositories/ParticipantsRepository";

container.registerSingleton<ITripsRepository>(
	"TripsRepository",
	TripsRepository,
);

container.registerSingleton<IActivitiesRepository>(
	"TripsActivitiesRepository",
	ActivitiesRepository,
);

container.registerSingleton<ILinksRepository>(
	"TripsLinksRepository",
	LinksRepository,
);

container.registerSingleton<IParticipantsRepository>(
	"TripsParticipantsRepository",
	ParticipantsRepository,
);
