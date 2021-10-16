import {Router} from "express";
import registerValidations from "../validations/user/register.js";
import loginValidations from "../validations/user/login.js";
import {validateModel} from "../validations/common.js";
import {isAuthenticated} from "../services/security.js";
import account from "../controllers/account.js";

const router = Router();

router.post("/register", registerValidations, validateModel, account.registerPost);
router.post("/login", loginValidations, validateModel, account.loginPost);
router.post("/logout", isAuthenticated(), account.logoutPost);

export default router;