// File Path: src/server.js
const app = require("./app");
const connectDB = require("./database/db"); // 🔥 FIXED: Hated the curly braces {} to prevent TypeError
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
if (typeof connectDB === "function") {
  connectDB();
} else if (connectDB && typeof connectDB.connectDB === "function") {
  connectDB.connectDB();
} else {
  console.log("Database connector found but checking structure...");
}

const server = app.listen(PORT, () => {
  console.log(`Server executing safely on port: ${PORT} 🚀`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Critical Shutdown: ${err.message}`);
  server.close(() => process.exit(1));
});