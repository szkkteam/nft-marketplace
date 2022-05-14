import {
  EthersContract,
  InjectContractProvider,
  Contract,
} from 'nestjs-ethers';
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
//import { Contract, ContractInterface } from '@ethersproject/contracts';
import * as ERC721AAbi from './abi/IERC721A.json';
//import * as ERC721AAbi from '../utils/abi/ERC721A.json';
//import {abi } from '../utils/abi/ERC721A.json';
import { slugify } from '../utils';

@Injectable()
export class NftService {
  constructor(
    @InjectContractProvider() private readonly contract: EthersContract,
  ) {}

  async importContract(address: string) {
    console.log(`Address: ${address}`);
    const contract: Contract = this.contract.create(address, ERC721AAbi.abi);
    const [name] = await contract.functions.name();
    //const tokenUri: string = await contract.functions.tokenUri();
    const slug = slugify(name);

    return {
      name,
      slug,
      address,
    };
  }
}
