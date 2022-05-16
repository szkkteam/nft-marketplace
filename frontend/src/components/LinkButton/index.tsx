import React, { FC } from 'react';
import Link from 'next/link';
import Button, { ButtonProps } from '@mui/material/Button';

export interface LinButtonProps extends ButtonProps {
    href: string;
    //title: string | React.ReactNode;
}


const LinkButton: FC<LinButtonProps> = ({href, title, children, ...props}: LinButtonProps) => {
    
    return (
        <Link href={href} passHref>
            <Button {...props}>
                {children}
            </Button>
        </Link>
    )

}

export default LinkButton;