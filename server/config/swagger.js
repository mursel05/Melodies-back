const swaggerJSDoc = require("swagger-jsdoc");

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Melodies API",
      version: "1.0.0",
      description: "API Documentation for Melodies",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server",
      },
      {
        url: "https://melodies-back.onrender.com",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: { bearerAuth: { type: "http", scheme: "bearer" } },
    },
  },
  apis: ["./server/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
