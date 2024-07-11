import PostgreSQLDataSource from "./databases/postgresql";

const logConnectionSuccess = (database: string) => {
	console.log(`${database} connected successfully`);
};

const logConnectionError = (database: string, err: unknown) => {
	console.error(`${database} not connected`);
	console.info(err);
};

// PostgreSQL
PostgreSQLDataSource.initialize()
	.then(() => logConnectionSuccess("PostgreSQL"))
	.catch((err) => logConnectionError("PostgreSQL", err));
