import List from '@mui/material/List';
import React from 'react';

import Link from './Link';

export default function Nav() {
  return (
    <>
      <List sx={{ display: 'flex' }}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/">Contact</Link>
      </List>
    </>
  );
}
