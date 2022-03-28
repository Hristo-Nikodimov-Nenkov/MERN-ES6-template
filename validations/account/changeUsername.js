import username from "./fields/username.js";
import fieldNames from "./fields/fieldNames.js";
import {bodyFieldsExists} from "../common.js";

export default [
   username(fieldNames.username),
   bodyFieldsExists(fieldNames.password)
]