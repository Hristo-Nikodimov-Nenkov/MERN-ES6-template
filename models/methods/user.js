import userService from "../../services/user.js";

export function setPasswordSync(password) {
    this.passwordSalt = userService.generateSaltSync();
    this.passwordHash = userService.generateHashSync(this.passwordSalt, password);
}

export async function setPassword(password) {
    this.passwordSalt = await userService.generateSalt();
    this.passwordHash = await userService.generateHash(this.passwordSalt, password);
}

export function checkPasswordSync(password) {
    return this.passwordHash === userService.generateHashSync(this.passwordSalt, password);
}

export async function checkPassword(password) {
    return this.passwordHash === await userService.generateHash(this.passwordSalt, password);
}

export default {
    setPasswordSync,
    setPassword,
    checkPasswordSync,
    checkPassword
}