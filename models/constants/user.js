export const username = {
    allowedRegex: /^[a-zA-Z0-9.\-_]+$/,
    minLength: 6,
    maxLength: 30
}

export const password = {
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