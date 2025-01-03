const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./server/config/db");
const mainRoutes = require("./server/routes/main");
const songRoutes = require("./server/routes/song");
const userRoutes = require("./server/routes/user");
const playlistRoutes = require("./server/routes/playlist");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./server/config/swagger");
const path = require("path");

// Load env vars
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Body parser
app.use(express.json());

// Connect to the database
connectDB();

// Routes
app.use("/", mainRoutes);
app.use("/songs", songRoutes);
app.use("/users", userRoutes);
app.use("/playlists", playlistRoutes);

// Static folder
app.use("/public", express.static(path.join(__dirname, "public")));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handler
app.use((err, req, res, next) => {
  console.error("Error: ", err);
  res.status(500).json({ success: false, message: "Server error" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/api-docs`);
});
