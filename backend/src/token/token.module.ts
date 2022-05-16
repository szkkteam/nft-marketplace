import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './token.schema';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { NftModule } from '../nft/nft.module';
import { OrderService } from '../order/order.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    NftModule,
    //forwardRef(() => OrderService),
  ],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService, MongooseModule]
})
export class TokenModule {}
