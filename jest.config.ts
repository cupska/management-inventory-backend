export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__TEST__/**/*.ts", "**/?(*.)+(spec|test).ts"],
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.json" }],
  },
};
