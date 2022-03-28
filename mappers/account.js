export const getRequestUserModel = (obj) => {
    const {id, username, email} = obj;
    return {
        id,
        username,
        email,
    };
};

export const getRegisterModel = (obj) => {
    const {username, email, password} = obj;
    return {
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password
    }
};

export const getLoginModel = (obj) => {
    const {identifier, password, rememberMe} = obj;
    return {
        password,
        identifier,
        rememberMe: rememberMe || false
    }
};

export const getChangeUsernameModel = (userId, obj) => {
    const {username, password} = obj;
    return {
        id: userId,
        username,
        password
    }
}

export const getChangeEmailModel = (userId, obj) => {
    const {email, password} = obj;
    return {
        id: userId,
        email,
        password
    }
}

export const getChangePasswordModel = (userId, obj) => {
    const {currentPassword, password} = obj;
    return {
        id: userId,
        currentPassword,
        password
    }
}

export const getRemoveModel = (userId, obj) => {
    const {verificationHash, password} = obj;
    return {
        id: userId,
        verificationHash,
        password
    }
}

export const getUserWithIdViewModel = (obj) => {
    const {_id, username, email, roles} = obj;
    return {
        id: _id,
        username,
        email,
        roles
    }
};

export const getUserViewModel = (obj) => {
    const {username, email, roles} = obj;
    return {
        username,
        email,
        roles
    }
};

export const getUserTokenModel = (obj) => {
    const {id, roles} = obj;
    return {
        id,
        roles
    }
}

export default {
    getRequestUserModel,
    getRegisterModel,
    getLoginModel,
    getChangeUsernameModel,
    getChangeEmailModel,
    getChangePasswordModel,
    getUserWithIdViewModel,
    getUserViewModel,
    getUserTokenModel,
}