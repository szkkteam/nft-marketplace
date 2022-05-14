import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Asset, AssetSchema } from './asset.schema';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { NftModule } from '../nft/nft.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Asset.name, schema: AssetSchema }]),
    NftModule,
  ],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}
