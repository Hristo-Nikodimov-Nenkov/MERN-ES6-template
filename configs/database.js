export const developmentDatabaseName = "my-database";
export const developmentConnectionString = `mongodb://localhost/${developmentDatabaseName}`;
export const connectionString =
   process.env.DB_CONNECTION_STRING || developmentConnectionString;

export default {
   developmentDatabaseName,
   developmentConnectionString,
   connectionString,
};
