import { FastifyPluginCallback } from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";

import confirmParticipant from "@base/modules/trips/infra/http/routes/confirm-participant";
import confirmTrip from "@base/modules/trips/infra/http/routes/confirm-trip";
import createTrip from "@base/modules/trips/infra/http/routes/create-trip";
import createActivity from "@base/modules/trips/infra/http/routes/create-activity";
import getActivities from "@base/modules/trips/infra/http/routes/get-activities";
import createLink from "@base/modules/trips/infra/http/routes/create-link";
import getLinks from "@base/modules/trips/infra/http/routes/get-links";
import getParticipants from "@base/modules/trips/infra/http/routes/get-participants";
import inviteParticipant from "@base/modules/trips/infra/http/routes/invite-participant";
import updateTrip from "@base/modules/trips/infra/http/routes/update-trip";
import getTripDetails from "@base/modules/trips/infra/http/routes/get-trip-details";
import getParticipant from "@base/modules/trips/infra/http/routes/get-participant";

const routes: FastifyPluginCallback = (app, opts, done) => {
	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);

	app.register(
		(app, opts, done) => {
			getTripDetails(app);
			createTrip(app);
			confirmTrip(app);
			updateTrip(app);

			// Participants
			inviteParticipant(app);
			getParticipants(app);

			// Activities
			createActivity(app);
			getActivities(app);

			// Links
			createLink(app);
			getLinks(app);

			done();
		},
		{ prefix: "/trips" },
	);

	app.register(
		(app, opts, done) => {
			getParticipant(app);
			confirmParticipant(app);

			done();
		},
		{ prefix: "/participants" },
	);

	done();
};

export default routes;
