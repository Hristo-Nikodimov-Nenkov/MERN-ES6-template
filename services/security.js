const defaultHasAllRoles = false;

export function isAuthenticated(roles, hasAllRoles = defaultHasAllRoles) {
    if (!roles) {
        return function (req, res, next) {
            if (!req.user) {
                res.status(401).send("Authenticated user is required!");
                return;
            }

            next();
        }
    }

    return function (req, res, next) {
        const isAuthenticatedUser = !!req.user;
        const hasRequiredRoles
            = hasAllRoles
            ? roles.every(role => req.user.roles.contains(role))
            : roles.some(role => req.user.roles.contains(role));

        if (isAuthenticatedUser && hasRequiredRoles) {
            next();
            return;
        }

        res.status(401).send("Insufficient rights!");
    }
}

export default {
    isAuthenticated
}