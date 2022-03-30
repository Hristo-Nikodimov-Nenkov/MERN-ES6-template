import {body} from "express-validator";
import Account from "../../../models/Account.js";
import {isRequiredMessage} from "../../messages.js";
import {invalidEmail, emailExists} from "./errors.js";

export default (field) =>
   body(field)
      .exists({checkFalsy: true})
      .withMessage(isRequiredMessage(field))
      .bail()
      .isEmail()
      .withMessage((value) => invalidEmail(value))
      .custom(async (value) => {
         const user = await Account.emailExists(value);
         if (!!user) {
            throw emailExists(value);
         }

         return true;
      });