import AssetView from '@/views/Asset';
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

import { getAssetBySlug, getAllToken } from '@/utils/api';
import { AssetEntity, TokenEntity } from '@/interfaces';

interface AssetProp {
    asset: AssetEntity;
    tokens?: Array<TokenEntity>;
}

function Asset({asset, tokens}: AssetProp) {
    const router = useRouter();
    //const { slug } = router.query;
    
    return (
        <AssetView asset={asset} tokens={tokens} />
    );
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { slug } = context.query;
    try {
        const asset = await getAssetBySlug(slug)

        return {
            props: {
                ...asset,
            }
        }

    } catch(e) {
        return {
            notFound: true,
        }
    }
    

}

export default Asset;