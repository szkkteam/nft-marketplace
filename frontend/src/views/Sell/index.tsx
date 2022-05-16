import React, { useEffect } from 'react';
import Router from 'next/router'

import PageLayout from '@/layout/PageLayout';
import SellForm from './components/SellForm';
import useHasAccount from '@/hooks/useHasAccount';


export interface SellProp {
    address: string;
    token: string;

}

const Sell = ({address, token}: SellProp) => {
    const { proxyAccount, isLoading } = useHasAccount();
    

    useEffect(() => {
        // Redirect if not registered
        if (!isLoading && !proxyAccount) {
            Router.push('/account')
        }
    }, [isLoading]);

    return (
        <PageLayout>
            <div>Sell {address} - {token}</div>
            {!isLoading && <SellForm address={address} token={token} proxy={!isLoading && proxyAccount?.proxy}/>}
        </PageLayout>
    )
}

export default Sell;