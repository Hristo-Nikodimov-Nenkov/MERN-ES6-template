export const defaultEncoding = "base64";
export const encoding = process.env.SECURITY_ENCODING
    in ["ascii", "utf8", "utf16le", "ucs2", "base64", "binary", "hex"]
    ? process.env.SECURITY_ENCODING
    : defaultEncoding;

export const defaultPasswordSaltLength = 16;
export const passwordSaltLength = process.env.PASSWORD_SALT_LENGTH || defaultPasswordSaltLength;

export const defaultPasswordHashLength = 64;
export const passwordHashLength = process.env.PASSWORD_HASH_LENGTH || defaultPasswordHashLength;

export const defaultIterationsCount = 15000;
export const iterationsCount = process.env.PASSWORD_HASH_ITERATIONS || defaultIterationsCount;

export default {
    defaultEncoding,
    encoding,
    defaultPasswordSaltLength,
    passwordSaltLength,
    defaultPasswordHashLength,
    passwordHashLength,
    defaultIterationsCount,
    iterationsCount
}