import {validationResult} from "express-validator";

const mapValidationError = (err) => (
   {
      param: err.param,
      message: err.msg
   }
);

export function validateModel(req, res, next) {
   const validationErrors = validationResult(req);

   if (validationErrors.isEmpty()) {
      next();
      return;
   }

   const mappedValidationErrors = validationErrors
      .array()
      .map(mapValidationError);

   res.status(400)
      .json(mappedValidationErrors);
}

export default validateModel;