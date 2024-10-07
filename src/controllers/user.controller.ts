import { Router } from "express";
import { UserService } from "@services/user.service";
import { validateObject } from "@utils/validate";
import { CreateUserBody, GetAllUsersQuery, GetUserByIdParams } from "@dtos/user.dto";

// Import the UserService class
const userService = new UserService();

// Create and export a router
export const UserRouter = Router();

UserRouter.get("/", async (req, res) => {
    // Validate query parameters
    const query = validateObject(req.query, GetAllUsersQuery);

    if ("status" in query) {
        res.status(400).json(query);
        return;
    }

    // Set default values for query parameters if they are not provided
    query.filter ??= "";
    query.page ??= 1;
    query.limit ??= 10;

    // Call the getAll method of the UserService class
    const user = await userService.getAll(query.filter, query.page, query.limit);

    user.forEach((u) => {
        delete (u as Partial<typeof u>).password;
    });

    // Send the response to the client
    res.json(user);
});

// Handler for the GET /api/user/:id route
UserRouter.get("/:id", async (req, res) => {
    // Validate the route parameters
    const params = validateObject(req.params, GetUserByIdParams);

    if ("status" in params) {
        res.status(400).json(params);
        return;
    }

    // Call the getById method of the UserService class
    const user = await userService.getById(params.id);

    // Return a 404 status code if the user is not found
    if (!user) {
        res.status(404).json({ status: 404, message: "User not found" });
        return;
    }

    // Make sure the password is not sent to the client
    delete (user as Partial<typeof user>).password;

    // Send the response to the client
    res.json(user);
});

// Handler for the POST /api/user route
UserRouter.post("/", async (req, res) => {
    // Validate the request body
    const body = validateObject(req.body, CreateUserBody);

    if ("status" in body) {
        res.status(400).json(body);
        return;
    }

    // Call the create method of the UserService class
    const user = await userService.create(body.username, body.password);

    if (!user) {
        res.status(400).json({ status: 400, message: "Failed to create a user" });
        return;
    }

    // Make sure the password is not sent to the client
    delete (user as Partial<typeof user>).password;

    // Send the response to the client
    res.json(user);
});

// Handler for the PUT /api/user/:id route
UserRouter.put("/:id", async (req, res) => {
    // Validate the route parameters and request body
    const params = validateObject(req.params, GetUserByIdParams);

    if ("status" in params) {
        res.status(400).json(params);
        return;
    }

    // Validate the request body
    const body = validateObject(req.body, CreateUserBody);

    if ("status" in body) {
        res.status(400).json(body);
        return;
    }

    // Call the update method of the UserService class
    const user = await userService.update(params.id, body.username, body.password);

    if (!user) {
        res.status(400).json({ status: 400, message: "Failed to update the user" });
        return;
    }

    // Make sure the password is not sent to the client
    delete (user as Partial<typeof user>).password;

    // Send the response to the client
    res.json(user);
});

// Handler for the DELETE /api/user/:id route
UserRouter.delete("/:id", async (req, res) => {
    // Validate the route parameters
    const params = validateObject(req.params, GetUserByIdParams);

    if ("status" in params) {
        res.status(400).json(params);
        return;
    }

    // Call the delete method of the UserService class
    const user = await userService.delete(params.id);

    if (!user) {
        res.status(400).json({ status: 400, message: "Failed to delete the user" });
        return;
    }

    // Make sure the password is not sent to the client
    delete (user as Partial<typeof user>).password;

    // Send the response to the client
    res.json(user);
});
