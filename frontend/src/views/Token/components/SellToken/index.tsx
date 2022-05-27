// @ts-nocheck
import React from 'react';

import LinkButton from '@/components/LinkButton';

export interface SellTokenProps {
  address: string;
  token: string;
}

const SellToken = ({ address, token }: SellTokenProps) => {
  return (
    <LinkButton
      href={`/assets/${address}/${token}/sell`}
      variant="contained"
      sx={{ width: '120px' }}
    >
      List item
    </LinkButton>
  );
};

export default SellToken;
