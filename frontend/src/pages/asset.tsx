
import AssetList from '@/views/AssetList';
import { GetServerSideProps } from 'next';

import { getAllAsset } from '@/utils/api';

import { AssetEntity } from '@/interfaces';

interface AssetProps {
    assets: Array<AssetEntity>;
}

function Asset({assets}: AssetProps) {

    return (<AssetList assets={assets}/>)
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps = async (context) => {
    const assets = await getAllAsset().catch(e => null);

    return {
        props: {
            assets
        }
    }
}


export default Asset;