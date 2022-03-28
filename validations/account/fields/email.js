import {body} from "express-validator";
import User from "../../../models/User.js";
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
         const user = await User.emailExists(value);
         if (!!user) {
            throw emailExists(value);
         }

         return true;
      });