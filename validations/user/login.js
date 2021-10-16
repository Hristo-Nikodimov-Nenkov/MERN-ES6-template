import {isRequired, isRequiredBail} from "../common.js"

export default [
    isRequired("username"),
    isRequiredBail("password")
]
