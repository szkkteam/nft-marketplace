import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from './account.schema';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  async create(account: Account): Promise<Account> {
    const reqBody = {
      username: 'placeholder',
      address: account.address,
      proxy: account.proxy,
    };
    const newUser = new this.accountModel(reqBody);
    return newUser.save();
  }

  async getByAddress(address: string): Promise<Account> {
    return this.accountModel.findOne({ address });
  }
}
