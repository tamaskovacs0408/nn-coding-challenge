import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Barber Booking API",
      version: "1.0.0",
      description: "API documentation for NN Coding Challenge backend",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["src/routes/*.ts"]
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
export const swaggerUiHandler = swaggerUi.setup(swaggerSpec);