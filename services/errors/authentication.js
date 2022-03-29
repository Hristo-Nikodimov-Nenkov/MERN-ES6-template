import {defaultHasAllRoles} from "../../middlewares/authentication.js";

export const alreadyAuthenticated = "You are already authenticated. Logout first.";
export const authenticatedUserIsRequired = "Authenticated user is required!";
export const userWithRolesIsRequired = (roles, hasAllRoles = defaultHasAllRoles) => {
   const replaceStr = hasAllRoles ? " and" : " or";
   const rolesStr = roles
      .join(", ")
      .replace(/,([^,]*)$/, {replaceStr} + "$1");
   return `User with role${
      roles.length > 1 ? "s" : ""
   } ${rolesStr} is required.`;
};
export const invalidCredentials = "Invalid Credentials!";
export const invalidVerificationHash = "Invalid verification hash!";

export default {
   alreadyAuthenticated,
   authenticatedUserIsRequired,
   userWithRolesIsRequired,
   invalidCredentials,
   invalidVerificationHash
}