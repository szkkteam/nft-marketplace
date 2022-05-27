import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Link from 'next/link';
import React, { FC } from 'react';

export interface LinkIconButtonProps extends IconButtonProps {
  href: string;
  // title: string | React.ReactNode;
}

const LinkIcon: FC<LinkIconButtonProps> = ({
  href,
  children,
  ...props
}: LinkIconButtonProps) => {
  return (
    <Link href={href} passHref>
      <IconButton {...props}>{children}</IconButton>
    </Link>
  );
};

export default LinkIcon;
