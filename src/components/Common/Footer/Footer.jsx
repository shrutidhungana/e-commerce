import React from 'react'
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { StyledFooter, StyledCopyright, StyledIconButton, StyledSocialIcons } from '../../../styles/Footer';

const Footer = () => {
  return (
    <StyledFooter>
      <StyledSocialIcons>
        <StyledIconButton href="https://www.facebook.com/">
          <Facebook />
        </StyledIconButton>
        <StyledIconButton href="https://twitter.com/">
          <Twitter />
        </StyledIconButton>
        <StyledIconButton href="https://www.instagram.com/">
          <Instagram />
        </StyledIconButton>
        <StyledIconButton href="https://www.linkedin.com/">
          <LinkedIn />
        </StyledIconButton>
      </StyledSocialIcons>
      <StyledCopyright>
        &copy; 2023 Wearable Tech. All rights reserved.
      </StyledCopyright>
    </StyledFooter>
  )
}

export default Footer