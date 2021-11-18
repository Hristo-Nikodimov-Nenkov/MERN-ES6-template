import crypto from "crypto";
import User from "../models/User.js";
import {passwordConfigs} from "../configs/security.js";
import {getUserWithIdViewModel} from "../mappers/user.js";
import {invalidCredentials, userWithIdDoesNotExist} from "./errors/user.js";

export const generateSalt = () =>
    new Promise(((resolve, reject) => {
        crypto.randomBytes(
            passwordConfigs.passwordSaltLength,
            (err, salt) => {
                if (err) {
                    reject(err);
                }

                resolve(salt.toString(passwordConfigs.encoding));
            });
    }));

export const generateHash = (salt, password) => {
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

export const createUser = async (model) => {
    const user = new User(model);

    await user.setPassword(model.password)
    await user.save();

    return getUserWithIdViewModel(user);
}

export const checkUser = async (model) => {
    let user = await User.getByUsername(model.identifier) || await User.getByEmail(model.identifier);

    if (!user) {
        throw invalidCredentials;
    }

    if (!await user.checkPassword(model.password)) {
        throw invalidCredentials;
    }

    return getUserWithIdViewModel(user);
}

export const checkUserById = async (id, password) => {
    const user = await User.findById(id).exec();

    if (!user) {
        throw userWithIdDoesNotExist(id);
    }

    if (!await user.checkPassword(password)) {
        throw invalidCredentials;
    }

    return user;
}

export const changeUsername = async (model) => {
    const user = await checkUserById(model.id, model.password);

    user.username = model.username;
    await user.save();

    return getUserWithIdViewModel(user);
}

export const changeEmail = async (model) => {
    const user = await checkUserById(model.id, model.password);

    user.email = model.email;
    await user.save();

    return getUserWithIdViewModel(user);
}

export const changePassword = async (model) => {
    const user = await checkUserById(model.id, model.currentPassword);

    await user.setPassword(model.password);
    await user.save();

    return getUserWithIdViewModel(user);
}

export const usernameExists = async (username) => {
    return !!(await User.findOne({username: username}).exec());
}

export const generateVerificationHash = async (userId) => {
    const user = await User.findById(userId).exec()
    return crypto
        .createHmac(passwordConfigs.hashingAlgorithm, user.passwordSalt)
        .update(userId)
        .digest(passwordConfigs.encoding)
}

export const deleteUser = async (model) => {
    const user = await User.findById(model.id).exec();
    const userExists = !!user;
    if (!userExists) throw "User does not exist.!";

    const validPassword = await user.checkPassword(model.password);
    if (!validPassword) throw "Invalid credentials!";

    const validVerificationHash = await generateVerificationHash(model.id) === model.verificationHash;
    if (!validVerificationHash) throw "Invalid verification hash!"

    return getUserWithIdViewModel(await User.findByIdAndRemove(model.id).exec());
}

export default {
    generateSalt,
    generateHash,
    createUser,
    checkUser,
    changeUsername,
    changeEmail,
    changePassword,
    generateVerificationHash,
    deleteUser
}