import React from 'react';

import PageLayout from '@/layout/PageLayout';
import { AssetEntity } from '@/interfaces';

interface AssetProps {
  assets: Array<AssetEntity>;
}

const AssetList = ({assets}: AssetProps) => {
  // const router = useRouter();

  return (
    <PageLayout>
      <div>Asset list:</div>
      {assets.map(({name}: AssetEntity) => (
        <div>{name}</div>        )
      )}
    </PageLayout>
  );
};

export default AssetList;
