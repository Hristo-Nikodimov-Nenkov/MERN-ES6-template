import path from "path";

import account from "../routers/account.js";

function fallback(req, res){
    res.sendFile(path.resolve("./public/index.html"));
}

export default function (app) {
    app.use("/account", account);

    app.use("*", fallback);
}