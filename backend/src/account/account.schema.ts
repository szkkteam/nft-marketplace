import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type AccountDocument = Account & Document;

@Schema()
export class Account {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  proxy: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
