import FindLinksService from "@base/modules/trips/services/FindLinksService";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { container } from "tsyringe";
import z from "zod";

export const schema = {
	params: z.object({
		trip_id: z.string().uuid(),
	}),
};

const getLinks = async (app: FastifyInstance) => {
	const findLinksService = container.resolve(FindLinksService);

	app
		.withTypeProvider<ZodTypeProvider>()
		.get("/:trip_id/links", { schema }, async (req, reply) => {
			const { trip_id } = req.params;

			const links = await findLinksService.execute({ trip_id });

			return reply.send(links);
		});
};

export default getLinks;
