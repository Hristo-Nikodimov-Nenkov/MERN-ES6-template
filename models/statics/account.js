export async function usernameExists(username) {
    try {
        const user = await this.findOne({username: username}).exec();
        return !!user;
    } catch (err) {
        throw err;
    }
}

export async function emailExists(email) {
    try {
        const user = await this.findOne({email: email}).exec();
        return !!user;
    } catch (err) {
        throw err;
    }
}

export async function userExists(identifier) {
    let exists = await usernameExists(identifier);
    if (!exists) {
        exists = await emailExists(identifier);
    }

    return exists;
}

export async function getByUsername(username) {
    return await this.findOne({username: username}).exec();
}

export async function getByEmail(email) {
    return await this.findOne({email: email}).exec();
}

export default {
    usernameExists,
    emailExists,
    userExists,
    getByUsername,
    getByEmail
}