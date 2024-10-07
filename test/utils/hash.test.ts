import { comparePassword, hashPassword } from "@src/utils/hash";

// Describe what is being tested
describe("hash", () => {
    // Describe what is being tested
    describe("hashPassword", () => {
        // Describe the specific test
        test("should hash a plain text password", async () => {
            // Define the plain text password
            const plain = "test";
            // Hash the plain text password
            const hash = await hashPassword(plain);

            // Expect to receive a hashed password that is not the same as the plain text password
            expect(hash).toBeDefined();
            expect(hash).not.toEqual(plain);
        });

        test("should hash a plain text password with a different salt", async () => {
            // Define the plain text password
            const plain = "test";

            // Hash the plain text password twice
            const hash1 = await hashPassword(plain);
            const hash2 = await hashPassword(plain);

            // Expect to receive two different hashed passwords
            expect(hash1).not.toEqual(hash2);
        });
    });

    describe("comparePassword", () => {
        test("should return true if the plain text password matches the hashed password", async () => {
            // Define the plain text password
            const plain = "test";
            // Hash the plain text password
            const hash = await hashPassword(plain);
            // Compare the plain text password with the hashed password
            const result = await comparePassword(plain, hash);
            // Expect to receive a boolean indicating that the plain text password matches the hashed password
            expect(result).toBe(true);
        });

        test("should return false if the plain text password does not match the hashed password", async () => {
            // Define the plain text password
            const plain = "test";
            // Hash the plain text password
            const hash = await hashPassword(plain);
            // Compare an invalid plain text password with the hashed password
            const result = await comparePassword("invalid", hash);
            // Expect to receive a boolean indicating that the plain text password does not match the hashed password
            expect(result).toBe(false);
        });
    });
});
