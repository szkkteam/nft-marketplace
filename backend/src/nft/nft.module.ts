import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EthersModule as EModule, RINKEBY_NETWORK } from 'nestjs-ethers';
import { NftService } from './nft.service';

@Module({
  imports: [
    EModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        console.log(config.get<string>('ALCHEMY_KEY'))
        return {
          network: RINKEBY_NETWORK,
          alchemy: config.get<string>('ALCHEMY_KEY'),
          useDefaultProvider: false,
        }
      }
    }),
  ],
  exports: [NftService],
  providers: [NftService],
})
export class NftModule {}
