import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
	// API
	API_BASE_URL: z.string().url(),
	API_PORT: z.coerce.number(),

	// Web
	WEB_APP_BASE_URL: z.string().url(),

	// Drivers
	DATABASE_DRIVER: z.enum(["disk", "postgres"]),
	CACHE_DRIVER: z.enum(["disk", "redis"]),

	// PostgreSQL
	POSTGRESQL_URL: z.string().url(),

	// Redis
	REDIS_URL: z.string().url(),
});

const env = envSchema.parse(process.env);

export default env;
