import { clientIndexFile } from "../configs/application.js";

import account from "../routers/account.js";

export default function (app) {
   app.use("/api/account", account);

   app.use("*", (req, res) => res.sendFile(clientIndexFile));
}
