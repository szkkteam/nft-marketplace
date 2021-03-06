import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type AssetDocument = Asset & Document;

@Schema()
export class Asset {
  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  address: string;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
