import CreateActivityService from "@base/modules/trips/services/CreateActivityService";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { container } from "tsyringe";
import z from "zod";

export const schema = {
	params: z.object({
		trip_id: z.string().uuid(),
	}),
	body: z.object({
		title: z.string().min(4),
		occurs_at: z.coerce.date(),
	}),
};

const createActivity = async (app: FastifyInstance) => {
	const createActivityService = container.resolve(CreateActivityService);

	app
		.withTypeProvider<ZodTypeProvider>()
		.post("/:trip_id/activities", { schema }, async (req, reply) => {
			const { trip_id } = req.params;
			const { title, occurs_at } = req.body;

			const activity = await createActivityService.execute({
				trip_id,
				title,
				occurs_at,
			});

			return reply.send({ activityId: activity.id });
		});
};

export default createActivity;
