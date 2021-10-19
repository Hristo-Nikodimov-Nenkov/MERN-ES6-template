import crypto from "crypto";
import securityConfigs from "../configs/security.js";

export function generateSaltSync() {
    return crypto.randomBytes(securityConfigs.passwordSaltLength).toString(securityConfigs.encoding);
}

export function generateSalt() {
    return new Promise(((resolve, reject) => {
        crypto.randomBytes(securityConfigs.passwordSaltLength, (err, salt) => {
            if (err) {
                reject(err);
            }

            resolve(salt.toString(securityConfigs.encoding));
        });
    }));
}

export function generateHashSync(salt, password) {
    return crypto.pbkdf2Sync(
        password,
        salt,
        securityConfigs.iterationsCount,
        securityConfigs.passwordHashLength,
        securityConfigs.encoding);
}

export function generateHash(salt, password) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(
            password,
            salt,
            securityConfigs.iterationsCount,
            securityConfigs.passwordHashLength,
            securityConfigs.encoding,
            (err, hash) => {
                if (err) {
                    reject(err);
                }

                resolve(hash);
            }
        )
    });
}

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
    generateSaltSync,
    generateSalt,
    generateHashSync,
    generateHash,
    isAuthenticated
}