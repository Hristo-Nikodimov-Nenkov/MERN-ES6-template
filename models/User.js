import mongoose from "mongoose";

import userSchema from "./schemas/user.js";
import instanceMethods from "./methods/user.js";
import staticMethods from "./statics/user.js";

for (const methodName in instanceMethods) {
    userSchema.methods[methodName] = instanceMethods[methodName];
}

for (const methodName in staticMethods) {
    userSchema.statics[methodName] = staticMethods[methodName];
}

const User = mongoose.model("User", userSchema, "users", false);
export default User;