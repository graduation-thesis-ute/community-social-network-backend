import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";

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
      schemas: {
        NewUser: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Vo Huu Tai",
            },
            email: {
              type: "string",
              example: "vohuutai2369@gmail.com",
            },
            password: {
              type: "string",
              example: "123456",
            },
            memberId: {
              type: "string",
              example: "21110294",
            },
          },
          required: ["name", "email", "password", "memberId"],
        },
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "60f4e3e2b3e0f80015e1f5d7",
            },
            name: {
              type: "string",
              example: "Vo Huu Tai",
            },
            email: {
              type: "string",
              example: "vohuutai2369@gmail.com",
            },
            password: {
              type: "string",
              example: "adhdadhajsdhas@3ad",
            },
            memberId: {
              type: "string",
              example: "21110294",
            },
            createdAt: {
              type: "string",
              example: "2021-07-19T08:27:30.000Z",
            },
            updatedAt: {
              type: "string",
              example: "2021-07-19T08:27:30.000Z",
            },
          },
        },
        LoginUser: {
          type: "object",
          properties: {
            email: {
              type: "string",
              example: "vohuutai2369@gmail.com",
            },
            password: {
              type: "string",
              example: "123456",
            },
          },
          required: ["email", "password"],
        },
        LoginResponse: {
          type: "object",
          properties: {
            accessToken: {
              type: "string",
              example:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjRlM2UyYjNlMGY4MDAxNWUxZjVkNyIsImVtYWlsIjoidm9odXV0YWkyMzY5QGdtYWlsLmNvbSIsImlhdCI6MTYyNjYwNjQwMiwiZXhwIjoxNjI2NjA2NzAyfQ",
            },
            refreshToken: {
              type: "string",
              example:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjRlM2UyYjNlMGY4MDAxNWUxZjVkNyIsImVtYWlsIjoidm9odXV0YWkyMzY5QGdtYWlsLmNvbSIsImlhdCI6MTYyNjYwNjQwMiwiZXhwIjoxNjI2NjA2NzAyfQ",
            },
          },
        },
      },
    },
  },

  apis: ["./src/routes/*.ts"], // files containing annotations as per the OpenAPI Specification
}; // attached on the routes file

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
