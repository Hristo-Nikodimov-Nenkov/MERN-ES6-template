import {cookieConfigs} from "../configs/security.js";
import {verifyTokenSync} from "../services/security.js";

function authenticate(req, res, next) {
    const authenticationCookie = req.cookies[cookieConfigs.authenticationCookieName]
        || req.signedCookies[cookieConfigs.authenticationCookieName]

    if (authenticationCookie) {
        const user = verifyTokenSync(authenticationCookie);
        if (user) {
            delete user["iat"];
            delete user["exp"];
            delete user["aud"];
            delete user["iss"];
            req.user = user;
        }
    }

    next();
}

export default function (app) {
    app.use(authenticate);
}