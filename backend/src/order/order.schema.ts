import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Token } from '../token/token.schema';
import { Account } from '../account/account.schema';
export type OrderDocument = Order & Document;

@Schema()
export class Order {
  /*  
  @Prop({ default: Date.now() })
  createdDate: Date;

  @Prop({ required: true })
  closingDate: Date;
  */

  @Prop({ default: Math.floor(new Date().getTime()) / 1000 })
  listingTime: string;

  @Prop({ required: true })
  expirationTime: string;

  @Prop({ required: true })
  currentPrice: string;

  @Prop({ required: true })
  calldata: string;

  @Prop({ required: true })
  salt: string;

  @Prop({ required: true })
  v: string;

  @Prop({ required: true })
  r: string;

  @Prop({ required: true })
  s: string;

  @Prop({ required: true })
  paymentToken: string;

  @Prop({ default: false })
  finalized: boolean;

  @Prop({ default: false })
  cancelled: boolean;

  /*
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Token', required: true })
  token: Token;
*/
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  })
  maker: Account;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: false,
  })
  taker: Account;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
