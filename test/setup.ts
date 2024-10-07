import { PrismaClient } from "@prisma/client";
import { Service } from "@services/service";
import { mockDeep } from "jest-mock-extended";

/**
 * This is a setup file for Jest which mocks the Prisma client.
 * It is run at the beginning of every test suite which imports it.
 */

// Mock the Prisma client
const PrismaClientMock = mockDeep<PrismaClient>();

// Set the singleton Prisma client instance on the Service class to the mocked Prisma client
// Test
//eslint-disable-next-line
//@ts-ignore
jest.spyOn(Service.prototype, "client", "get").mockReturnValue(PrismaClientMock);

// Clear the mock calls before each test
beforeEach(() => {
    jest.clearAllMocks();
});

// Export the mocked prisma client to allow making assertions on it in the tests
export { PrismaClientMock };
