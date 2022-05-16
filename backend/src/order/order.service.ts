import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';
import { Token, TokenDocument } from '../token/token.schema';
import { Asset, AssetDocument } from '../asset/asset.schema';
import { Account, AccountDocument } from '../account/account.schema';
import { NftService } from 'src/nft/nft.service';
import { CreateOrder } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    @InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
    @InjectModel(Asset.name) private readonly assetModel: Model<AssetDocument>,
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
    private readonly nftService: NftService,
  ) {}

  async create(body: CreateOrder): Promise<Order> {
    const asset = await this.assetModel.findOne({ address: body.asset });
    const maker = await this.accountModel.findOne({ address: body.maker });
    let token = await this.tokenModel.findOne({ id: body.token });
    if (!token) {
      // Create token
      token = new this.tokenModel({ id: body.token, asset: asset._id });
      token.save();
    }

    const modelData = {
      ...body,
      cancelled: false,
      finalized: false,
      maker: maker._id,
      token: token._id,
    };
    const order = new this.orderModel(modelData);
    return order.save();
  }
}
