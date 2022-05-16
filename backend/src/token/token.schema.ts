import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Asset } from '../asset/asset.schema';
export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop({ required: true })
  id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true })
  asset: Asset;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
