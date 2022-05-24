import React, { useState, useEffect } from 'react';

import { Button } from '@mui/material';
import NumberInput from '../NumberInput';

import useIERC721 from '@/hooks/useIERC721';
import useMakeOrder from '@/hooks/useMakeOrder';

import {
    Web3ReactProvider,
    useWeb3React,
  } from '@web3-react/core';

export interface SellFormProps {
    address: string;
    token: string;
    proxy: string;
}

const SellForm = ({address, token, proxy}: SellFormProps) => {
    const { account } = useWeb3React<Web3ReactProvider>();
    const {isApprovedForAll, setApprovalForAll} = useIERC721(address);
    const { makeOrder } = useMakeOrder(address);

    const [sellAmount, setSellAmount] = useState('');
    const [isApproved, setIsApproved] = useState(false);

    useEffect(() => {
        (async () => {
            const isApproved = await isApprovedForAll(address, proxy);

            console.log(`
                account: ${account}
                proxy: ${proxy}
                isApproved: ${isApproved}
            `)
            if (isApproved) {
                setIsApproved(true);
            }
            
        })();

    }, [account]);


    const handleSetApproval = async () => {
        try {
            await setApprovalForAll(proxy, true);
            setIsApproved(true);
        } catch(e) {}
    }

    const handleConfirm = async () => {
        const expirationTime = new Date('2023-06-01T00:00:00Z').getTime() / 1000;
        try {
            await makeOrder(account, token, sellAmount, "10000000000");
            console.log('order made')
            // TODO: Redirect to success page
        } catch(e) {
            console.error(e)
        }
    }

    const buttonProps = {
        disabled: !account,
    }

    return (
        <>
            <div>SellForm</div>
            <NumberInput value={sellAmount} onChange={setSellAmount}/>
            {isApproved ? (
                <Button {...buttonProps} disabled={sellAmount === ''} onClick={handleConfirm}>
                    Confirm
                </Button>
            ) : (
                <Button {...buttonProps}  onClick={handleSetApproval}>
                    Approve
                </Button>
            )}
        </>
        
    )
}

export default SellForm;