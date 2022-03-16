import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../../repositories/users"

interface IUserResquest {
    name: string,
    email: string,
    password: string
}


export class CreateUserService {
    async execute({name, email, password} : IUserResquest) {
        const usersRepository = getCustomRepository(UsersRepositories)//instanciando repositorio personalizado

        if(!email) {
            throw new Error("Email incorreto")
        }

        const userAlreadyExists = await usersRepository.findOne({
            email
        })

        if (userAlreadyExists) {
            throw new Error("Usuário já existente")
        }
            
        const user = usersRepository.create({
            name,
            email,
            password
        })

        await usersRepository.save(user)

        return user
    }        
}