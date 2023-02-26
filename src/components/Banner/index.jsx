import React from 'react';
import { StyledBanner, BannerContent, BannerTitle, BannerDescription, BannerImage } from '../../styles/Banner';
import { useMediaQuery, Typography } from "@mui/material";
import { useTheme } from '@mui/system';
import bannerImage from '../../assets/banner.jpg';

const Banner = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
  
    return (
        <StyledBanner>
            <BannerImage src = {bannerImage} />
           
        </StyledBanner>
    );
}

export default Banner