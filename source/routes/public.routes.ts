import { Response, Router } from "express";
import { CreateUserController } from "../controllers/users/CreateUserController";
import { io } from "../http";

const publicRouter = Router();

publicRouter.post("/register", new CreateUserController().handle);
publicRouter.get("/teste", (_, response: Response) => {
  io.emit("teste", {
    message: "TESTE",
  });

  response.send("teste");
});

export default publicRouter;
