import "reflect-metadata";

import "@shared/infra/typeorm";
import "@shared/container";

import fastify from "fastify";
import cors from "@fastify/cors";

import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";

// Env
import env from "@shared/env";

const app = fastify();

app.register(cors, { origin: "*" });
app.setErrorHandler(errorHandler);
app.register(routes);

app
	.listen({ port: env.API_PORT })
	.then(() => console.info(`Server running on port ${env.API_PORT}`));
