import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './token.schema';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { NftModule } from '../nft/nft.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    NftModule,
  ],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
