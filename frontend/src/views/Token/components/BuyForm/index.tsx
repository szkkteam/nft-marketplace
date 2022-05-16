import React, { useState, useEffect } from 'react';

import BuyToken from '../BuyToken';

import {
    Web3ReactProvider,
    useWeb3React,
  } from '@web3-react/core';

import { TokenEntity } from '@/interfaces/token';

export interface BuyFormProp {
    token: TokenEntity;
}

const BuyForm = ({token}: TokenProp) => {
    console.log(token)
    const { account } = useWeb3React<Web3ReactProvider>();

    return (
        <BuyToken />
    )
}

export default BuyForm;
