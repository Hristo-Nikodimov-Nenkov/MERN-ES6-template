import { cookieConfigs } from "../configs/security.js";
import { getRequestUserModel } from "../mappers/user.js";
import { verifyTokenSync } from "../services/security.js";

function authenticate(req, res, next) {
   const authenticationCookie =
      req.cookies[cookieConfigs.authenticationCookieName] ||
      req.signedCookies[cookieConfigs.authenticationCookieName];

   if (authenticationCookie) {
      const user = verifyTokenSync(authenticationCookie);
      if (user) {
         req.user = getRequestUserModel(user);
      }
   }

   next();
}

const defaultHasAllRoles = false;
const authenticatedUserIsRequired = "Authenticated user is required!";
const userWithRolesIsRequired = (roles, hasAllRoles = defaultHasAllRoles) => {
   const replaceStr = hasAllRoles ? " and" : " or";
   const rolesStr = roles
      .join(", ")
      .replace(/,([^,]*)$/, { replaceStr } + "$1");
   return `User with role${
      roles.length > 1 ? "s" : ""
   } ${rolesStr} is required.`;
};

export function isAuthenticated(roles, hasAllRoles = defaultHasAllRoles) {
   if (!roles) {
      return function (req, res, next) {
         if (!req.user) {
            res.status(401).send(authenticatedUserIsRequired);
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

      res.status(401).send(userWithRolesIsRequired(roles));
   };
}

export default function (app) {
   app.use(authenticate);
}
