import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserInput } from './dto/register-user.input';
import { User, UserDocument } from './schemas/user.schema';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { LoginUserInput } from './dto/login-user.input';
import { JWT_SECRET } from './jwt.secret';
import { AUTH_TOKEN_PREFIX } from './auth.const';
import { UserModel } from './models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(data: RegisterUserInput) {
    const user: User = {
      userName: data.userName,
      password: this.hashPassword(data.password),
      level: 1,
      experience: 0,
    };
    const userDoc = await this.userModel.create(user);

    if (!userDoc)
      throw new HttpException(
        'Register Failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return this.createUserResponse(userDoc);
  }

  async login(data: LoginUserInput): Promise<UserModel> {
    const user = await this.userModel
      .where({ userName: data.userName })
      .findOne()
      .exec();

    const hashed = this.hashPassword(data.password);

    if (!user || hashed !== user.password)
      throw new HttpException('Invalid User Info', HttpStatus.UNAUTHORIZED);

    return this.createUserResponse(user);
  }

  async find(id: string) {
    const user = await this.userModel.findById(id).exec();

    if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);

    return this.createUserResponse(user);
  }

  createUserResponse(user: UserDocument):UserModel {
    const token = this.createAuthToken(user);

    return {
      id: user._id ?? '',
      userName: user.userName,
      experience: user.experience,
      level: user.level,
      token,
    };
  }

  private hashPassword(password: string) {
    return crypto.createHash('md5').update(password).digest('hex');
  }

  private createToken({ _id, userName }: UserDocument) {
    return jwt.sign({ _id, userName }, JWT_SECRET);
  }

  private createAuthToken(user: UserDocument) {
    const token = this.createToken(user);
    return `${AUTH_TOKEN_PREFIX} ${token}`;
  }
}
