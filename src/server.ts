import express from "express";
import cors from "cors";
import http from "http";
import "dotenv/config";
import { Server } from "socket.io";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.config";
import connectDB from "./config/db.config";

import fileRoutes from "./routes/file.route";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";

connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware Swagger
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/file", fileRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);

io.on("connection", (socket) => {
  console.log("New WebSocket connection");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
