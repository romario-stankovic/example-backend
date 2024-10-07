import { ZodSchema } from "zod";
import { ErrorMessageOptions, generateErrorMessage } from "zod-error";

// Define the format of the error message
const errorFormat: ErrorMessageOptions = {
    delimiter: {
        error: "\n",
        component: " - "
    },
    path: {
        enabled: true,
        type: "objectNotation",
        label: ""
    },
    code: {
        enabled: false
    },
    message: {
        enabled: true,
        label: ""
    }
};

// Function which validates a object against a schema
export function validateObject<T>(obj: object | undefined, schema: ZodSchema<T>) {
    // Parse the object against the schema
    const data = schema.safeParse(obj);

    // If parsing was successful, return the data
    if (data.success) {
        return data.data;
    }

    // Otherwise, return the error messages
    return {
        status: 400,
        message: generateErrorMessage(data.error.issues, errorFormat).split("\n")
    };
}
