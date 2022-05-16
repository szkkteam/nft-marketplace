import { Injectable, Inject, forwardRef, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token, TokenDocument } from './token.schema';
import { NftService } from 'src/nft/nft.service';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class TokenService {
    constructor(@InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
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
        const token = await this.tokenModel
            .findOne({ address, id })
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
            .populate('asset')
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
            const token = await this.tokenModel
            .findOne({ address, id })
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
            .populate('asset')
            //.populate('maker')
            .exec();

            return token.toJSON();
        } catch( e) {
            new NotFoundException;
        }
    }

}