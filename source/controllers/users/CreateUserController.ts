import { Request, Response } from "express";
import { CreateUserService } from "../../services/users/CreateUserService";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;

      const createUserService = new CreateUserService();

      const user = await createUserService.execute({ name, email, password });

      return response.json({
        token: user.token,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      console.log(error);
      return response.status(400).json({ message: "Usuário já existente" });
    }
  }
}
