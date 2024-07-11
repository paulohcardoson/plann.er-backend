import ConfirmParticipantService from "@base/modules/trips/services/ConfirmParticipantService";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { container } from "tsyringe";
import z from "zod";

export const schema = {
	params: z.object({
		participant_id: z.string().uuid(),
	}),
};

const confirmParticipant = async (app: FastifyInstance) => {
	const confirmParticipantService = container.resolve(
		ConfirmParticipantService,
	);

	app
		.withTypeProvider<ZodTypeProvider>()
		.get("/:participant_id/confirm", { schema }, async (req, reply) => {
			const data = req.params;

			await confirmParticipantService.execute(data);

			return reply.status(200).send({ message: "Participant confirmed." });
		});
};

export default confirmParticipant;
