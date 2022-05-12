import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';

import Logo from './Logo';
import Nav from './Nav';

export interface Props {
  props?: object;
}

export default function Header({ ...props }: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Logo />
          <Box sx={{ flexGrow: 1 }} />
          <Nav />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
