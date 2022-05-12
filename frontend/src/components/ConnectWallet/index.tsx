import React, { useState } from 'react';
import { Button } from '@mui/material'

import {
    Web3ReactProvider,
    useWeb3React,
    UnsupportedChainIdError,
  } from '@web3-react/core';
  import { Web3Provider } from '@ethersproject/providers';

  import useEagerConnect from '@/hooks/useEagerConnect';
import useInactiveListener from '@/hooks/useInactiveListener';

import { injected, walletconnect } from '@/config/connectors';

enum ConnectorNames {
    Injected = 'Injected',
    WalletConnect = 'WalletConnect',
  }

const connectorsByName: { [connectorName in ConnectorNames]: any } = {
    [ConnectorNames.Injected]: injected,
    [ConnectorNames.WalletConnect]: walletconnect,
  };


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

    return (
        <Button variant='contained'
        onClick={() => {
            setActivatingConnector(currentConnector);
            activate(injected);
          }}
          >
            {connected ? (
              <span>
                {account
                  ? `${account.substring(0, 6)}...${account.substring(
                      account.length - 4,
                    )}`
                  : 'Invalid Network'}
              </span>
            ) : (
              <span>Connect Wallett</span>
            )}
        </Button>
    )
}