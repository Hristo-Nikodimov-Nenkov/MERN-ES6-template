import cookieParser from "cookie-parser";
import {cookieConfigs} from "../configs/security.js";

export default function (app) {
    app.use(cookieParser(cookieConfigs.cookieSecret));
}