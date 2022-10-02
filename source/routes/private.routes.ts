import { Router } from "express";
import { SignInUserController } from "../controllers/users/SignInUserController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const privateRouter = Router();

privateRouter.use(AuthMiddleware.handle);

privateRouter.post("/sign-in", new SignInUserController().handle);

export default privateRouter;
