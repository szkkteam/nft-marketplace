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

  async getAllToken(address: string) {
    const contract = await this.getContract(address);

    const startIdx = 0;
    const endIdx = await contract.functions.totalSupply();
    const items = Array(endIdx - startIdx).fill(0).map((_, i) => i + startIdx);

    const uris = await Promise.all(items.map(async (id) => {
      const token = await this.getToken(address, id.toString(), contract);
      return {
        ...token
      }
    }));

    return uris;

  }

  async getOwnerOf(address: string, id: string, contract: Contract = null) {
    if (!contract) {
      contract = await this.getContract(address);
    }
    return contract.functions.ownerOf(id);
  }


  async getToken(address: string, id: string, contract: Contract = null) {
    if (!contract) {
      contract = await this.getContract(address);
    }
    
    const uri = await contract.functions.tokenURI(id);
    const owner = await this.getOwnerOf(address, id, contract);
    return {
      uri: uri[0],
      id,
      owner: owner[0]
    };
  }

  async getTokenUri(address: string, id: string) {
    const contract = await this.getContract(address);
    console.log(`contract: ${contract.address}`)
    const network = await contract.provider.getNetwork();
    console.log(`network: ${JSON.stringify(network)}`)
    const totalSupply = await contract.functions.totalSupply();
    console.log(totalSupply);

    
    const uri = await contract.functions.tokenURI(id);
    return {
      uri,
      id
    };
  }

  // Generate integers between start and end

}
