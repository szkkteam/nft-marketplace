import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: User): Promise<User> {
    const reqBody = {
      username: 'placeholder',
      address: user.address,
      proxy: user.proxy,
    };
    const newUser = new this.userModel(reqBody);
    return newUser.save();
  }
}
