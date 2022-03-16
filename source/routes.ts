import { Response, Router } from "express";
import { CreateUserController } from "./controllers/users/CreateUserController";

const router = Router()

router.get("/", (_, response: Response) => {
    return response.send('Okk')
})

router.post("/register", new CreateUserController().handle)


export default router