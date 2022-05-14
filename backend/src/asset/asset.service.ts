import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Asset, AssetDocument } from './asset.schema';
import { NftService } from 'src/nft/nft.service';

@Injectable()
export class AssetService {
  constructor(
    @InjectModel(Asset.name) private readonly assetModel: Model<AssetDocument>,
    private readonly nftService: NftService,
  ) {}

  async import(address: string): Promise<Asset> {
    // TODO: Get the name, and other metadata from the collection
    const asset = await this.nftService.importContract(address);
    const newAsset = new this.assetModel(asset);
    /*
    const reqBody = {
      slug: slugify(asset.name),
      name: asset.name,
      address: asset.address,
    };
    const newAsset = new this.assetModel(reqBody);
    return newAsset.save();
    */
    return newAsset.save();
  }

  async listAll(): Promise<Asset[]> {
    return this.assetModel.find();
  }

  async getBySlug(slug: string): Promise<Asset> {
    return this.assetModel.findOne({ slug });
  }
}
