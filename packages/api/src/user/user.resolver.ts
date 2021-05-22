import { Resolver, Int, Args, Query, Mutation } from '@nestjs/graphql';
import { LoginUserInput } from './dto/login-user.input';
import { RegisterUserInput } from './dto/register-user.input';
import { UserModel } from './models/user.model';
import { UserService } from './user.service';

@Resolver((of) => UserModel)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => UserModel, { nullable: true })
  async user(
    @Args('id', { type: () => String }) id: string,
  ): Promise<UserModel | null> {
    const res = await this.userService.find(id);
    if (!res) return null;

    return { userName: res.userName };
  }

  @Mutation((returns) => String)
  async register(
    @Args({ name: 'user', type: () => RegisterUserInput })
    user: RegisterUserInput,
  ) {
    const res = await this.userService.register(user);
    return res._id;
  }

  @Mutation(() => Boolean)
  async login(
    @Args({ name: 'data', type: () => LoginUserInput }) data: LoginUserInput,
  ) {
    return await this.userService.login(data);
  }
}
