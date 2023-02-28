import React from 'react';
import { Toolbar } from '@mui/material';
import { Navbar } from '../../../styles/Header';
import HeaderLinks from './HeaderLinks';

const Header = () => {
  return (
      <div>
      <Navbar>
      <Toolbar>
        <HeaderLinks />
      </Toolbar>
    </Navbar>
      </div>
  )
}

export default Header