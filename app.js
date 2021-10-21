import express from "express";

import database from "./middlewares/database.js";
import cookieParser from "./middlewares/cookieParser.js";
import bodyParser from "./middlewares/bodyParser.js";
import staticFiles from "./middlewares/staticFiles.js";
import authenticate from "./middlewares/authenticate.js";
import routes from "./middlewares/routes.js";
import server from "./middlewares/server.js";

const app = express();
database();
cookieParser(app);
bodyParser(app);
staticFiles(app);
authenticate(app);
routes(app);
server(app);
