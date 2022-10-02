import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

import router from "./routes";

const server = express();

server.use(cors());

server.use(express.json());
server.use("/", router);

server.use((_, response) => {
  return response.status(404).send("Página não encontrada");
});

const serverHttp = http.createServer(server);

const io = new Server(serverHttp, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

export { serverHttp, io };
