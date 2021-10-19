export const username = {
    fieldNames: "username",
    minLength: 6,
    maxLength: 30
}

export const password = {
    fieldNames: "password",
    minLength: 8,
    maxLength: 40,
    requiresUpperCaseSymbol: true,
    requiresLowerCaseSymbol: true,
    requiresDigit: true,
    requiresNonAlphaNumericSymbol: false
}

export default {
    username,
    password
}