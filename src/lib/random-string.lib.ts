/**
 * Generates a random string of specified length using alphanumeric characters
 * @param length - The desired length of the random string
 * @returns A random string containing uppercase letters, lowercase letters, and numbers
 * @example
 * ```typescript
 * const str = randomString(8); // Returns something like "Ab4kL9pQ"
 * ```
 */
export const randomString = (length: number) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
