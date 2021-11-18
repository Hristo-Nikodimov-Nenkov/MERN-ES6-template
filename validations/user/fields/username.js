import {body} from "express-validator";
import {existsMessage, hasLengthMessage, isRequiredMessage} from "../../messages.js";
import {username as consts} from "../../../models/constants/user.js";
import User from "../../../models/User.js";

export const username = (field) =>
    body(field)
        .exists({checkFalsy: true})
        .withMessage(isRequiredMessage(field))
        .bail()
        .toLowerCase()
        .isLength({
            min: consts.minLength,
            max: consts.maxLength
        })
        .withMessage(hasLengthMessage(field, consts.minLength, consts.maxLength))
        .custom(async (value) => {
            const user = await User.usernameExists(value);
            if (!!user) {
                throw existsMessage(field, value);
            }

            return true;
        });