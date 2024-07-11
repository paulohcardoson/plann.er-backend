import FindParticipantsService from "@base/modules/trips/services/FindParticipantsService";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { container } from "tsyringe";
import z from "zod";

export const schema = {
	params: z.object({
		trip_id: z.string().uuid(),
	}),
};

const getParticipants = async (app: FastifyInstance) => {
	const findParticipantsService = container.resolve(FindParticipantsService);

	app
		.withTypeProvider<ZodTypeProvider>()
		.get("/:trip_id/participants", { schema }, async (req, reply) => {
			const { trip_id } = req.params;

			const participants = await findParticipantsService.execute({ trip_id });

			return reply.send(participants);
		});
};

export default getParticipants;
