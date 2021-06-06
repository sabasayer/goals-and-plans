import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field()
  id: string;
  @Field()
  userName: string;
  @Field()
  level: number;
  @Field()
  experience: number;
  @Field()
  token: string;
}
