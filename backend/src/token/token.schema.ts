import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Asset } from '../asset/asset.schema';
import { Order } from '../order/order.schema';
export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop({ required: true })
  id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true })
  asset: Asset;

  @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}])
  orders: Order[];
}

export const TokenSchema = SchemaFactory.createForClass(Token);
