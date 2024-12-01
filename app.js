const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./server/config/db");
const mainRoutes = require("./server/routes/main");
const songRoutes = require("./server/routes/song");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./server/config/swagger");

const app = express();
const port = process.env.PORT || 5000;

// Load env vars
dotenv.config();

// Connect to the database
connectDB();

// Routes
app.use("/", mainRoutes);
app.use("/songs", songRoutes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handler
app.use((err, req, res, next) => {
  console.error("Error: ", err);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/api-docs`);
});
