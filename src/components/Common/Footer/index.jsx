import React from 'react';
import { Box, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import { StyledFooter, StyledLink, StyledTypography,StyledIconButton} from '../../../styles/Footer';

const Footer = () => {
    return (
        <StyledFooter>
            <StyledTypography variant= 'body2'>&copy; {new Date().getFullYear()} All rights reserved</StyledTypography>
        </StyledFooter>
  );
}

export default Footer