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

  private async getContract(address: string): Promise<Contract> {
    const contract: Contract = this.contract.create(address, ERC721AAbi.abi);
    return contract;
  }

  async importContract(address: string) {
    const contract = await this.getContract(address);
    const [name] = await contract.functions.name();
    //const tokenUri: string = await contract.functions.tokenUri();
    const slug = slugify(name);

    return {
      name,
      slug,
      address,
    };
  }

  async getAllTokenUris(address: string) {
    const contract = await this.getContract(address);

    const startIdx = 0;
    const endIdx = await contract.functions.totalSupply();
    const items = Array(endIdx - startIdx).fill(0).map((_, i) => i + startIdx);

    const uris = await Promise.all(items.map(async (id) => {
      const uri = await contract.functions.tokenURI(id);
      return {
        id,
        uri
      }
    }));

    return uris;

  }

  // Generate integers between start and end

}
