import { Web3Provider } from '@ethersproject/providers';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import { Chip } from '@mui/material';
import { orange, red } from '@mui/material/colors';
import { useWeb3React } from '@web3-react/core';
import React, { useState } from 'react';

import { injected, walletconnect } from '@/config/connectors';
import useEagerConnect from '@/hooks/useEagerConnect';
import useInactiveListener from '@/hooks/useInactiveListener';

// import { get } from '@/utils/request';
// import useRegisterProxy from '@/hooks/wyvernRegistry/useRegisterProxy';

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
  const { connector, account, activate } = useWeb3React<Web3Provider>();

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
  // const activating = currentConnector === activatingConnector;
  const connected = currentConnector === connector;

  const getLabel = () => {
    return connected
      ? account
        ? `${account.substring(0, 6)}...${account.substring(
            account.length - 4
          )}`
        : 'Invalid Network'
      : 'Connect Wallet';
  };

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
      deleteIcon={
        connected ? (
          account ? (
            <CheckCircleIcon color="success" />
          ) : (
            <WarningIcon sx={{ color: orange[500] }} />
          )
        ) : (
          <CancelIcon sx={{ color: red[500] }} />
        )
      }
    />
  );
}
