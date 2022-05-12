import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  proxy: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
