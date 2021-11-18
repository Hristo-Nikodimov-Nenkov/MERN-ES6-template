import mongoose from "mongoose";
import databaseConfigs, {
   developmentConnectionString,
} from "../configs/database.js";

export default function () {
   mongoose
      .connect(databaseConfigs.connectionString)
      .then(() => {
         const dbEnvStr =
            databaseConfigs.connectionString === developmentConnectionString
               ? "Development"
               : "Production";
         console.log(`${dbEnvStr} database connected.`);
      })
      .catch((err) => console.log(err));
}
