import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';


const POLLING_INTERVAL = 12000;
const RPC_URLS: { [chainId: number]: string } = {
  1: process.env.RPC_URL_1 as string,
  4: process.env.RPC_URL_4 as string,
};

export const injected = new InjectedConnector({
  supportedChainIds: [42],
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  qrcode: true,
});