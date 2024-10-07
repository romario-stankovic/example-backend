import { PrismaClient } from "@prisma/client";

// A base service class which provides access to the Prisma client to its subclasses
export abstract class Service {
    // A getter method to access the Prisma client

    protected static _client: PrismaClient | undefined;

    // A Singleton pattern to ensure that only one instance of the Prisma client is created and shared across all service classes
    protected get client() {
        // Check if there is already a Prisma client instance, if so, return it
        if (Service._client !== undefined) {
            return Service._client;
        }

        // Otherwise, create a new Prisma client instance and return it
        return (Service._client = new PrismaClient());
    }
}
