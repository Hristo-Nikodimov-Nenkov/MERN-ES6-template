import {body} from "express-validator";
import {isRequiredMessage} from "../../messages.js";
import {passwordsAreDifferent} from "./errors.js";

export default (field, compareField) =>
   body(field)
      .exists({checkFalsy: true})
      .withMessage(isRequiredMessage(field))
      .bail()
      .custom((val, {req}) => val === req.body[compareField])
      .withMessage(passwordsAreDifferent);