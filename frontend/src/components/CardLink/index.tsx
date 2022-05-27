import { Card, CardActionArea } from '@mui/material';
import Link from 'next/link';
import React from 'react';

export interface CardLinkProps {
  children: React.ReactNode;
  href: string;
}

const CardLink = ({ children, href }: CardLinkProps) => {
  return (
    <Card>
      <Link href={href} passHref>
        <CardActionArea component="a">{children}</CardActionArea>
      </Link>
    </Card>
  );
};

export default CardLink;
