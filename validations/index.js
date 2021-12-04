import fieldNames from "./user/fieldNames.js";
import userConsts from "../models/constants/user.js";

const user = {
    [fieldNames.usernameFieldName]: {
        isRequired: true,
        minLength: userConsts.username.minLength,
        maxLength: userConsts.username.maxLength
    },
    [fieldNames.emailFieldName]: {
        isRequired: true,
        isEmail: true
    },
    [fieldNames.passwordFieldName]: {
        isRequired: true,
        minLength: userConsts.password.minLength,
        maxLength: userConsts.password.maxLength,
        hasLowerCase: true,
        hasUpperCase: true,
        hasDigit: true,
        hasNonAlphanumericSymbol: true
    },
    [fieldNames.confirmPasswordFieldName]: {
        isRequired: true,
        isSameAs: fieldNames.passwordFieldName
    },
    [fieldNames.identifierFieldName]: {
        isRequired: true
    },
    [fieldNames.currentPasswordFieldName]: {
        isRequired: true
    },
    [fieldNames.validationHashFieldName]: {
        isRequired: true
    }
}

export default {
    user
}