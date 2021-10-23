import {Router} from "express";
import {isAuthenticated} from "../services/security.js";

import registerValidations from "../validations/user/register.js";
import loginValidations from "../validations/user/login.js";
import removeValidations from "../validations/user/remove.js";
import {validateModel} from "../validations/common.js";

import account from "../controllers/account.js";

const router = Router();

router.post("/register", ...registerValidations, validateModel, account.registerPost);
router.post("/login", ...loginValidations, validateModel, account.loginPost);
router.post("/logout", isAuthenticated(), account.logoutPost);
router.get("/remove", isAuthenticated(), account.removeGet);
router.delete("/remove", isAuthenticated(), ...removeValidations, validateModel, account.removeDel);

export default router;