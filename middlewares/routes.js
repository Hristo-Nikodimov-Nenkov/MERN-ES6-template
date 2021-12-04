import { clientIndexFile } from "../configs/application.js";

import account from "../routers/account.js";

export default function (app) {
   app.use("/api/account", account);

   app.use("/api/*", (req, res) => {
      const errorMessage = `Endpoint ${req.method.toUpperCase()} ${
         req.baseUrl
      }${req.path.slice(0, -1)} NOT FOUND!`;
      res.status(404).send(JSON.stringify(errorMessage));
   });

   app.use("*", (req, res) => res.sendFile(clientIndexFile));
}
