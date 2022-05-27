import Button, { ButtonProps } from '@mui/material/Button';
import Link from 'next/link';
import React, { FC } from 'react';

export interface LinButtonProps extends ButtonProps {
  href: string;
  // title: string | React.ReactNode;
}

const LinkButton: FC<LinButtonProps> = ({
  href,
  title,
  children,
  ...props
}: LinButtonProps) => {
  return (
    <Link href={href} passHref>
      <Button {...props}>{children}</Button>
    </Link>
  );
};

export default LinkButton;
