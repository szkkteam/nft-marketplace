import React from 'react';

import PageLayout from '@/layout/PageLayout';

import { AssetEntity } from '@/interfaces';

interface AssetProps {
    asset: AssetEntity;
}


const Assets = ({asset}: AssetProps) => {
  // const router = useRouter();

  return (
    <PageLayout>
      <div>Specific asset {asset.name}</div>
    </PageLayout>
  );
};

export default Assets;
