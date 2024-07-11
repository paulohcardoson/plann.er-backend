import AppError from "@base/shared/errors/AppError";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

const errorHandler = (
	error: FastifyError,
	req: FastifyRequest,
	reply: FastifyReply,
) => {
	if (error instanceof AppError) {
		const { message, code } = error as AppError;

		return reply.status(code).send({
			status: "error",
			message,
		});
	}

	if (error instanceof ZodError) {
		return reply.status(400).send({
			status: "error",
			message: "Invalid input",
			errors: error.flatten().fieldErrors,
		});
	}

	if (error instanceof SyntaxError) {
		return reply.status(400).send({
			status: "error",
			message: "Syntax error on JSON",
		});
	}

	console.error(error);

	return reply.status(500).send({
		status: "error",
		message: "Internal server error.",
	});
};

export default errorHandler;
