import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token, TokenDocument } from './token.schema';
import { NftService } from 'src/nft/nft.service';

@Injectable()
export class TokenService {
    constructor(@InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
        private readonly nftService: NftService) {}

    async listAll(address: string): Promise<any> {
        // TODO: Merge the token uris with latest listing price
        return this.nftService.getAllTokenUris(address);
    }

}