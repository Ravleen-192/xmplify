import { Grid, styled, useTheme } from '@mui/material';
import { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import RowCards from './shared/RowCards';
import StatCards from './shared/StatCards';
import StatCards2 from './shared/StatCards2';

import Pipelinetable from './shared/Pipelinetable';


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
const baseURL = "https://3uiqfn8244.execute-api.us-east-1.amazonaws.com/dev/get-all-pipelines";

const Playout = () => {
  const { palette } = useTheme();
  const [result, setResult] = useState(null);
  useEffect(() => {
    axios.post(baseURL, requestOptions)
      .then(res => {
        setResult(res.data);
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
        console.log(res.data);
      })
    // .then(response => response.json())
    // .then(data => this.setState({ postId: data.id }));
  }, []);
  useEffect(() => {

    // .then(response => response.json())
    // .then(data => this.setState({ postId: data.id }));
  }, [result]);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'React POST Request Example' })
  };
  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>

            <StatCards2 />
            <StatCards />
            {result ?
              <Pipelinetable productList={result} /> : <>Loading...</>}

          </Grid>


        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default Playout;
