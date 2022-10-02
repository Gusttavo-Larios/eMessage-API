import "reflect-metadata"; //configuração TYPEORM

import dotenv from "dotenv";

import "./database";
import { serverHttp } from "./http";

dotenv.config();

serverHttp.listen(process.env.PORTA, () => {
  console.log("Server rodando na porta " + process.env.PORTA);
});
