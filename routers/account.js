import { Router } from "express";
import { isAuthenticated } from "../middlewares/authentication.js";
import { validateModel } from "../middlewares/validateModel.js";
import validations from "../validations/user/index.js";

import account from "../controllers/account.js";

const router = Router();

router.post(
   "/register",
   ...validations.register,
   validateModel,
   account.register
);

router.post("/login", ...validations.login, validateModel, account.login);

router.post("/logout", isAuthenticated(), account.logout);

router.put(
   "/changeUsername",
   isAuthenticated(),
   ...validations.changeUsername,
   validateModel,
   account.changeUsername
);

router.put(
   "/changeEmail",
   isAuthenticated(),
   ...validations.changeEmail,
   validateModel,
   account.changeEmail
);

router.put(
   "/changePassword",
   isAuthenticated(),
   ...validations.changePassword,
   validateModel,
   account.changePassword
);

router.post("/remove", isAuthenticated(), account.removePost);

router.delete(
   "/remove",
   isAuthenticated(),
   ...validations.remove,
   validateModel,
   account.removeDel
);

export default router;
