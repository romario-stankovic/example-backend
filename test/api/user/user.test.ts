import app from "@src/app";
import supertest from "supertest";
import { PrismaClientMock } from "../../setup";

describe("GET /api/user", () => {
    // Mock the findMany method of the user model to return an empty array
    const findManyMock = PrismaClientMock.user.findMany.mockResolvedValueOnce([]);

    // Define tests when the request is valid
    describe("when the request is valid", () => {
        // Define the test
        test("should respond with a 200 status code and a JSON object", async () => {
            // Send a request to the /api/user endpoint
            const response = await supertest(app).get("/api/user");
            // Expect the response status code to be 200
            expect(response.status).toBe(200);
            // Expect the response content type to be JSON
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            // Expect the response body to be an array
            expect(response.body).toBeInstanceOf(Array);
        });
    });

    // Define tests when the request is invalid
    describe("when the request is invalid", () => {
        // Define the test
        test("should respond with a 400 status code and a JSON object", async () => {
            // Define possible invalid queries
            const queries = [
                {
                    page: "invalid"
                },
                {
                    limit: "invalid"
                },
                {
                    page: "invalid",
                    limit: "invalid"
                }
            ];

            // Loop through the queries
            for (const query of queries) {
                // Send a request to the /api/user endpoint with the query
                const response = await supertest(app).get("/api/user").query(query);
                // Expect the response status code to be 400
                expect(response.status).toBe(400);
                // Expect the response content type to be JSON
                expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
                // Expect the response body to have a status and message property
                expect(response.body.status).toBeDefined();
                expect(response.body.message).toBeDefined();
            }

            // Expect the findMany method to not have been called
            expect(findManyMock).not.toHaveBeenCalled();
        });
    });
});

describe("GET /api/user/:id", () => {
    // Mock the findUnique method of the user model to return a user object only when the id is 1
    const findUniqueMock = (PrismaClientMock.user.findUnique as jest.Mock).mockImplementation(({ where }) => {
        return where.id === 1
            ? {
                  id: 1,
                  username: "test",
                  password: "test"
              }
            : null;
    });

    describe("when the request is valid", () => {
        test("should respond with a 200 status code and a JSON object", async () => {
            const response = await supertest(app).get(`/api/user/1`);

            expect(response.status).toBe(200);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));

            expect(response.body.id).toBe(1);
            expect(response.body.username).toBeDefined();
            expect(response.body.password).toBeUndefined();
        });

        test("should respond with a 404 status code and a JSON object if user does not exist", async () => {
            const response = await supertest(app).get(`/api/user/2`);

            expect(findUniqueMock).toHaveBeenCalled();

            expect(response.status).toBe(404);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.body.status).toBeDefined();
            expect(response.body.message).toBeDefined();
        });
    });

    describe("when the request is invalid", () => {
        test("should respond with a 400 status code and a JSON object", async () => {
            const response = await supertest(app).get("/api/user/invalid");

            expect(response.status).toBe(400);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.body.status).toBeDefined();
            expect(response.body.message).toBeDefined();

            expect(findUniqueMock).not.toHaveBeenCalled();
        });
    });
});

describe("POST /api/user", () => {
    // Mock the create method of the user model to return a user object with an id of 1 and the username and password provided
    const createMock = (PrismaClientMock.user.create as jest.Mock).mockImplementation(({ data }) => {
        return {
            id: 1,
            username: data.username,
            password: data.password
        };
    });

    describe("when the request is valid", () => {
        test("should respond with a 200 status code and a JSON object", async () => {
            const body = {
                username: "test",
                password: "test"
            };

            const response = await supertest(app).post("/api/user").send(body);

            expect(createMock).toHaveBeenCalled();

            expect(response.status).toBe(200);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.body.username).toBe(body.username);
            expect(response.body.password).toBeUndefined();
        });
    });

    describe("when the request is invalid", () => {
        test("should respond with a 400 status code and a JSON object", async () => {
            const body = {
                username: "",
                password: ""
            };

            const response = await supertest(app).post("/api/user").send(body);

            expect(response.status).toBe(400);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));

            expect(createMock).not.toHaveBeenCalled();
        });
    });
});

describe("PUT /api/user/:id", () => {
    const updateMock = (PrismaClientMock.user.update as jest.Mock).mockImplementation(({ where, data }) => {
        return where.id === 1
            ? {
                  id: 1,
                  username: data.username,
                  password: data.password
              }
            : null;
    });

    describe("when the request is valid", () => {
        test("should respond with a 200 status code and a JSON object", async () => {
            const body = {
                username: "test",
                password: "test"
            };

            const response = await supertest(app).put("/api/user/1").send(body);

            expect(updateMock).toHaveBeenCalled();

            expect(response.status).toBe(200);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.body.username).toBe(body.username);
            expect(response.body.password).toBeUndefined();
        });

        test("should respond with a 400 status code and a JSON object if user does not exist", async () => {
            const body = {
                username: "test",
                password: "test"
            };

            const response = await supertest(app).put("/api/user/2").send(body);

            expect(updateMock).toHaveBeenCalled();

            expect(response.status).toBe(400);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(response.body.status).toBeDefined();
            expect(response.body.message).toBeDefined();
        });
    });

    describe("when the request is invalid", () => {
        test("should respond with a 400 status code and a JSON object", async () => {
            const body = {
                username: "",
                password: ""
            };

            const response = await supertest(app).put("/api/user/1").send(body);

            expect(response.status).toBe(400);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));

            expect(updateMock).not.toHaveBeenCalled();
        });
    });
});

describe("DELETE /api/user/:id", () => {
    const deleteMock = (PrismaClientMock.user.delete as jest.Mock).mockImplementation(({ where }) => {
        return where.id === 1 ? { id: 1, username: "test", password: "test" } : null;
    });

    describe("when the request is valid", () => {
        test("should respond with a 204 status code", async () => {
            const response = await supertest(app).delete("/api/user/1");

            expect(deleteMock).toHaveBeenCalled();

            expect(response.status).toBe(200);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));

            expect(response.body.username).toBeDefined();
            expect(response.body.password).toBeUndefined();
        });

        test("should respond with a 400 status code if user does not exist", async () => {
            const response = await supertest(app).delete("/api/user/2");

            expect(deleteMock).toHaveBeenCalled();

            expect(response.status).toBe(400);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));

            expect(response.body.status).toBeDefined();
            expect(response.body.message).toBeDefined();
        });
    });

    describe("when the request is invalid", () => {
        test("should respond with a 400 status code and a JSON object", async () => {
            const response = await supertest(app).delete("/api/user/invalid");

            expect(response.status).toBe(400);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));

            expect(deleteMock).not.toHaveBeenCalled();
        });
    });
});
