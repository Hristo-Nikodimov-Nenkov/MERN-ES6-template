export {default as fieldNames} from "./fields/fieldNames.js";
export {default as errorMessages} from "./fields/errors.js";

export {default as registerValidations} from "./register.js";
export {default as loginValidations} from "./login.js";
export {default as changeUsernameValidations} from "./changeUsername.js";
export {default as changeEmailValidations} from "./changeEmail.js";
export {default as changePasswordValidations} from "./changePassword.js";
export {default as removeValidations} from "./remove.js";

import fieldNames from "./fields/fieldNames.js";
import errorsMessages from "./fields/errors.js";
import registerValidations from "./register.js";
import loginValidations from "./login.js";
import changeUsernameValidations from "./changeUsername.js";
import changeEmailValidations from "./changeEmail.js";
import changePasswordValidations from "./changePassword.js";
import removeValidations from "./remove.js";

export default {
   fieldNames,
   errorsMessages,
   registerValidations,
   loginValidations,
   changeUsernameValidations,
   changeEmailValidations,
   changePasswordValidations,
   removeValidations
}