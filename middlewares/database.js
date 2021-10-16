import mongoose from "mongoose";
import databaseConfigs from "../configs/database.js";

export default function () {
    mongoose.connect(databaseConfigs.connectionString)
        .then(
            () => console.log("Database connection established!"),
            err => console.log(err)
        );
}