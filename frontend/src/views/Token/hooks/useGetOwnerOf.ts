import { useEffect, useState, useCallback } from 'react';
import { getOwnerOf } from '@/utils/api';
import {
    Web3ReactProvider,
    useWeb3React,
  } from '@web3-react/core';

const useGetOwnerOf = (address: string, id: string) => {
    const { account } = useWeb3React<Web3ReactProvider>();
    const [owner, setOwner] = useState<string>("0x0");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        account && (async() => {
            try {
                const _owner = await getOwnerOf(address, id);
                // @ts-ignore
                setOwner(_owner);
            } catch (err) {
                
            } finally {
                setIsLoading(false);
            }
        })();
    }, [account])

    return { owner, isLoading, sameAccount: account === owner };
} 

export default useGetOwnerOf;

