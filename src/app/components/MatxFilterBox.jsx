import { Icon, IconButton } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import { topBarHeight } from 'app/utils/constant';
import React, { useState } from 'react';

const FilterContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 9,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  height: topBarHeight,
  background: theme.palette.primary.main,
  color: theme.palette.text.primary,
  '&::placeholder': {
    color: theme.palette.text.primary,
  },
}));

const FilterInput = styled('input')(({ theme }) => ({
  width: '100%',
  border: 'none',
  outline: 'none',
  fontSize: '1rem',
  paddingLeft: '20px',
  height: '50px',
  alignItems:'left',
  background: theme.palette.primary.main,
  color: theme.palette.text.primary,
  '&::placeholder': { color: theme.palette.text.primary },
}));

const MatxFilterBox = () => {
  const [open, setOpen] = useState(true);
  //const toggle = () => {
   // setOpen(!open);onClick={toggle}
 // };

  const { palette } = useTheme();
  const textColor = palette.text.primary;

  return (
    <React.Fragment>
     
      {
        <FilterContainer  sx={{ height:50, }}>
          <IconButton  sx={{ mx: 2, verticalAlign: 'middle' }}>
            <Icon sx={{ color: textColor }}>filter_list</Icon>
          </IconButton>
          <FilterInput type="text" placeholder="Filter navigator" autoFocus />
          
        </FilterContainer>
      }
    </React.Fragment>
  );
};

export default MatxFilterBox;
