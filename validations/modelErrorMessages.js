import userFieldNames from "./user/fieldNames.js";
import userModelConsts from "../models/constants/user.js";
import {capitalize, existsMessage, hasLengthMessage, isRequiredMessage} from "./messages.js";

export const modelFieldNames = {
    user: userFieldNames,
}

export const userErrorMessages = {
    [userFieldNames.usernameFieldName]: {
        isRequired: isRequiredMessage(userFieldNames.usernameFieldName),
        invalidLength: hasLengthMessage(
            userFieldNames.usernameFieldName,
            userModelConsts.username.minLength,
            userModelConsts.username.maxLength),
        isRegistered: (value) => existsMessage(userFieldNames.emailFieldName, value)
    },
    [userFieldNames.emailFieldName]: {
        isRequired: isRequiredMessage(userFieldNames.emailFieldName),
        invalidEmailAddress: "Valid E-Mail address is required.",
        isRegistered: (value) => existsMessage(userFieldNames.emailFieldName, value)
    },
    [userFieldNames.passwordFieldName]: {
        isRequired: isRequiredMessage(userFieldNames.passwordFieldName),
        invalidLength: hasLengthMessage(
            userFieldNames.passwordFieldName,
            userModelConsts.password.minLength,
            userModelConsts.password.maxLength),
        mustContainCapitalLetter: "Password must contain capital letter.",
        mustContainSmallLetter: "Password must contain small letter.",
        mustContainDigit: "Password must contain a digit.",
        mustContainNonAlphanumeric: "Password must contain non-alphanumeric symbol.",
    },
    [userFieldNames.confirmPasswordFieldName]: {
        isRequired: isRequiredMessage(userFieldNames.confirmPasswordFieldName),
        isDifferent:
            `${capitalize(userFieldNames.passwordFieldName)} 
            and 
            ${capitalize(userFieldNames.confirmPasswordFieldName)} 
            are different.`
    }
}

export const modelErrorMessages = {
    user: userErrorMessages
}

export const getFieldErrorMessages = (model, field) => modelErrorMessages[model][field] || [];

export default {
    modelFieldNames,
    userErrorMessages
}