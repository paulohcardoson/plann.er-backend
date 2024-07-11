import ConfirmTripService from "@base/modules/trips/services/ConfirmTripService";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { container } from "tsyringe";
import z from "zod";

export const schema = {
	params: z.object({
		trip_id: z.string().uuid(),
	}),
};

const confirmTrip = async (app: FastifyInstance) => {
	const confirmTripService = container.resolve(ConfirmTripService);

	app
		.withTypeProvider<ZodTypeProvider>()
		.get("/:trip_id/confirm", { schema }, async (req, reply) => {
			const data = req.params;

			await confirmTripService.execute(data);

			return reply.status(200).send({ message: "Trip confirmed." });
		});
};

export default confirmTrip;
