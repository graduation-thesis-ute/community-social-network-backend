import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";
import { se } from "date-fns/locale";

dotenv.config();
const PORT = `http://localhost:${process.env.PORT || 5000}`;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Zalo UTE API Documentation",
      version: "1.0.0",
      description: "Documentation for Zalo UTE API",
    },
    servers: [
      {
        url: PORT,
        description: "Local server",
      },
      {
        url: `deployed-url`,
        description: "Remote server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/schema/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
