import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Community Skill Exchange API",
      version: "1.0.0",
      description: "API documentation for the Community Skill Exchange application",
    },
    servers: [{ url: process.env.SWAGGER_SERVER_URL || "/" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts", "./src/models/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: express.Application) => {
  app.get(["/swagger.json", "/api-docs/swagger.json"], (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        url: "/swagger.json",
        persistAuthorization: true,
      },
    })
  );
};
