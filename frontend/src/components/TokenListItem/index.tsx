import React, { ReactNode } from 'react';
import Link from 'next/link';

import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from '@mui/material'

import NftImage from '@/components/NftImage';
import TokenPrice from '@/components/TokenPrice';

export interface TokenListItemProps {
    price?: string | null;
    name: string;
    tokenId: string;
    href?: string | null;
}

const TokenListItem = ({name, tokenId, href=null, price=null}: TokenListItemProps) => {
   
    const Wrapper = ({children}: {children: ReactNode}) => href? <Link href={href} passHref>{children}</Link> : <>{children}</>;

    return (
        <Wrapper>
            <ListItem 
                button={!!href}
                secondaryAction={
                    price && <TokenPrice rawPrice={price}/>
                }
            >
                <ListItemAvatar sx={{marginRight: 1}}>
                    <NftImage height={48}/>
                </ListItemAvatar>
                <ListItemText
                    primary={name}
                    secondary={`${name} #${tokenId}`}
                />
            </ListItem>
        </Wrapper>
    )
}

export default TokenListItem;