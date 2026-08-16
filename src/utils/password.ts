import bcrypt from "bcrypt";

// Number of hashing rounds used by bcrypt
const SALT_ROUNDS = 12;

// Hash a plain-text password before storing it
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

// Compare a plain-text password with the stored hash
export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
