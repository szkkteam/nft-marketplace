import React, { useState, useEffect } from 'react';
import { Chip } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningIcon from '@mui/icons-material/Warning';

import {
    Web3ReactProvider,
    useWeb3React,
    UnsupportedChainIdError,
  } from '@web3-react/core';
  import { Web3Provider } from '@ethersproject/providers';

  import useEagerConnect from '@/hooks/useEagerConnect';
import useInactiveListener from '@/hooks/useInactiveListener';

import { injected, walletconnect } from '@/config/connectors';

//import { get } from '@/utils/request';
//import useRegisterProxy from '@/hooks/wyvernRegistry/useRegisterProxy';

enum ConnectorNames {
    Injected = 'Injected',
    WalletConnect = 'WalletConnect',
  }

const connectorsByName: { [connectorName in ConnectorNames]: any } = {
    [ConnectorNames.Injected]: injected,
    [ConnectorNames.WalletConnect]: walletconnect,
  };

/*
  async function hasAccount(account: string) {
    const res = await get(`/api/v1/account/${account}`);
    return res;
  }
*/
export default function ConnectWallet() {
 
    const {
        connector,
        library,
        chainId,
        account,
        activate,
        deactivate,
        active,
        error,
      } = useWeb3React<Web3Provider>();

      const [activatingConnector, setActivatingConnector] = useState<any>();

      React.useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
          setActivatingConnector(undefined);
        }
      }, [activatingConnector, connector]);

      // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  const currentConnector = connectorsByName[ConnectorNames.Injected];
  //const activating = currentConnector === activatingConnector;
  const connected = currentConnector === connector;
  //const disabled = !triedEager || !!activatingConnector || connected || !!error;
      /*
  const { registerProxy } = useRegisterProxy();
  useEffect(() => {
    if (connected && account) {
      
      const register = async () => {
        try {
          await registerProxy();
        } catch (e) {
          console.log(`Error during reigster: ${e}`);
        }
      };

      const apiAcc = hasAccount(account).catch(err => {
            console.log(err);
            console.log("Registering proxy ...");
            // TODO: Create account 
            //register();

      });
      console.log(apiAcc);
      // TODO: Asnyc call if we have account.
      // if not, register through registry
      // if yes, okay
      


    }
  }, [connected, account])
*/
  

    const getLabel = () => {
      return connected ? (
          account
            ? `${account.substring(0, 6)}...${account.substring(
                account.length - 4,
              )}`
            : 'Invalid Network'
      ) : (
        'Connect Wallet'
      )
    }

    return (
        <Chip 
          onClick={() => {
            setActivatingConnector(currentConnector);
            activate(injected);
          }}
          color="primary"
          size="medium"
          label={getLabel()}
          onDelete={() => null}
          deleteIcon={connected? account? <CheckCircleIcon /> : <WarningIcon /> : <CancelIcon />}
          />           
    )
}