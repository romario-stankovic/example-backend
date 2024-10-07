import express from "express";
import { logMiddleware } from "@middlewares/log.middleware";
import { UserRouter } from "@controllers/user.controller";

// Create an Express application
const app = express();

// Add middleware to parse JSON request bodies into JavaScript objects
app.use(express.json());

// Add the logMiddleware to log the details of each request to the console
app.use(logMiddleware);

// Add the UserRouter to handle user-related routes
app.use("/api/user", UserRouter);

export default app;
