import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material'


import useHasAccount from '../../hooks/useHasAccount';
import useRegisterAccount from '../../hooks/useRegisterAccount'

export default function RegisterAccount() {
    const { proxyAccount, isLoading } = useHasAccount();    
    const { register } = useRegisterAccount();

    const hasAccount = proxyAccount && !isLoading;
    console.log(`
        hasAccount: ${hasAccount}
        isLoading: ${isLoading}
        proxyAccount: ${proxyAccount}
    `)

    const handleCreateAccount = () => {
        if (!hasAccount) {
            register();
        }
    }

    return (
        <Button variant='contained' color='primary' disabled={hasAccount} onClick={handleCreateAccount}>
            Register
        </Button>
    )
}