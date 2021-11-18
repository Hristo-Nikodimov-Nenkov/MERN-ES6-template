import {validationResult} from "express-validator";

export function validateModel(req, res, next) {
    const validations = validationResult(req);
    if (!validations.isEmpty()) {
        res.status(400)
            .send(validations
                .array()
                .map(err => (
                    {
                        param: err.param,
                        message: err.msg
                    }
                )));
        return;
    }

    next();
}