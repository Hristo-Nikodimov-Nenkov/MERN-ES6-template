export const username = {
   allowedRegex: /^[a-zA-Z0-9.\-_]+$/,
   minLength: 6,
   maxLength: 30,
};

export const password = {
   minLength: 8,
   maxLength: 40,
};

export const userRoles = {
   client: "User",
   admin: "Admin",
};

export const roles = Object.values(userRoles);

export default {
   username,
   password,
   roles,
};
