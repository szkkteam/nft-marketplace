import { Injectable, Inject, forwardRef, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token, TokenDocument } from './token.schema';
import { NftService } from 'src/nft/nft.service';
import { AssetService } from '../asset/asset.service';

@Injectable()
export class TokenService {
    constructor(
        @InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
        @Inject(forwardRef(() => AssetService)) private assetService: AssetService,
        private readonly nftService: NftService,
        //@Inject(forwardRef(() => OrderService))
        /*private orderService: OrderService */) {}

    async listAll(address: string): Promise<any> {
        // TODO: Merge the token uris with latest listing price
        return this.nftService.getAllTokenUris(address);
    }

    async getOwnerOf(address: string, id: string): Promise<string> {
        return this.nftService.getOwnerOf(address, id);
    }

    async getTokenWithLatestActiveOrder(address: string, id: string): Promise<any> {
        const asset = await this.assetService.getByAddress(address);
        const token = await this.tokenModel
            // TODO: query the asset based on address
            // @ts-ignore
            .findOne({ id, asset: asset._id })
            //.findOne({ id, asset: {address} })
            .populate({
                path: 'orders',
                match: { cancelled: false, finalized: false },
                options: {
                    limit: 1,
                    sort: { listingTime: -1},
                },
                //sort: { listingTime: -1 },
                populate: {
                    path: 'maker'
                }
            })
            .populate({
                path: 'asset',
                match: { address },
            })
            //.populate('maker')
            .exec();
            return token.toJSON();
    }

    async getTokenDetail(address: string, id: string): Promise<any> {
        const token = await this.nftService.getToken(address, id);
        console.log(token)

        let tokenPreview = {}
        try {
            tokenPreview = await this.getTokenWithLatestActiveOrder(address, id);
        } catch (e) {}
        return {
            ...token,
            ...tokenPreview,
        }
        
    }

    async lastValidOrder(address: string, id: string): Promise<any> {
        try {
            const asset = await this.assetService.getByAddress(address);
            const token = await this.tokenModel
            // @ts-ignore
            .findOne({ id, asset: asset._id })
            .populate({
                path: 'orders',
                match: { cancelled: false, finalized: false },
                options: {
                    limit: 1,
                    sort: { listingTime: -1},
                },
                //sort: { listingTime: -1 },
                populate: {
                    path: 'maker'
                }
            })
            .populate({
                path: 'asset',
                match: { address },
            })
            //.populate('maker')
            .exec();

            return token.toJSON();
        } catch( e) {
            new NotFoundException;
        }
    }

}