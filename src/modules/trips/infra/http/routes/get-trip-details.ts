import FindTripService from "@base/modules/trips/services/FindTripService";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { container } from "tsyringe";
import z from "zod";

export const schema = {
	params: z.object({
		trip_id: z.string().uuid(),
	}),
};

const getTripDetails = async (app: FastifyInstance) => {
	const findTripService = container.resolve(FindTripService);

	app
		.withTypeProvider<ZodTypeProvider>()
		.get("/:trip_id", { schema }, async (req, reply) => {
			const data = req.params;

			const trip = await findTripService.execute(data);

			return reply.send(trip);
		});
};

export default getTripDetails;
