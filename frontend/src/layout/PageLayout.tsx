import { Box } from '@mui/material';
import React from 'react';

import Nav from '@/components/Nav';

export interface Props {
  children: React.ReactNode;
}

// const drawerWidth = 240;

export default function PageLayout({ children }: Props) {
  // const router = useRouter();

  return (
    <Box>
      <Box
        component="nav"
        // sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Nav />
      </Box>
      <Box component="main">{children}</Box>
    </Box>
  );
}
