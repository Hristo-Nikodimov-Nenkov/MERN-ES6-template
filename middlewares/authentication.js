import {cookieConfigs} from "../configs/security.js";
import {getRequestUserModel} from "../mappers/user.js";
import {verifyTokenSync} from "../services/security.js";
import {authenticationErrorMessages} from "../services/error.js";

function authenticate(req, res, next) {
   const authenticationCookie =
      req.cookies[cookieConfigs.authenticationCookieName] ||
      req.signedCookies[cookieConfigs.authenticationCookieName];

   if (authenticationCookie) {
      try {
         const user = verifyTokenSync(authenticationCookie);
         req.user = getRequestUserModel(user);
      } catch (err) {

      }
   }

   next();
}

export const defaultHasAllRoles = false;

export function isNotAuthenticated() {
   return function (req, res, next) {
      if (req.user) {
         res.status(400).send(JSON.stringify(authenticationErrorMessages.alreadyAuthenticated))
         return;
      }

      next();
   }
}

export function isAuthenticated(roles, hasAllRoles = defaultHasAllRoles) {
   if (!roles) {
      return function (req, res, next) {
         if (!req.user) {
            res.status(401).send(JSON.stringify(authenticationErrorMessages.authenticatedUserIsRequired));
            return;
         }

         next();
      };
   }

   return function (req, res, next) {
      if (!!req.user) {
         const hasRequiredRoles = hasAllRoles
            ? roles.every((role) => req.user.roles.contains(role))
            : roles.some((role) => req.user.roles.contains(role));

         if (hasRequiredRoles) {
            next();
            return;
         }
      }

      res.status(401).send(JSON.stringify(authenticationErrorMessages.userWithRolesIsRequired(roles)));
   };
}

export default function (app) {
   app.use(authenticate);
}