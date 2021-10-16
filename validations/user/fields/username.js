import {username} from "../../../models/constants/user.js";
import {hasLength, isRequiredBail} from "../../common.js";


export function usernameValidations(fields = "username") {
    return [
        isRequiredBail(fields),
        hasLength(fields, username.minLength, username.maxLength)
    ]
}