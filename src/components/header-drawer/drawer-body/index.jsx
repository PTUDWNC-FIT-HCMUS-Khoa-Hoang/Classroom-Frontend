import { Box, Divider } from '@mui/material';
import React from 'react';
import HeaderDrawerFirstPart from '../first-part';
import HeaderDrawerSecondPart from '../second-part';

export default function HeaderDrawerBody({ onCloseDrawer }) {
  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={onCloseDrawer}
      onKeyDown={onCloseDrawer}
    >
      <HeaderDrawerFirstPart />
      <Divider />
      <HeaderDrawerSecondPart />
    </Box>
  );
}
