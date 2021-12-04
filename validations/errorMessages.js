import userFieldNames from "./user/fieldNames.js";

import userErrorMessages from "./errorMessages/user.js";

export const modelFieldNames = {
   user: userFieldNames,
};

export const modelsErrorMessages = {
   user: userErrorMessages,
};

export const getFieldErrorMessages = (model, field) =>
   modelsErrorMessages[model][field] || [];

export default {
   modelFieldNames,
   modelsErrorMessages,
};
