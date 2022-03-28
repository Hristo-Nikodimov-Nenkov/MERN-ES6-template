import express from "express";

import {
   authentication,
   bodyParser,
   cookieParser,
   database,
   httpsRedirect,
   routes,
   server,
   staticFiles
} from "./middlewares";

const app = express();

database();
httpsRedirect(app);
cookieParser(app);
bodyParser(app);
staticFiles(app);
authentication(app);
routes(app);
server(app);