import {body} from "express-validator";
import {username as consts} from "../../../models/constants/account.js";
import Account from "../../../models/Account.js";
import {hasLengthMessage, isRequiredMessage} from "../../messages.js";
import {usernameExists} from "./errors.js";

export default (field) =>
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
         const user = await Account.usernameExists(value);
         if (!!user) {
            throw usernameExists(value);
         }

         return true;
      });