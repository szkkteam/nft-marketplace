import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Asset, AssetDocument } from './asset.schema';
import { TokenService } from '../token/token.service'
import { NftService } from 'src/nft/nft.service';
import { GetMint } from './dto/get-mint.dto';

@Injectable()
export class AssetService {
  constructor(
    @InjectModel(Asset.name) private readonly assetModel: Model<AssetDocument>,
    @Inject(forwardRef(() => TokenService)) private tokenService: TokenService,
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

  async getAllMint(): Promise<GetMint[]> {
    const assets = await this.assetModel.find().exec();

    // @ts-ignore
    return this.nftService.getMintableAssets(assets);
  }

  async getMint(slug: string): Promise<GetMint> {
    const asset = await this.assetModel.findOne({slug}).exec();

    // @ts-ignore
    return this.nftService.getMintableAsset(asset);
  }

  async listAll(): Promise<Asset[]> {
    return this.assetModel.find();
  }

  async getByAddress(address: string) : Promise<AssetDocument> {
    return this.assetModel.findOne({ address });
  }

  async getBySlug(slug: string) {
    const asset = await this.assetModel.findOne({ slug });
    const tokens = await this.nftService.getAllToken(asset.address);
    console.log(tokens)

    const tokenData = await Promise.all(tokens.map(async (restToken) => {
      const { id } = restToken;
      let tokenPreview = {}
      try {
        tokenPreview = await this.tokenService.getTokenWithLatestActiveOrder(asset.address, id);
      } catch (e) {}
      return {
        ...restToken,
        ...tokenPreview,
      }
    }));

    return {
      tokens: tokenData,
      asset,
    };
  }
}
