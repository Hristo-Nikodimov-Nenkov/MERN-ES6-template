export const usernameExists = (username) => `Username: ${username} is already registered.`;

export const invalidEmail = (email) => `${email} is NOT a valid E-Mail address.`;
export const emailExists = (email) => `E-Mail: ${email} is already registered.`;

export const smallLetterRequired = `Password must contain small letter.`;
export const capitalLetterRequired = 'Password must contain capital letter.';
export const digitRequired = `Password must contain a digit.`;
export const nonAlphanumericSymbolRequired = `Password must contain non-alphanumeric symbol.`;


export const passwordsAreDifferent = `Password and ConfirmPassword are different.`;
export default {
   usernameExists,
   emailExists,
   smallLetterRequired,
   capitalLetterRequired,
   digitRequired,
   nonAlphanumericSymbolRequired,
   passwordsAreDifferent
}