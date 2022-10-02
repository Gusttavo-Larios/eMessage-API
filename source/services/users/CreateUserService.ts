import { getCustomRepository } from "typeorm";
import { Cryptography } from "../../crypto";
import IUser from "../../interfaces/interface.user";
import { UsersRepositories } from "../../repositories/users";

export class CreateUserService {
  async execute({ name, email, password }: IUser) {
    const usersRepository = getCustomRepository(UsersRepositories); //instanciando repositorio personalizado

    if (!email) {
      throw new Error("Email incorreto.");
    }

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new Error("Usuário já existente");
    }

    const cryptography = new Cryptography();
    const passwordHash = cryptography.generateHash(password);

    const user = usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    const token = cryptography.jwtSign(email);

    await usersRepository.save(user);

    return { ...user, token };
  }
}
