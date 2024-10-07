import { hashPassword } from "@utils/hash";
import { Service } from "@services/service";

// A derived service
export class UserService extends Service {
    // Get all users
    async getAll(filter: string, page: number, limit: number) {
        // Calculate how many records to skip based on the page number and limit
        const offset = (page - 1) * limit;

        // Find a user where the username contains the filter string and return a subset of the results based on the offset and limit
        return await this.client.user.findMany({
            where: {
                username: {
                    contains: filter
                }
            },
            skip: offset,
            take: limit
        });
    }

    // Get a single user by his ID
    async getById(id: number) {
        // Find a user where the ID matches the provided ID
        return await this.client.user.findUnique({
            where: {
                id: id
            }
        });
    }

    // Get a single user by his username
    async getByUsername(username: string) {
        // Find a user where the username matches the provided username
        return await this.client.user.findUnique({
            where: {
                username: username
            }
        });
    }

    // Create a new user
    async create(username: string, password: string) {
        // Hash the password before storing it in the database
        password = await hashPassword(password);

        // Create a new user with the provided username and password and return the saved user data
        try {
            return await this.client.user.create({
                data: {
                    username: username,
                    password: password
                }
            });
        } catch {
            return null;
        }
    }

    // Update an existing user
    async update(id: number, username: string | undefined, password: string | undefined) {
        // Hash the password before updating it in the database if it is provided
        if (password) {
            password = await hashPassword(password);
        }

        // Update the user with the provided ID and return the updated user data
        // NOTE: The Prisma client will only update the fields that are provided (not undefined)
        try {
            return await this.client.user.update({
                where: {
                    id: id
                },
                data: {
                    username: username,
                    password: password
                }
            });
        } catch {
            return null;
        }
    }

    // Delete the user with the provided ID
    async delete(id: number) {
        // Delete the user with the provided ID
        try {
            return await this.client.user.delete({
                where: {
                    id: id
                }
            });
        } catch {
            return null;
        }
    }
}
