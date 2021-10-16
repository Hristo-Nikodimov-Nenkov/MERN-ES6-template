import express from "express";

import database from "./middlewares/database.js";
import bodyParser from "./middlewares/bodyParser.js";
import staticFiles from "./middlewares/staticFiles.js";
import routes from "./middlewares/routes.js";
import server from "./middlewares/server.js";

const app = express();
database();
bodyParser(app);
staticFiles(app);
routes(app);
server(app);
