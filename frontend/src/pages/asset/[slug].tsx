import { GetServerSideProps } from 'next';

import { AssetEntity, TokenEntity } from '@/interfaces';
import { getAssetBySlug } from '@/utils/api';
import AssetView from '@/views/Asset';

interface AssetProp {
  asset: AssetEntity;
  tokens?: Array<TokenEntity>;
}

function Asset({ asset, tokens }: AssetProp) {
  return <AssetView asset={asset} tokens={tokens} />;
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  try {
    const asset = await getAssetBySlug(slug);

    return {
      props: {
        ...asset,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default Asset;
