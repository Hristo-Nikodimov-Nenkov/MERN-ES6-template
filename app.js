import express from "express";

import database from "./middlewares/database.js";
import httpsRedirect from "./middlewares/httpsRedirect.js";
import cookieParser from "./middlewares/cookieParser.js";
import bodyParser from "./middlewares/bodyParser.js";
import staticFiles from "./middlewares/staticFiles.js";
import authentication from "./middlewares/authentication.js";
import routes from "./middlewares/routes.js";
import server from "./middlewares/server.js";

const app = express();

database();
httpsRedirect(app);
cookieParser(app);
bodyParser(app);
staticFiles(app);
authentication(app);
routes(app);
server(app);
