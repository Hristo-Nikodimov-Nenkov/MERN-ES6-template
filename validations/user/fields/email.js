import {body} from "express-validator";
import fieldNames from "../fieldNames.js";
import {getFieldErrorMessages} from "../../errorMessages.js";
import User from "../../../models/User.js";

const errorMessages = getFieldErrorMessages("user", fieldNames.emailFieldName);

export const email = (field) =>
    body(field)
        .exists({checkFalsy: true})
        .withMessage(errorMessages.isRequired)
        .bail()
        .isEmail()
        .withMessage(errorMessages.invalidEmailAddress)
        .custom(async (value) => {
            const user = await User.emailExists(value);
            if (!!user) {
                throw errorMessages.isRegistered(value);
            }

            return true;
        });

export default email;