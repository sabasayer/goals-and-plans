import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { User } from '../schemas/user.schema';
import { UserService } from '../user.service';

describe('User Service', () => {
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: () => ({
            save: () => {
              _id: 1;
            },
          }),
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
  });

  describe('Register', async () => {
    const user = await userService.register({
      userName: 'test',
      password: '1',
    });
    expect(user?._id).toBeDefined();
  });
});
