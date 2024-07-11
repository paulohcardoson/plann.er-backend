import UpdateTripService from "@base/modules/trips/services/UpdateTripService";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { container } from "tsyringe";
import z from "zod";

export const schema = {
	params: z.object({
		trip_id: z.string().uuid(),
	}),
	body: z.object({
		destination: z.string().min(4),
		starts_at: z.coerce.date(),
		ends_at: z.coerce.date(),
	}),
};

const updateTrip = async (app: FastifyInstance) => {
	const updateTripService = container.resolve(UpdateTripService);

	app
		.withTypeProvider<ZodTypeProvider>()
		.put("/:trip_id", { schema }, async (req) => {
			const { trip_id } = req.params;
			const data = req.body;

			const trip = await updateTripService.execute({ trip_id, ...data });

			return trip;
		});
};

export default updateTrip;
