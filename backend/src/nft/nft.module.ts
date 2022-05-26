import { Module } from '@nestjs/common';
import { EthersModule as EModule, RINKEBY_NETWORK } from 'nestjs-ethers';
import { NftService } from './nft.service';

@Module({
  imports: [
    EModule.forRoot({
      //network: 'http://127.0.0.1:8545',
      /*
      network: {        
        name: "localhost",
        chainId: 1337,
        ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
      },
      custom: 'http://127.0.0.1:8545',
      useDefaultProvider: false,
      */
     network: RINKEBY_NETWORK,
     alchemy: 'nDITzExK0_KsWFyIEt7hR7VzPL-HS0XC',
     /*
     infura: {
      projectId: '6236f8d8131f41c9ac24459229d780a1',
      projectSecret: '476885e118974985b650e4ead127c327',
    },
    */
     useDefaultProvider: false,
    }),
  ],
  exports: [NftService],
  providers: [NftService],
})
export class NftModule {}
