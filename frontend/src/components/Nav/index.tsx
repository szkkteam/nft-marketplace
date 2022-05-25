import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import React from 'react';
import ConnectWallet from '@/components/ConnectWallet';

import Logo from './Logo';
import LinkButton from '@/components/LinkButton';

export default function Nav() {
  /*
  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }
  */

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo/>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <LinkButton href='/asset' variant="text" sx={{color: '#fff', marginLeft: { sx: 0, md: 2 }}}>
              Explore
            </LinkButton>
            <LinkButton href='/asset' variant="text" sx={{color: '#fff', marginLeft: { sx: 0, md: 2 }}}>
              Mints
            </LinkButton>
          </Box>
          <Box sx={{flexGrow: 0}}>
            <ConnectWallet />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
