import userService from "../services/user.js";
import {
   signToken,
   setAuthenticationCookie,
   deleteAuthenticationCookie
} from "../services/security.js";

import {
   getRegisterModel,
   getLoginModel,
   getChangeUsernameModel,
   getChangeEmailModel,
   getChangePasswordModel,
   getRemoveModel,
   getUserViewModel,
   getUserTokenModel
} from "../mappers/user.js";

export const register = async (req, res) => {
   try {
      const user = await userService.createUser(getRegisterModel(req.body));
      res.status(200).send(JSON.stringify(user));
   } catch (err) {
      res.status(400).send(JSON.stringify(err));
   }
}

export const login = async (req, res) => {
   try {
      const user = await userService.checkUser(getLoginModel(req.body));
      const token = await signToken(getUserTokenModel(user));
      setAuthenticationCookie(res, token);
      const viewModel = getUserViewModel(user);
      res.status(200).send(JSON.stringify(viewModel));
   } catch (err) {
      res.status(400).send(JSON.stringify(err));
   }
}

export const profile = async (req, res) => {
   const user = await userService.getById(req.user.id);
   const viewModel = getUserViewModel(user);
   res.status(200).send(JSON.stringify(viewModel));
}

export const logout = (req, res) => {
   deleteAuthenticationCookie(res);
   res.status(200).send(JSON.stringify("Log-out successful."));
}

export const changeUsername = async (req, res) => {
   try {
      const user = await userService.changeUsername(getChangeUsernameModel(req.user.id, req.body));
      const viewModel = getUserViewModel(user);
      res.status(200).send(JSON.stringify(viewModel));
   } catch (err) {
      res.status(400).send(err);
   }
}

export const changeEmail = async (req, res) => {
   try {
      const user = await userService.changeEmail(getChangeEmailModel(req.user.id, req.body));
      const viewModel = getUserViewModel(user);
      res.status(200).send(JSON.stringify(viewModel));
   } catch (err) {
      res.status(400).send(err);
   }
}

export const changePassword = async (req, res) => {
   try {
      const user = await userService.changePassword(getChangePasswordModel(req.user.id, req.body));
      const viewModel = getUserViewModel(user);
      res.status(200).send(JSON.stringify(viewModel));
   } catch (err) {
      res.status(400).send(err);
   }
}

export const removePost = async (req, res) => {
   const hash = await userService.generateVerificationHash(req.user.id);
   res.status(200).send(JSON.stringify(hash));
}

export const removeDel = async (req, res) => {
   try {
      const model = getRemoveModel(req.user.id, req.body);
      const user = await userService.deleteUser(model);
      const viewModel = getUserViewModel(user);
      res.status(200).send(JSON.stringify(viewModel));
   } catch (err) {
      res.status(400).send(JSON.stringify(err));
   }
}

export default {
   register,
   login,
   logout,
   profile,
   changeUsername,
   changeEmail,
   changePassword,
   removePost,
   removeDel
}