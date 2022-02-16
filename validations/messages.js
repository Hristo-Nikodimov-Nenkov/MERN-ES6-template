export function capitalize(str) {
   return str[0].toUpperCase() + str.slice(1);
}

export function fieldsString(fields) {
   return Array.isArray(fields)
      ? fields.map(f => f.toLowerCase())
         .map(f => capitalize(f))
         .join(", ")
      : capitalize(fields);
}

export function isRequiredMessage(fields) {
   const fieldsIsArray = Array.isArray(fields)
   const fieldNames = fieldsString(fields)

   return `${fieldNames} ${fieldsIsArray && fields.length > 1 ? "are" : "is"} required!`;
}

export function hasLengthMessage(fields, minLength, maxLength) {
   const fieldsStr = fieldsString(fields);
   return `${fieldsStr} must be between ${minLength} and ${maxLength} symbols!`;
}

export function hasValueRangeMessage(fields, minValue, maxValue) {
   const fieldsStr = fieldsString(fields);
   return `${fieldsStr} must be between ${minValue} and ${maxValue}.`;
}

export function containsMessage(fields, message) {
   const fieldsStr = fieldsString(fields);
   return `${fieldsStr} must contain ${message}.`;
}

export function existsMessage(field, value) {
   return `${capitalize(field)} ${value} exists.`;
}

export default {
   capitalize,
   fieldsString,
   isRequiredMessage,
   hasLengthMessage,
   hasValueRangeMessage,
   containsMessage,
   existsMessage
}