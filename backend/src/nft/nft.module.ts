import { Module } from '@nestjs/common';
import { EthersModule as EModule } from 'nestjs-ethers';
import { NftService } from './nft.service';

@Module({
  imports: [
    EModule.forRoot({
      //network: 'http://127.0.0.1:8545',
      custom: 'http://127.0.0.1:8545',
      useDefaultProvider: false,
    }),
  ],
  exports: [NftService],
  providers: [NftService],
})
export class NftModule {}
