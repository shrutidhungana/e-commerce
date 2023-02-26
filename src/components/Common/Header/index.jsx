import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import AppbarDesktop from './HeaderDesktop';
import AppbarMobile from './HeaderMobile';

export default function Header() {
    
    const theme = useTheme();
    const matches =  useMediaQuery(theme.breakpoints.down('md'));
    return (
        <>
        {matches ? <AppbarMobile matches={matches}/> : <AppbarDesktop matches={matches}/>} 
        </>
    );
}