import { useCallback } from 'react';
import Web3 from 'web3';
import { useWyvernExchange, useWyvernStaticMarket, useWyvernRegistry, useIERC721, useERC20Token } from '@/hooks/useContract';
import {
  Web3ReactProvider,
  useWeb3React,
} from '@web3-react/core';

const eip712Domain = {
  name: 'EIP712Domain',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' }
  ]
}


const eip712Order = {
  name: 'Order',
  fields: [
    { name: 'registry', type: 'address' },
    { name: 'maker', type: 'address' },
    { name: 'staticTarget', type: 'address' },
    { name: 'staticSelector', type: 'bytes4' },
    { name: 'staticExtradata', type: 'bytes' },
    { name: 'maximumFill', type: 'uint256' },
    { name: 'listingTime', type: 'uint256' },
    { name: 'expirationTime', type: 'uint256' },
    { name: 'salt', type: 'uint256' }
  ]
}

const structToSign = (order: any, exchange: string) => {
  return {
    name: eip712Order.name,
    fields: eip712Order.fields,
    domain: {
      name: 'Wyvern Exchange',
      version: '3.1',
      chainId: 1337,
      verifyingContract: exchange
    },
    data: order
  }
}


const parseSig = (bytes: any) => {
  bytes = bytes.substr(2)
  const r = '0x' + bytes.slice(0, 64)
  const s = '0x' + bytes.slice(64, 128)
  const v = parseInt('0x' + bytes.slice(128, 130), 16)
  return {v, r, s}
}


const usePrepareOrder = (nftAddress: string) => {
  const { account: origiAccount, library } = useWeb3React<Web3ReactProvider>();
  let web3 = new Web3();
  const registry = useWyvernRegistry();
  const statici = useWyvernStaticMarket();
  const nft = useIERC721(nftAddress);
  const token = useERC20Token();
  const exchange = useWyvernExchange();

  const handleCreateSelectorOne = () => web3.eth.abi.encodeFunctionSignature('ERC721ForERC20(bytes,address[7],uint8[2],uint256[6],bytes,bytes)')
  const handleCreateSelectorTwo= () => web3.eth.abi.encodeFunctionSignature('ERC20ForERC721(bytes,address[7],uint8[2],uint256[6],bytes,bytes)')
  const signer = library.getSigner();
  
  web3 = web3.extend({
    methods: [{
      name: 'signTypedData',
      call: 'eth_signTypedData',
      params: 2,
      // @ts-ignore
      inputFormatter: [web3.extend.formatters.inputAddressFormatter, null]
    }]
  })
  

  const HandleSign = async (order: any, account: string) => {
    console.log('signer', await signer.getAddress());
    console.log('account', account);

    const str = structToSign(order, exchange.address)
    console.log('str', str);
    
    // @ts-ignore
    return signer.provider.send('eth_signTypedData_v4', [origiAccount, 
    JSON.stringify({
      types: {
        EIP712Domain: eip712Domain.fields,
        Order: eip712Order.fields
      },
      domain: str.domain,
      primaryType: 'Order',
      message: order
    })]).then(sigBytes => {
      const sig = parseSig(sigBytes)
      return sig
    })
  }

  const handleCreateParamsOne = (tokenId: string, sellingPrice: string) => web3.eth.abi.encodeParameters(
    ['address[2]', 'uint256[2]'],
    [[nft.address, token.address], [tokenId, sellingPrice]]
  )

  const handleCreateParamsTwo = (buyTokenId: string, buyingPrice: string) => web3.eth.abi.encodeParameters(
    ['address[2]', 'uint256[2]'],
    [[token.address, nft.address], [buyTokenId, buyingPrice]]
  )

  const handleCreateOne = (maker: string, tokenId: string, sellingPrice: string, listingTime: string, expirationTime: string, salt: string) => {
    return {registry: registry.address, maker, staticTarget: statici.address, staticSelector: handleCreateSelectorOne(), staticExtradata: handleCreateParamsOne(tokenId, sellingPrice), maximumFill: 1, listingTime, expirationTime, salt}      
  }

  const handleMakeOrder = (maker: string, tokenId: string, sellingPrice: string, listingTime: string, expirationTime: string, salt: string = new Date().getTime().toString()) => {
    return handleCreateOne(maker, tokenId, sellingPrice, listingTime, expirationTime, salt);
  }

  const handleCreateTwo = (taker: string, tokenId: string, sellingPrice: string, listingTime: string, expirationTime: string) => {
    const salt = new Date().getTime().toString();
    return {registry: registry.address, taker, staticTarget: statici.address, staticSelector: handleCreateSelectorTwo(), staticExtradata: handleCreateParamsTwo(tokenId, sellingPrice), maximumFill: 1, listingTime, expirationTime, salt}      
  }


  const handleTakeOrder = (maker: string, taker: string, tokenId: string, sellingPrice: string, listingTime: string, expirationTime: string, salt: string) => {
    const one = handleCreateOne(maker, tokenId, sellingPrice, listingTime, expirationTime, salt);
    const two = handleCreateTwo(taker, tokenId, sellingPrice, listingTime, expirationTime);

    const firstData = nft?.interface.encodeFunctionData('transferFrom(address,address,uint256)', [maker, taker, tokenId]);
    const secondData = token?.interface.encodeFunctionData('transferFrom(address,address,uint256)', [taker, maker, sellingPrice]);

    const firstCall = {target: nft.address, howToCall: 0, data: firstData};
    const secondCall = {target: token.address, howToCall: 0, data: secondData};

    return {one, two, firstCall, secondCall};
    
  }

  return {
      makeOrder: handleMakeOrder,
      takeOrder: handleTakeOrder,
      sign: HandleSign,
  }
 
};

export default usePrepareOrder;