export const developmentDatabaseName = "my-database";
export const developmentConnectionString = `mongodb://127.0.0.1/${developmentDatabaseName}`;
export const connectionString =
   process.env.DB_CONNECTION_STRING || developmentConnectionString;

export default {
   developmentDatabaseName,
   developmentConnectionString,
   connectionString,
};
