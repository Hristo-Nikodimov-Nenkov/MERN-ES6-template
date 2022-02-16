import {baseUrl} from "./application.js";

export const googleClientId = process.env.GOOGLE_CLIENT_ID || "";
export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
export const redirect = baseUrl;

export const googleConfig = {
   clientId: googleClientId,
   clientSecret: googleClientSecret,
   redirect
};

export const defaultScope = [
   'https://www.googleapis.com/auth/plus.me',
   'https://www.googleapis.com/auth/userinfo.email',
];

const googleConfigs = {
   googleClientId,
   googleClientSecret,
   redirect,
   googleConfig,
   defaultScope
}

export default googleConfigs;