import { Button } from '@mui/material';
import React from 'react';

import useHasAccount from '../../hooks/useHasAccount';
import useRegisterAccount from '../../hooks/useRegisterAccount';

export default function RegisterAccount() {
  const { proxyAccount, isLoading } = useHasAccount();
  const { register } = useRegisterAccount();

  const hasAccount = proxyAccount && !isLoading;
  console.log(`
        hasAccount: ${hasAccount}
        isLoading: ${isLoading}
        proxyAccount: ${proxyAccount}
    `);

  const handleCreateAccount = () => {
    if (!hasAccount) {
      register();
    }
  };

  return (
    // @ts-ignore
    <Button
      variant="contained"
      color="primary"
      // @ts-ignore
      disabled={hasAccount}
      onClick={handleCreateAccount}
    >
      Register
    </Button>
  );
}
