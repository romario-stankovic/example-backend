import bcrypt from "bcrypt";

// Hash a plain text password using bcrypt and return the hashed password
export async function hashPassword(plain: string) {
    return await bcrypt.hash(plain, 10);
}

// Compare a plain text password with a hashed password and return a boolean indicating if they match
export async function comparePassword(plain: string, hash: string) {
    return await bcrypt.compare(plain, hash);
}
