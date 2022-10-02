import { getCustomRepository } from "typeorm";
import { Cryptography } from "../../crypto";
import { UsersRepositories } from "../../repositories/users";

export class SignInUserService {
  execute = async (credentials: { email: string; password: string }) => {
    if (!credentials.email || !credentials.password)
      throw new Error("Email ou senha inválido");

    const usersRepository = getCustomRepository(UsersRepositories);

    const user = await usersRepository.findOne({ email: credentials.email });

    if (!user) throw new Error("Usuário não encontrado");

    const cryptography = new Cryptography();
    const passwordIsValid =
      cryptography.generateHash(credentials.password) === user.password;
    if (!passwordIsValid) throw new Error("Email ou senha inválido");

    return true;
  };
}
