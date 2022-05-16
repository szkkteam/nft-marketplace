import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { AssetModule } from './asset/asset.module';
import { TokenModule } from './token/token.module';
import { NftModule } from './nft/nft.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nft'),
    NftModule,
    AccountModule,
    AssetModule,
    TokenModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
