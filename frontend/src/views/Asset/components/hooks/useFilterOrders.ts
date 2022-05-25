import { useEffect, useState } from 'react';
import { findByFilter } from '@/utils/api';

const useFilterOrders = (asset: string) => {
    const [finalized, setFinalized] = useState<Object | null>([]);
    const [notFinalized, setNotFinalized] = useState<Object | null>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);

        (async() => {
            try {
                const _finalized = await findByFilter(asset, true);
                const _notFinalized = await findByFilter(asset, false);
                console.log(_finalized);
                console.log(_notFinalized);
                // @ts-ignore
                setFinalized(_finalized);
                setNotFinalized(_notFinalized);
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false);
            }
        })();
    }, [])

    return { finalized, notFinalized, isLoading };
} 

export default useFilterOrders;