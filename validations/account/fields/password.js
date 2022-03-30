import {body} from "express-validator";
import {password as consts} from "../../../models/constants/account.js";
import {hasLengthMessage, isRequiredMessage} from "../../messages.js";
import {capitalLetterRequired, digitRequired, nonAlphanumericSymbolRequired, smallLetterRequired} from "./errors.js";

export default (field) =>
   body(field)
      .exists({checkFalsy: true, checkNull: true})
      .withMessage(isRequiredMessage(field))
      .bail()
      .isLength({
         min: consts.minLength,
         max: consts.maxLength
      })
      .withMessage(hasLengthMessage(field, consts.minLength, consts.maxLength))
      .custom(value => value.toLowerCase() !== value)
      .withMessage(capitalLetterRequired)
      .custom(value => value.toUpperCase() !== value)
      .withMessage(smallLetterRequired)
      .custom(value => /[0-9]+/g.test(value))
      .withMessage(digitRequired)
      .custom(value => /[^a-zA-Z\d\s:]+/g.test(value))
      .withMessage(nonAlphanumericSymbolRequired);