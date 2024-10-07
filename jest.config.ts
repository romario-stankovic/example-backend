import { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
const { compilerOptions } = require("./tsconfig.json");

export default {
    clearMocks: true,
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
    setupFilesAfterEnv: ["<rootDir>/test/setup.ts"]
} satisfies Config;
