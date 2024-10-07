import app from "@src/app";
import dotenv from "dotenv";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Load the environment variables from the .env file into the process.env object
dotenv.config();

// Read the port from the environment variables or use the default port 3000
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === "development") {
    const specs = swaggerJSDoc({
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Express API with Swagger",
                version: "1.0.0",
                description: "A simple Express API with Swagger documentation"
            }
        },
        apis: ["docs/*.yaml"]
    });

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
