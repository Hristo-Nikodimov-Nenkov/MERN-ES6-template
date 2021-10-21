import userService from "../services/user.js";
import {signToken, setAuthenticationCookie} from "../services/security.js";

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
    res.status(200).send("Logout POST");
}

export default {
    registerPost,
    loginPost,
    logoutPost
}