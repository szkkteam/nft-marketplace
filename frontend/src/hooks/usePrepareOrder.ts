// @ts-nocheck
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';

import IERC721AABI from '@/config/abi/IERC721A.json';
import ERC20TokenABI from '@/config/abi/Token.json';
import { CHAIN_ID } from '@/config/constants';
import {
  useERC20Token,
  useIERC721,
  useWyvernExchange,
  useWyvernRegistry,
  useWyvernStaticMarket,
} from '@/hooks/useContract';
import { Signature } from '@/interfaces/signature';

const eip712Domain = {
  name: 'EIP712Domain',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' },
  ],
};

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
    { name: 'salt', type: 'uint256' },
  ],
};

const structToSign = (order: any, exchange: string) => {
  return {
    name: eip712Order.name,
    fields: eip712Order.fields,
    domain: {
      name: 'Wyvern Exchange',
      version: '3.1',
      chainId: CHAIN_ID,
      verifyingContract: exchange,
    },
    data: order,
  };
};

const parseSig = (bytes: any) => {
  bytes = bytes.substr(2);
  const r = `0x${bytes.slice(0, 64)}`;
  const s = `0x${bytes.slice(64, 128)}`;
  const v = parseInt(`0x${bytes.slice(128, 130)}`, 16);
  return { v, r, s };
};

const usePrepareOrder = (nftAddress: string) => {
  // @ts-ignore
  const { account, library } = useWeb3React<Web3ReactProvider>();
  const web3 = new Web3();

  const registry = useWyvernRegistry();
  const statici = useWyvernStaticMarket();
  const nft = useIERC721(nftAddress);
  const token = useERC20Token();
  const exchange = useWyvernExchange();

  const handleCreateSelectorOne = () =>
    web3.eth.abi.encodeFunctionSignature(
      'ERC721ForERC20(bytes,address[7],uint8[2],uint256[6],bytes,bytes)'
    );
  const handleCreateSelectorTwo = () =>
    web3.eth.abi.encodeFunctionSignature(
      'ERC20ForERC721(bytes,address[7],uint8[2],uint256[6],bytes,bytes)'
    );

  const HandleSign = async (order: any, maker: string) => {
    const signer = library.getSigner();
    // @ts-ignore
    const str = structToSign(order, exchange.address);
    /*
    return signer.provider.send('eth_signTypedData', [account, 
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
    */
    // @ts-ignore
    return signer.provider
      .send('eth_signTypedData_v4', [
        maker,
        JSON.stringify({
          types: {
            EIP712Domain: eip712Domain.fields,
            Order: eip712Order.fields,
          },
          domain: str.domain,
          primaryType: 'Order',
          message: order,
          // @ts-ignore
        }),
      ])
      .then((sigBytes) => {
        const sig = parseSig(sigBytes);
        return sig;
      });
  };

  const handleCreateParamsOne = (tokenId: string, sellingPrice: string) => {
    console.log('handleCreateParamsOne-sellingPrice', sellingPrice);
    console.log('handleCreateParamsOne-tokenId', tokenId);
    const v = web3.eth.abi.encodeParameters(
      ['address[2]', 'uint256[2]'],
      // @ts-ignore
      [
        [nft.address, token.address],
        [tokenId, sellingPrice],
      ]
    );
    console.log('handleCreateParamsOne-result', v);
    return v;
  };

  const handleCreateParamsTwo = (buyTokenId: string, buyingPrice: string) => {
    console.log('handleCreateParamsTwo-buyingPrice', buyingPrice);
    console.log('handleCreateParamsTwo-buyTokenId', buyTokenId);

    const v = web3.eth.abi.encodeParameters(
      ['address[2]', 'uint256[2]'],
      // @ts-ignore
      [
        [token.address, nft.address],
        [buyTokenId, buyingPrice],
      ]
    );
    console.log('handleCreateParamsTwo-result', v);
    return v;
  };

  const handleCreateOne = (
    maker: string,
    tokenId: string,
    sellingPrice: string,
    listingTime: string,
    expirationTime: string,
    salt: string
  ) => {
    return {
      registry: registry.address,
      maker,
      staticTarget: statici.address,
      staticSelector: handleCreateSelectorOne(),
      staticExtradata: handleCreateParamsOne(tokenId, sellingPrice),
      maximumFill: 1,
      listingTime,
      expirationTime,
      salt,
    };
  };

  const handleMakeOrder = (
    maker: string,
    tokenId: string,
    sellingPrice: string,
    listingTime: string,
    expirationTime: string,
    salt: string = new Date().getTime().toString()
  ) => {
    return handleCreateOne(
      maker,
      tokenId,
      sellingPrice,
      listingTime,
      expirationTime,
      salt
    );
  };

  const handleCreateTwo = (
    maker: string,
    tokenId: string,
    sellingPrice: string,
    listingTime: string,
    expirationTime: string
  ) => {
    const salt = new Date().getTime().toString();
    return {
      registry: registry.address,
      maker,
      staticTarget: statici.address,
      staticSelector: handleCreateSelectorTwo(),
      staticExtradata: handleCreateParamsTwo(tokenId, sellingPrice),
      maximumFill: 1,
      listingTime,
      expirationTime,
      salt,
    };
  };

  const handleEncodeSignatureParams = (sig: Signature, countersig: Signature) =>
    web3.eth.abi.encodeParameters(
      ['bytes', 'bytes'],
      [
        web3.eth.abi.encodeParameters(
          ['uint8', 'bytes32', 'bytes32'],
          [sig.v, sig.r, sig.s]
        ) + (sig?.suffix || ''),
        web3.eth.abi.encodeParameters(
          ['uint8', 'bytes32', 'bytes32'],
          [countersig.v, countersig.r, countersig.s]
        ) + (countersig?.suffix || ''),
      ]
    );

  const handleEncodeSignature = (sig: Signature) =>
    web3.eth.abi.encodeParameters(
      ['uint8', 'bytes32', 'bytes32'],
      [sig.v, sig.r, sig.s]
    ) + (sig?.suffix || '');

  const handleTakeOrder = (
    maker: string,
    taker: string,
    tokenId: string,
    sellingPrice: string,
    listingTime: string,
    expirationTime: string,
    salt: string
  ) => {
    const one = handleCreateOne(
      maker,
      tokenId,
      sellingPrice,
      listingTime,
      expirationTime,
      salt
    );
    const two = handleCreateTwo(
      taker,
      tokenId,
      sellingPrice,
      listingTime,
      expirationTime
    );

    const firstData = nft?.interface.encodeFunctionData(
      'transferFrom(address,address,uint256)',
      [maker, taker, tokenId]
    );
    const secondData = token?.interface.encodeFunctionData(
      'transferFrom(address,address,uint256)',
      [taker, maker, sellingPrice]
    );

    const nftContract = new web3.eth.Contract(IERC721AABI, nft.address);
    const tokenContract = new web3.eth.Contract(ERC20TokenABI, token.address);

    // const firstData = nftContract.methods.transferFrom(maker, taker, tokenId).encodeABI()
    // const secondData = tokenContract.methods.transferFrom(taker, maker, sellingPrice).encodeABI()
    /*
    let firstData;
    let secondData;
    (async () => {
      firstData = await nft?.populateTransaction.transferFrom(maker, taker, tokenId);
      secondData = await token?.populateTransaction.transferFrom(taker, maker, sellingPrice);
    })();
    */
    // const firstData = nft?.populateTransaction.transferFrom(maker, taker, tokenId);
    // const secondData = token?.populateTransaction.transferFrom(taker, maker, sellingPrice);

    console.log(`
      firstData: ${firstData}
      secondData: ${secondData}
    `);

    const firstCall = { target: nft.address, howToCall: 0, data: firstData };
    const secondCall = {
      target: token.address,
      howToCall: 0,
      data: secondData,
    };

    return { one, two, firstCall, secondCall };
  };

  return {
    makeOrder: handleMakeOrder,
    takeOrder: handleTakeOrder,
    sign: HandleSign,
    encodeSignature: handleEncodeSignatureParams,
    encodeSignatureSingle: handleEncodeSignature,
  };
};

export default usePrepareOrder;
