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
            {/*<BannerContent>
            <Typography variant="h6">Huge Collection</Typography>
            </BannerContent>
            <BannerTitle variant="h2">
            Gadgets, Jewelry and more
            </BannerTitle>
            <BannerDescription variant="subtitle">
          Torem ipsum dolor sit amet, consectetur adipisicing elitsed do eiusmo
          tempor incididunt ut labore et dolore magna
    </BannerDescription>*/}
        </StyledBanner>
    );
}

export default Banner