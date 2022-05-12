import MailIcon from '@mui/icons-material/Mail';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Link from 'next/link';
import React from 'react';

export interface NavLinkProps {
  open: boolean;
  href: string;
  title: string;
}

export default function NavLink({ open, href, title }: NavLinkProps) {
  return (
    <Link href={href} passHref>
      <ListItemButton
        component="a"
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          <MailIcon />
        </ListItemIcon>
        <ListItemText primary={title} sx={{ opacity: open ? 1 : 1 }} />
      </ListItemButton>
    </Link>
  );
}
