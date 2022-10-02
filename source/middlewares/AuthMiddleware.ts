import { NextFunction, Request, Response } from "express";
import { Cryptography } from "../crypto";

export class AuthMiddleware {
  static handle = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const headers = request.headers;
    const authorization = headers.authorization as string;

    if (!authorization)
      return response.status(403).json({ message: "Não autorizado" });

    const [_, token] = authorization.split(" ");
    const cryptography = new Cryptography();
    const tokenIsValid = cryptography.jwtVerify(token);

    if (!tokenIsValid) {
      return response.status(403).json({ message: "Não autorizado" });
    } else {
      next();
    }
  };
}
