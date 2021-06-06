import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { User, UserDocument } from '../schemas/user.schema';
import { UserService } from '../user.service';

describe('User Service', () => {
  let userService: UserService;

  const mockUserModel = {
    create: (user: User) => ({
      _id: `${user.userName}_id`,
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
  });

  describe('Register', () => {
    it('should register', async () => {
      const user = await userService.register({
        userName: 'test',
        password: '1',
      });
      
      expect(user?.id).toBe('test_id');
    });
  });
});
