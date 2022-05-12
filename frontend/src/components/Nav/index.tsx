import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import React from 'react';
import ConnectWallet from '@/components/ConnectWallet';

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
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <ConnectWallet />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
