import CreateLinkService from "@base/modules/trips/services/CreateLinkService";
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
		url: z.string().url(),
	}),
};

const createLink = async (app: FastifyInstance) => {
	const createLinkService = container.resolve(CreateLinkService);

	app
		.withTypeProvider<ZodTypeProvider>()
		.post("/:trip_id/links", { schema }, async (req, reply) => {
			const { trip_id } = req.params;
			const { title, url } = req.body;

			const link = await createLinkService.execute({
				trip_id,
				title,
				url,
			});

			return reply.send({ linkId: link.id });
		});
};

export default createLink;
