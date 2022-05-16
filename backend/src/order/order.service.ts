import { Injectable, forwardRef, HttpException, HttpStatus } from '@nestjs/common';
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
    let token = await this.tokenModel.findOne({ id: body.token, asset: asset._id });
    if (!token) {
      // Create token
      token = new this.tokenModel({ id: body.token, asset: asset._id });
    }

    const modelData = {
      ...body,
      cancelled: false,
      finalized: false,
      maker: maker._id,
      //token: token._id,
    };
    const order = new this.orderModel(modelData);
    token.orders.push(order); 
    token.save();

    return order.save();
  }

  async getOrders(address: string, tokenId: string): Promise<Array<Order>> {
    const token = await this.tokenModel.findOne({ id: tokenId });
    const asset = await this.assetModel.findOne({ address });
    if (!token || !asset) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return await this.orderModel.find({ token: token._id, asset: asset._id });
  }
}
