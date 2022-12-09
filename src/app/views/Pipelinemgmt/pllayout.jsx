import { Grid, styled, useTheme } from '@mui/material';
import { Fragment } from 'react';

import RowCards from './shared/RowCards';
import StatCards from './shared/StatCards';
import StatCards2 from './shared/StatCards2';

import Pipelinetable from './shared/Pipelinetable';
import SelectProcess from './shared/SelectProcess';

import AddProcess from './shared/AddProcess';


const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize',
}));

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const H4 = styled('h4')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginBottom: '16px',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));

const Playout = () => {
  const { palette } = useTheme();

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>

            <StatCards2 />
            <StatCards />
            <Pipelinetable />
            
          </Grid>


        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default Playout;
