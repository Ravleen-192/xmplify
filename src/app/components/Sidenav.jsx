import { styled } from '@mui/system';
import { MatxVerticalNav  } from 'app/components';
import useSettings from 'app/hooks/useSettings';
import { navigations } from 'app/navigations';
import { Fragment, useState } from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import {  Icon,ButtonBase } from '@mui/material';
import {   useTheme } from '@mui/system';

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: '1rem',
  paddingRight: '1rem',
  position: 'relative',
}));

const SideNavMobile = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100vw',
  background: 'rgba(0, 0, 0, 0.54)',
  zIndex: -1,
  [theme.breakpoints.up('lg')]: { display: 'none' },
}));
const FilterInput = styled('input')(({ theme }) => ({
  width: '100%',
  border: 'none',
  outline: 'none',
  fontSize: '1rem',
  paddingLeft: '20px',
  marginBottom: '2px',
  height: '40px',
  alignItems:'left',
  background: theme.palette.primary.main,
  color: theme.palette.text.primary,
  '&::placeholder': { color: theme.palette.text.primary },
}));
const Sidenav = ({ children }) => {
  const { settings, updateSettings } = useSettings();
  const [query,setquery] = useState("");
  const { palette } = useTheme();
  const textColor = palette.text.primary;
  const handleSearch = (event) =>{
     let value = event.target.value.toLowerCase();
     setquery(value);
     console.log(value);   
   }
  const updateSidebarMode = (sidebarSettings) => {
    let activeLayoutSettingsName = settings.activeLayout + 'Settings';
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    updateSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  };

  return (
    <Fragment>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        {children}
        <ButtonBase sx={{ height:50,  marginLeft: '15px' }}>
         <Icon sx={{ color: textColor }}>filter_list</Icon>
        <FilterInput type="text" placeholder="Filter navigator" autoFocus onChange={(event) =>handleSearch(event)}/>
        </ButtonBase>
        <MatxVerticalNav items={navigations} query={query}/>
      </StyledScrollBar>

      <SideNavMobile onClick={() => updateSidebarMode({ mode: 'close' })} />
    </Fragment>
  );
};

export default Sidenav;
