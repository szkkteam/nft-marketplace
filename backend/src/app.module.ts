import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListingModule } from './listing/listing.module';
import { AccountModule } from './account/account.module';
import { AssetModule } from './asset/asset.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nft'),
    AssetModule,
    ListingModule,
    AccountModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
