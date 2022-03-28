import {Router} from "express";
import {isAuthenticated, isNotAuthenticated} from "../middlewares/authentication.js";
import {validateModel} from "../middlewares/validateModel.js";
import {changeEmailValidations, changePasswordValidations, changeUsernameValidations, loginValidations, registerValidations, removeValidations} from "../validations/account";

import account from "../controllers/account.js";

const router = Router();

router.post(
   "/register",
   isNotAuthenticated(),
   ...registerValidations,
   validateModel,
   account.register);

router.post(
   "/login",
   isNotAuthenticated(),
   ...loginValidations,
   validateModel,
   account.login);

router.post(
   "/logout",
   isAuthenticated(),
   account.logout);

router.get("/profile",
   isAuthenticated(),
   account.profile)

router.put(
   "/changeUsername",
   isAuthenticated(),
   ...changeUsernameValidations,
   validateModel,
   account.changeUsername);

router.put(
   "/changeEmail",
   isAuthenticated(),
   ...changeEmailValidations,
   validateModel,
   account.changeEmail);

router.put(
   "/changePassword",
   isAuthenticated(),
   ...changePasswordValidations,
   validateModel,
   account.changePassword);

router.post(
   "/remove",
   isAuthenticated(),
   account.removePost);

router.delete(
   "/remove",
   isAuthenticated(),
   ...removeValidations,
   validateModel,
   account.removeDel);

export default router;