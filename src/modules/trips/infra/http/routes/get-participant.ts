import FindParticipantService from "@base/modules/trips/services/FindParticipantService";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { container } from "tsyringe";
import z from "zod";

export const schema = {
	params: z.object({
		participant_id: z.string().uuid(),
	}),
};

const getParticipant = async (app: FastifyInstance) => {
	const findParticipantService = container.resolve(FindParticipantService);

	app
		.withTypeProvider<ZodTypeProvider>()
		.get("/:participant_id", { schema }, async (req, reply) => {
			const data = req.params;

			const participant = await findParticipantService.execute(data);

			return reply.send(participant);
		});
};

export default getParticipant;
