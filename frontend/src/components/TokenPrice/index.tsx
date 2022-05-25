import React, { useState, useEffect } from 'react';

import {
    Typography
} from '@mui/material'

import useConvertPrice from '@/hooks/useConvertPrice';

export interface TokenPriceProps {
    rawPrice: string;
}

const TokenPrice = ({rawPrice, ...props}: TokenPriceProps) => {
    const { toFixed } = useConvertPrice();
    const [priceValue, setPriceValue] = useState<string | null>(null);

    useEffect(() => {
        rawPrice && (async() => {
            setPriceValue(await toFixed(rawPrice));
        })()
    }, [rawPrice])

    return (
        <Typography variant="body2" component="p" sx={{fontWeight: 'bold'}} {...props}>{priceValue}</Typography>
    )
}

export default TokenPrice;