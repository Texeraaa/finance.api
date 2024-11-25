import { User } from "../../domain/user/entity/user";
import { UserGateway } from "../../domain/user/gateway/product.gateway";
import { Usecase } from "../usecase";

export type ListUserInputDto = void;

export type ListUserOutputDto = {
  users: {
    id: string;
    name: string;
    cpf: string;
    balance: number;
  }[];
};

export class ListUserUsecase
  implements Usecase<ListUserInputDto, ListUserOutputDto>
{
  private constructor(private readonly userGateway: UserGateway) {}

  public static create(userGateway: UserGateway) {
    return new ListUserUsecase(userGateway);
  }
  public async execute(): Promise<ListUserOutputDto> {
    const aUsers = await this.userGateway.list();

    const output = this.presentOutput(aUsers);

    return output;
  }

  private presentOutput(users: User[]): ListUserOutputDto {
    return {
      users: users.map((p) => {
        return {
          id: p.id,
          name: p.name,
          cpf: p.cpf,
          balance: p.balance,
        };
      }),
    };
  }
}
