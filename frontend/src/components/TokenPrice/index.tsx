import { Typography } from '@mui/material';
import React from 'react';

import useConvertPrice from '@/hooks/useConvertPrice';

export interface TokenPriceProps {
  rawPrice: string;
}

const TokenPrice = ({ rawPrice, ...props }: TokenPriceProps) => {
  const { toFixed } = useConvertPrice();
  /*
    const [priceValue, setPriceValue] = useState<string | null>(null);

    useEffect(() => {
        rawPrice && (async() => {
            setPriceValue(await toFixed(rawPrice));
        })()
    }, [rawPrice])
    */
  return (
    <Typography
      variant="body2"
      component="p"
      sx={{ fontWeight: 'bold' }}
      {...props}
    >
      {toFixed(rawPrice)}
    </Typography>
  );
};

export default TokenPrice;
