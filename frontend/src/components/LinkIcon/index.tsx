import React, { FC } from 'react';
import Link from 'next/link';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

export interface LinkIconButtonProps extends IconButtonProps {
    href: string;
    //title: string | React.ReactNode;
}


const LinkIcon: FC<LinkIconButtonProps> = ({href, children, ...props}: LinkIconButtonProps) => {
    
    return (
        <Link href={href} passHref>
            <IconButton {...props}>
                {children}
            </IconButton>
        </Link>
    )

}

export default LinkIcon;