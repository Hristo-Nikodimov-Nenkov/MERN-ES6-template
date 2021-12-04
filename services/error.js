import {defaultHasAllRoles} from "../middlewares/authentication.js";

export const authenticationErrorMessages = {
    alreadyAuthenticated: "You are already authenticated. Logout first.",
    authenticatedUserIsRequired: "Authenticated user is required!",
    userWithRolesIsRequired: (roles, hasAllRoles = defaultHasAllRoles) => {
        const replaceStr = hasAllRoles ? " and" : " or";
        const rolesStr = roles
            .join(", ")
            .replace(/,([^,]*)$/, {replaceStr} + "$1");
        return `User with role${
            roles.length > 1 ? "s" : ""
        } ${rolesStr} is required.`;
    },
    invalidCredentials: "Invalid Credentials!",
    invalidVerificationHash: "Invalid verification hash!"
}
