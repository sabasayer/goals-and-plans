import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserInput } from './dto/register-user.input';
import { User, UserDocument } from './schemas/user.schema';
import * as crypto from 'crypto';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(data: RegisterUserInput) {
    data.password = this.hashPassword(data.password);

    const user = new this.userModel(data);
    return user.save();
  }

  async login(data: LoginUserInput): Promise<boolean> {
    const user = await this.userModel
      .where({ userName: data.userName })
      .findOne()
      .exec();

    const hashed = this.hashPassword(data.password);

    return !user || hashed === user.password;
  }

  async find(id: string) {
    return this.userModel.findById(id).exec();
  }

  private hashPassword(password: string) {
    return crypto.createHash('md5').update(password).digest('hex');
  }
}
