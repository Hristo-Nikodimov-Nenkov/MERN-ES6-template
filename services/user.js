import crypto from "crypto";
import User from "../models/User.js";
import {passwordConfigs} from "../configs/security.js";

export function generateSaltSync() {
    return crypto.randomBytes(passwordConfigs.passwordSaltLength).toString(passwordConfigs.encoding);
}

export function generateSalt() {
    return new Promise(((resolve, reject) => {
        crypto.randomBytes(passwordConfigs.passwordSaltLength, (err, salt) => {
            if (err) {
                reject(err);
            }

            resolve(salt.toString(passwordConfigs.encoding));
        });
    }));
}

export function generateHashSync(salt, password) {
    return crypto.pbkdf2Sync(
        password,
        salt,
        passwordConfigs.iterationsCount,
        passwordConfigs.passwordHashLength,
        passwordConfigs.hashingAlgorithm).toString(passwordConfigs.encoding);
}

export function generateHash(salt, password) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(
            password,
            salt,
            passwordConfigs.iterationsCount,
            passwordConfigs.passwordHashLength,
            passwordConfigs.hashingAlgorithm,
            (err, hash) => {
                if (err) {
                    reject(err);
                }

                resolve(hash.toString(passwordConfigs.encoding));
            }
        )
    });
}

export async function createUser(model) {
    try {
        const user = new User({
            username: model.username,
            email: model.email
        });

        await user.setPassword(model.password);
        await user.save();

        return {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    } catch (err) {
        throw err;
    }
}

export async function checkUser(model) {
    try {
        let user = await User.getByUsername(model.identifier) || await User.getByEmail(model.identifier);

        if (!user) {
            throw "Invalid Credentials!";
        }

        if (await user.checkPassword(model.password)) {
            return {
                id: user._id,
                username: user.username,
                email: user.email
            }
        }

        throw "Invalid Credentials!";
    } catch (err) {
        throw err;
    }
}

export function generateVerificationHash(userId) {
    return crypto
        .createHmac(passwordConfigs.hashingAlgorithm, userId)
        .update(userId)
        .digest(passwordConfigs.encoding)
}

export async function deleteUser(model) {
    try {
        const user = await User.findById(model.id).exec();
        if (user
            && await user.checkPassword(model.password)
            && generateVerificationHash(model.id) === model.verificationHash) {
            return await User.findByIdAndRemove(model.id);
        }
    } catch (err) {
        throw err;
    }
}

export default {
    generateSaltSync,
    generateSalt,
    generateHashSync,
    generateHash,
    createUser,
    checkUser,
    generateVerificationHash,
    deleteUser
}