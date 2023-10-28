module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__**/*.test.ts"],
  verbose: true,
  forceExit: true,
  clearMocks: true,

  setupFilesAfterEnv: ["<rootDir>/src/__tests__/test-setup.ts"],
}
