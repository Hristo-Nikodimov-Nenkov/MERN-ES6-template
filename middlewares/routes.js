import {clientIndexFile} from "../configs/application.js";

import account from "../routers/account.js";
import vehicle from "../routers/vehicle.js";
import visit from "../routers/visit.js";
import malfunction from "../routers/malfunction.js";
import part from "../routers/part.js";
import validations from "../routers/validations.js";

export default function (app) {
    app.use("/api/account", account);
    app.use("/api/vehicles", vehicle);
    app.use("/api/visits", visit);
    app.use("/api/malfunctions", malfunction);
    app.use("/api/parts", part);
    app.use("/api/validations", validations);

    app.use("/api/*", (req, res) => {
        const errorMessage = `Endpoint ${req.method.toUpperCase()} ${req.baseUrl}${req.path.slice(0, -1)} NOT FOUND!`;
        res.status(404)
            .send(JSON.stringify(errorMessage));
    });

    app.use("*", (req, res) => res.sendFile(clientIndexFile));
}