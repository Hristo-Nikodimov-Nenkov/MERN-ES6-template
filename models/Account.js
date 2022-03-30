import mongoose from "mongoose";

import accountSchema from "./schemas/account.js";
import instanceMethods from "./methods/account.js";
import staticMethods from "./statics/account.js";

for (const methodName in instanceMethods) {
   accountSchema.methods[methodName] = instanceMethods[methodName];
}

for (const methodName in staticMethods) {
   accountSchema.statics[methodName] = staticMethods[methodName];
}

const Account = mongoose.model("Account", accountSchema, "accounts", false);
export default Account;