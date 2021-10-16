export function isRequiredMessage(fields) {
    const fieldsIsArray = Array.isArray(fields)
    const fieldNames = fieldsIsArray
        ? fields.map(f => f.toLowerCase())
            .map(f => f[0].toUpperCase() + f.slice(1))
            .join(", ")
        : fields[0].toUpperCase() + fields.slice(1);

    return `${fieldNames} ${fieldsIsArray && fields.length > 1 ? "are" : "is"} required!`;
}

export function hasLengthMessage(fields, minLength, maxLength) {
    const fieldsString = Array.isArray(fields)
        ? fields
            .map(f => f.toLowerCase())
            .map(f => f[0].toUpperCase() + f.slice(1))
            .join(", ")
        : fields[0].toUpperCase() + fields.slice(1);

    return `${fieldsString} must be between ${minLength} and ${maxLength} symbols!`;
}

export default {
    isRequiredMessage,
    hasLengthMessage
}