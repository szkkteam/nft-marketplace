/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */
 require("ts-node").register({
    files: true,
  });
 const HDWalletProvider = require('@truffle/hdwallet-provider');
 require('dotenv').config();
 
 const MAINNET_DEPLOYER_KEY = process.env.MAINNET_DEPLOYER_KEY;
 const TESTNET_DEPLOYER_KEY = process.env.TESTNET_DEPLOYER_KEY;

 const MAINNET_DEPLOYER_MNEMONIC = process.env.MAINNET_DEPLOYER_MNEMONIC;
 const TESTNET_DEPLOYER_MNEMONIC = process.env.TESTNET_DEPLOYER_MNEMONIC;

 var INFURA_KEY = process.env.INFURA_KEY || '';
 
 module.exports = {
   networks: {
     development: {
       host: "127.0.0.1",     // Localhost (default: none)
       port: 8545,            // Standard BSC port (default: none)
       network_id: "*",       // Any network (default: none)
     },
     metis: {
      provider: () => new HDWalletProvider(MAINNET_DEPLOYER_KEY, `https://andromeda.metis.io/?owner=1088`),
      network_id: 1088,
      skipDryRun: false
     },
     bsc: {
       provider: () => new HDWalletProvider(MAINNET_DEPLOYER_KEY, `https://bsc-dataseed1.binance.org`),
       network_id: 56,
       confirmations: 2,
       timeoutBlocks: 200,
       skipDryRun: false
     },
     "bsc-testnet": {
       provider: () => new HDWalletProvider(TESTNET_DEPLOYER_MNEMONIC, `https://data-seed-prebsc-1-s1.binance.org:8545`, 0, 5),
       network_id: 97,
       confirmations: 2,
       timeoutBlocks: 200,
       skipDryRun: true
     },
     kovan: {
      provider: () => {
        return new HDWalletProvider(TESTNET_DEPLOYER_KEY, `https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`)
      },
      network_id: '42',
      skipDryRun: true
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(TESTNET_DEPLOYER_KEY, 'https://rinkeby.infura.io/v3/'+INFURA_KEY)
      },
      from: '',
      port: 8545,
      network_id: '4',
      gas: 16700000,
      networkCheckTimeout: 100000,
      gasPrice: 21110000000,
      confirmations: 2,
    },
   },
   plugins: [
     'truffle-plugin-verify',
     'truffle-contract-size'
   ],
   api_keys: {
     etherscan: process.env.ETHERSCAN_API_KEY,
     bscscan: process.env.BSCSCAN_API_KEY,
     hecoinfo: process.env.HECOINFO_API_KEY,
     ftmscan: process.env.FTMSCAN_API_KEY,
     polygonscan: process.env.POLYGONSCAN_API_KEY,
   },
   // Configure your compilers
   compilers: {
     solc: {
       //https://forum.openzeppelin.com/t/how-to-deploy-uniswapv2-on-ganache/3885
       version: "0.8.4",    // Fetch exact version from solc-bin (default: truffle's version)
       // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
       settings: {          // See the solidity docs for advice about optimization and evmVersion
         optimizer: {
           enabled: false,
           runs: 200
         },
       }
     },
   }
 }