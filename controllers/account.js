import userService from "../services/user.js";
import {signToken, setAuthenticationCookie, deleteAuthenticationCookie} from "../services/security.js";

async function registerPost(req, res) {
    const model = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    try {
        const user = await userService.createUser(model);
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
}

async function loginPost(req, res) {
    const model = {
        identifier: req.body.identifier,
        password: req.body.password
    }

    try {
        const user = await userService.checkUser(model);
        const token = await signToken(user);
        setAuthenticationCookie(res, token);

        delete user["id"];
        res.status(200).send(user);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

function logoutPost(req, res) {
    deleteAuthenticationCookie(res);
    res.status(200).send("Log-out successful.");
}

function removeGet(req, res) {
    const hash = userService.generateVerificationHash(req.user.id);
    res.status(200).send(hash);
}

async function removeDel(req, res) {
    const model = {
        id: req.user.id,
        verificationHash: req.body.verificationHash,
        password: req.body.password
    }

    try {
        const user = await userService.deleteUser(model);
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
}

export default {
    registerPost,
    loginPost,
    logoutPost,
    removeGet,
    removeDel
}