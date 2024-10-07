import { z } from "zod";

// DTO for retrieving multiple user entities from the database with optional filtering and pagination
export const GetAllUsersQuery = z.object({
    filter: z.string().min(0).max(255).optional(),
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().optional()
});

// DTO for retrieving a single user entity from the database by his ID
export const GetUserByIdParams = z.object({
    id: z.coerce.number().int().positive()
});

// DTO for creating a new user entity in the database
export const CreateUserBody = z.object({
    username: z.string().min(1).max(255),
    password: z.string().min(1).max(255)
});

// DTO for updating an existing user entity in the database
export const UpdateUserParams = z.object({
    id: z.coerce.number().int().positive()
});

// DTO for updating an existing user entity in the database
export const UpdateUserBody = z.object({
    username: z.string().min(1).max(255).optional(),
    password: z.string().min(8).max(255).optional()
});

// DTO for deleting a user entity from the database by his ID
export const DeleteUserParams = z.object({
    id: z.coerce.number().int().positive()
});
