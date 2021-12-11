import React from 'react';
import { IconButton, Drawer } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import HeaderDrawerBody from './drawer-body';

const useStyle = makeStyles({
  menuButtonContainer: {
    display: 'flex',
    alignItems: 'center',

    marginLeft: '5px',
  },
});

export default function HeaderDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const classes = useStyle();

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      {/* Menu button */}
      <div className={classes.menuButtonContainer}>
        <IconButton
          color="primary"
          aria-label="toggle-menu"
          onClick={handleOpenDrawer}
          // className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
      </div>
      {/* Drawer */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={handleCloseDrawer}>
        <HeaderDrawerBody onCloseDrawer={handleCloseDrawer} />
      </Drawer>
    </>
  );
}
