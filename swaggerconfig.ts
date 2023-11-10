import swaggerJSDoc from "swagger-jsdoc"

const spec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express FischkappAPI with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Ajmag",
        url: "https://github.com/Wiecek-K/",
        email: "krystiandwiecek@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["src/routes/*.ts"],
}

export const swaggerConfig = swaggerJSDoc(spec)

export const swaggerUiOptions = {
  filter: true,
  persistAuthorization: true,
}
