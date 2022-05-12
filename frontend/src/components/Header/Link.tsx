import MuiLink from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import Link from 'next/link';
import React from 'react';

export interface Props {
  href: string;
  children: React.ReactNode;
}

export default function LinkElement({ href, children }: Props) {
  return (
    <ListItem>
      <Link href={href} passHref>
        <MuiLink color="secondary" underline="none">
          {children}
        </MuiLink>
      </Link>
    </ListItem>
  );
}
