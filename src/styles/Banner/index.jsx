import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import BannerImage from "../../assets/banner.jpeg";
import { Colors } from "../theme";

export const BannerWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: '50vh',
  background: `url(${BannerImage}) no-repeat center center fixed`,
  backgroundSize: "cover",
  overflow: 'hidden',
  width: "99.7vw",
  position: 'relative',
  margin: 0,
  left: '52%',
  transform: 'translateX(-52%)',
  top: 0,
  right:0,
  padding:0,
  '@media (min-width: 600px)': {
    backgroundAttachment: 'scroll',
   
  }
});

export const BannerText = styled(Typography)({
  color: Colors.white,
  fontWeight: 700,
  fontSize: "2.5rem",
  fontFamily: '"Open-sans"'
 
  
});
