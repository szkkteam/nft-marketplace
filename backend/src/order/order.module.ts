import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { Order, OrderSchema } from './order.schema';
import { OrderService } from './order.service';
import { NftModule } from '../nft/nft.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    NftModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
