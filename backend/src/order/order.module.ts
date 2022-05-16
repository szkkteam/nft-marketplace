import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { Order, OrderSchema } from './order.schema';
import { OrderService } from './order.service';
import { NftModule } from '../nft/nft.module';
import { AssetModule } from '../asset/asset.module';
import { TokenModule  } from 'src/token/token.module';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    NftModule,
    forwardRef(() => AssetModule),
    AccountModule,
    TokenModule,
    //forwardRef(() => TokenModule),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [MongooseModule, OrderService],
})
export class OrderModule {}
