import React from 'react';
import { GetServerSideProps } from 'next';

import { getAllMint, getAllAsset } from '@/utils/api';

import { MintEntity, AssetEntity } from '@/interfaces';

import HomeView from '@/views/Home';

export interface HomeProps {
  mints: Array<MintEntity>;
  assets: Array<AssetEntity>;
}

const Index = ({assets, mints} : HomeProps) => {
  // const router = useRouter();

  return (
      <HomeView assets={assets} mints={mints}/>
  );
};


// @ts-ignore
export const getServerSideProps: GetServerSideProps = async (context) => {
  const mints = await getAllMint().catch(e => null);
  const assets = await getAllAsset().catch(e => null);

  console.log(`
    mints: ${JSON.stringify(mints)}
    assets: ${JSON.stringify(assets)}
  `)

  return {
      props: {
          assets,
          mints
      }
  }
}


export default Index;
