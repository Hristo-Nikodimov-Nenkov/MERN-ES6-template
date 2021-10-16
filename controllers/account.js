function registerPost(req, res) {
    res.status(200).send("Register POST");
}

function loginPost(req, res) {
    res.status(200).send("Login POST");
}

function logoutPost(req, res) {
    res.status(200).send("Logout POST");
}

export default {
    registerPost,
    loginPost,
    logoutPost
}