import CreateTripService from "@base/modules/trips/services/CreateTripService";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { container } from "tsyringe";
import z from "zod";

export const schema = {
	body: z.object({
		destination: z.string().min(4),
		starts_at: z.coerce.date(),
		ends_at: z.coerce.date(),
		owner: z.object({
			name: z.string(),
			email: z.string().email(),
		}),
		emails_to_invite: z.array(z.string().email()),
	}),
};

const createTrip = async (app: FastifyInstance) => {
	const createTripService = container.resolve(CreateTripService);

	app.withTypeProvider<ZodTypeProvider>().post("/", { schema }, async (req) => {
		const data = req.body;

		const trip = await createTripService.execute(data);

		return trip;
	});
};

export default createTrip;
