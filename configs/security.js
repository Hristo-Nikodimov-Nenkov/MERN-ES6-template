import {port} from "./application.js";

export const defaultEncoding = "base64";
export const encoding =
   process.env.SECURITY_ENCODING in
   ["ascii", "utf8", "utf16le", "ucs2", "base64", "binary", "hex"]
      ? process.env.SECURITY_ENCODING
      : defaultEncoding;

export const defaultPasswordSaltLength = 16;
export const passwordSaltLength =
   process.env.PASSWORD_SALT_LENGTH || defaultPasswordSaltLength;

export const defaultPasswordHashLength = 64;
export const passwordHashLength =
   process.env.PASSWORD_HASH_LENGTH || defaultPasswordHashLength;

export const defaultIterationsCount = 15000;
export const iterationsCount =
   process.env.PASSWORD_HASH_ITERATIONS || defaultIterationsCount;

export const defaultHashingAlgorithm = "sha512";
export const hashingAlgorithm =
   process.env.PASSWORD_HASHING_ALGORITHM || defaultHashingAlgorithm;

export const passwordConfigs = {
   encoding,
   passwordSaltLength,
   passwordHashLength,
   iterationsCount,
   hashingAlgorithm,
};

export const defaultTokenSecret = "My JWT Signing Secret";
export const tokenSecret = process.env.JWT_SECRET || defaultTokenSecret;

export const defaultTokenIssuer = `localhost:${port}`;
export const tokenIssuer = process.env.JWT_ISSUER || defaultTokenIssuer;

export const defaultTokenAudience = `localhost:${port}`;
export const tokenAudience = process.env.JWT_AUDIENCE || defaultTokenAudience;

export const defaultTokenExpiresIn = "1h";
export const tokenExpiresIn = process.env.JWT_EXPIERY || defaultTokenExpiresIn;

export const tokenConfigs = {
   tokenSecret,
   options: {
      issuer: tokenIssuer,
      audience: tokenAudience,
      expiresIn: tokenExpiresIn,
   },
};

export const defaultCookieSecret = "My Cookies Signing Secret";
export const cookieSecret = process.env.COOKIE_SECRET || defaultCookieSecret;

export const defaultAuthenticationCookieName = "Authentication";
export const authenticationCookieName =
   process.env.COOKIE_NAME || defaultAuthenticationCookieName;

export const cookieConfigs = {
   authenticationCookieName,
   cookieSecret,
   options: {
      httpOnly: true,
      signed: true,
      secure: process.env.NODE_ENV === "production",
   },
};

export const defaultConfigs = {
   defaultEncoding,
   defaultPasswordSaltLength,
   defaultPasswordHashLength,
   defaultIterationsCount,
   defaultHashingAlgorithm,
   defaultTokenSecret,
   defaultCookieSecret,
};

const securityConfigs = {
   defaultConfigs,
   passwordConfigs,
   tokenConfigs,
   cookieConfigs,
};

export default securityConfigs;
