import { User } from "../../domain/user/entity/user"
import { UserGateway } from "../../domain/user/gateway/product.gateway"
import { Usecase } from "../usecase"

export type CreateUserInputDto = {
    name: string
    cpf: string
    password: string
}

export type CreateUserOutputDto = {
    id: string
}


export class CreateUserUsecase implements Usecase<CreateUserInputDto, CreateUserOutputDto>{
    private constructor(private readonly userGateway: UserGateway){}

    public static create(userGateway: UserGateway){
        return new CreateUserUsecase(userGateway)
    }

    public async execute({name,cpf,password}: CreateUserInputDto): Promise<CreateUserOutputDto> {
        const aUser = User.create(name,cpf,password)
        
        await this.userGateway.save(aUser)

        const output: CreateUserOutputDto = {
            id: aUser.id
        }

        return output
    }
}