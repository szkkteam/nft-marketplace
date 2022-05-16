import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Asset, AssetSchema } from './asset.schema';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { NftModule } from '../nft/nft.module';
import { OrderModule } from '../order/order.module';
import { TokenModule } from '../token/token.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Asset.name, schema: AssetSchema }]),
    NftModule,
    forwardRef(() => OrderModule),
    forwardRef(() => TokenModule),
  ],
  controllers: [AssetController],
  providers: [AssetService],
  exports: [MongooseModule]
})
export class AssetModule {}
