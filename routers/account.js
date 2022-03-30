import {Router} from "express";
import {isAuthenticated, isNotAuthenticated} from "../middlewares/authentication.js";
import validateModel from "../middlewares/validateModel.js";
import {account} from "../validations";

import {accountController} from "../controllers";

const router = Router();

router.post(
   "/register",
   isNotAuthenticated(),
   ...account.registerValidations,
   validateModel,
   accountController.register);

router.post(
   "/login",
   isNotAuthenticated(),
   ...account.loginValidations,
   validateModel,
   accountController.login);

router.post(
   "/logout",
   isAuthenticated(),
   accountController.logout);

router.get("/profile",
   isAuthenticated(),
   accountController.profile)

router.put(
   "/changeUsername",
   isAuthenticated(),
   ...account.changeUsernameValidations,
   validateModel,
   accountController.changeUsername);

router.put(
   "/changeEmail",
   isAuthenticated(),
   ...account.changeEmailValidations,
   validateModel,
   accountController.changeEmail);

router.put(
   "/changePassword",
   isAuthenticated(),
   ...account.changePasswordValidations,
   validateModel,
   accountController.changePassword);

router.post(
   "/remove",
   isAuthenticated(),
   accountController.removePost);

router.delete(
   "/remove",
   isAuthenticated(),
   ...account.removeValidations,
   validateModel,
   accountController.removeDel);

export default router;