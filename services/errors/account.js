export const userWithIdDoesNotExist = (userId) => `User with ID: ${userId} does NOT exist.`;
export const invalidEmailAddress = (email) => `${email} is NOT valid E-Mail address.`;
export const emailExists = (email) => `E-Mail: ${email} is already registered.`;

export default {
   userWithIdDoesNotExist,
   invalidEmailAddress,
   emailExists
}