import { Request, Response } from "express";
import { SignInUserService } from "../../services/users/SignInUserService";

export class SignInUserController {
  async handle(request: Request, response: Response) {
    try {
      const { email, password } = request.body;
      const signInUserService = new SignInUserService();
      //resolver erro
      await signInUserService.execute({ email, password });
      return response
        .status(200)
        .json({ success: true, message: "Usuário encontrado" });
    } catch (error) {
      return response.status(400).json({ success: false, error });
    }
  }
}
