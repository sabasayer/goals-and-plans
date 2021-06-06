import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { AuthGuard } from './auth.guard';
import { LoginUserInput } from './dto/login-user.input';
import { RegisterUserInput } from './dto/register-user.input';
import { UserModel } from './models/user.model';
import { UserService } from './user.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserModel, { nullable: true })
  @UseGuards(new AuthGuard())
  async user(
    @Args('id', { type: () => String }) id: string,
  ): Promise<UserModel | null> {
    return this.userService.find(id);
  }

  @Mutation(() => UserModel)
  async register(
    @Args({ name: 'user', type: () => RegisterUserInput })
    user: RegisterUserInput,
  ) {
    return await this.userService.register(user);
  }

  @Mutation(() => UserModel)
  async login(
    @Args({ name: 'data', type: () => LoginUserInput }) data: LoginUserInput,
  ) {
    return await this.userService.login(data);
  }
}
