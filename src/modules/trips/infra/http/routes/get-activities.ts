import FindActivitiesService from "@base/modules/trips/services/FindActivitiesService";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { container } from "tsyringe";
import z from "zod";

export const schema = {
	params: z.object({
		trip_id: z.string().uuid(),
	}),
};

const getActivities = async (app: FastifyInstance) => {
	const findActivitiesService = container.resolve(FindActivitiesService);

	app
		.withTypeProvider<ZodTypeProvider>()
		.get("/:trip_id/activities", { schema }, async (req, reply) => {
			const { trip_id } = req.params;

			const activities = await findActivitiesService.execute({ trip_id });

			return reply.send(activities);
		});
};

export default getActivities;
