import React from 'react';
import { GetServerSideProps } from 'next'
import SellView from '@/views/Sell';

export interface SellProp {
    address: string;
    token: string;

}

function Sell({address, token}: SellProp) {
    return (
        <SellView address={address} token={token} />
    )
}


// @ts-ignore
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { address, token } = context.query;

    try {


    } catch(e) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            address,
            token,
        }
    }
}

export default Sell;