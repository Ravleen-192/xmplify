import { Grid, styled, useTheme } from '@mui/material';
import { Fragment } from 'react';
import './shared/dlFlow.css'


import DPLineage from './shared/AddProcess'

const ContentBox = styled('div')(({ theme }) => ({
  minWidth: 400,
  minHeight: 400,
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

const DataLineage = () => {
  const { palette } = useTheme();

  return (
    <Fragment>
      <ContentBox className="analytics">

        <Grid item lg={12} md={12} sm={12} xs={12}>

          <div style={{ height: 400 }}>
            {/*
            <h3 className="title">
                Access & Authorization
            </h3>
            */}
            <DPLineage />
          </div>



        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default DataLineage;
