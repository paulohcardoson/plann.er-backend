import InviteParticipantService from "@base/modules/trips/services/InviteParticipantService";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { container } from "tsyringe";
import z from "zod";

export const schema = {
	params: z.object({
		trip_id: z.string().uuid(),
	}),
	body: z.object({
		email: z.string().email(),
	}),
};

const inviteParticipant = async (app: FastifyInstance) => {
	const inviteParticipantService = container.resolve(InviteParticipantService);

	app
		.withTypeProvider<ZodTypeProvider>()
		.post("/:trip_id/invites", { schema }, async (req, reply) => {
			const { trip_id } = req.params;
			const { email } = req.body;

			await inviteParticipantService.execute({
				trip_id,
				email,
			});

			return reply.status(200).send();
		});
};

export default inviteParticipant;
