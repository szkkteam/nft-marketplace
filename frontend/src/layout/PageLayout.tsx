import { Box, Toolbar } from '@mui/material';
import React from 'react';

import Nav from '@/components/Nav';

export interface Props {
  children: React.ReactNode;
  marginTop?: number;
}

// const drawerWidth = 240;

export default function PageLayout({ marginTop, children }: Props) {
  // const router = useRouter();

  return (
    <Box sx={{ }}>
      <Nav />      
      
      <Box sx={{ flexGrow: 1, marginTop}} component="main">{children}</Box>
      <div style={{marginBottom: 100}} />
    </Box>
  );
}
