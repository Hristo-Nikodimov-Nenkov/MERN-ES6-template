import {bodyFieldsExistsBail} from "../common.js";

const fields = ["verificationHash", "password"]

export default [
    bodyFieldsExistsBail(fields)
]