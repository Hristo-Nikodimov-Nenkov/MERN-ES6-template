import securityService from "../../services/security.js";

export function setPasswordSync(password) {
    this.passwordSalt = securityService.generateSaltSync();
    this.passwordHash = securityService.generateHashSync(this.passwordSalt, password);
}

export async function setPassword(password) {
    this.passwordSalt = await securityService.generateSalt();
    this.passwordHash = await securityService.generateHash(this.passwordSalt, password);
}

export function checkPasswordSync(password) {
    return this.passwordHash === securityService.generateHashSync(this.passwordSalt, password);
}

export async function checkPassword(password) {
    return this.passwordHash === await securityService.generateHash(this.passwordSalt, password);
}

export default {
    setPasswordSync,
    setPassword,
    checkPasswordSync,
    checkPassword
}