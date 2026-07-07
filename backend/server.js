import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const REQUIRED_ENV = ["DB_HOST", "DB_USER", "DB_NAME", "JWT_SECRET"];
const missing = REQUIRED_ENV.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(
    `Missing required environment variables: ${missing.join(", ")}`,
  );
  console.error("Copy .env.example to .env and fill in the values.");
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
