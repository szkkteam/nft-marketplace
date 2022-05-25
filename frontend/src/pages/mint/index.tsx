
import MintList from '@/views/MintList';
import { GetServerSideProps } from 'next';

import { getAllMint } from '@/utils/api';

import { MintEntity } from '@/interfaces';

interface MintProps {
    mints: Array<MintEntity>;
}

function Mint({mints}: MintProps) {

    return (<MintList mints={mints}/>)
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps = async (context) => {
    const mints = await getAllMint().catch(e => null);

    return {
        props: {
            mints
        }
    }
}


export default Mint;