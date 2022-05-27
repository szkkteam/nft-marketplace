import { GetServerSideProps } from 'next';
import React from 'react';

import { TokenEntity } from '@/interfaces';
import { getTokenDetail } from '@/utils/api';
import TokenView from '@/views/Token';

export interface TokenProp {
  address: string;
  token: TokenEntity;
  tokenId: string;
}

function Token({ address, token, tokenId }: TokenProp) {
  return <TokenView address={address} token={token} tokenId={tokenId} />;
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps = async (context) => {
  // @ts-ignore
  const { address, token: tokenId }: { address: string; token: string } =
    context.query;

  try {
    const token = await getTokenDetail(address, tokenId);

    return {
      props: {
        token,
        address,
        tokenId,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default Token;
