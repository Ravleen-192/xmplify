import { Card, Fab, Grid, Icon, styled, Button } from '@mui/material';


import React from 'react';

import { Link } from 'react-router-dom';

const ContentBox = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
}));

const FabIcon = styled(Fab)(() => ({
  width: '44px !important',
  height: '44px !important',
  boxShadow: 'none !important',
}));

const H3 = styled('h3')(({ textcolor }) => ({
  margin: 0,
  color: textcolor,
  fontWeight: '500',
  marginLeft: '12px',
}));


const Span = styled('span')(({ textcolor }) => ({
  fontSize: '13px',
  color: textcolor,
  marginLeft: '4px',
}));



const StatCards2 = () => {


  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={6}>
        <Card elevation={3} sx={{ p: 2 }}>
          <ContentBox>
            <FabIcon size="medium" sx={{ background: 'rgba(9, 182, 109, 0.15)' }}>
              <Icon sx={{ color: '#08ad6c' }}>bubble_chart</Icon>
            </FabIcon>
            <H3 textcolor={'#08ad6c'}>Pipelines</H3>
            <hr /><Button sx={{ background: 'rgba(9, 182, 109, 0.15)' }}><Link className="link" to='/pipelinecreate/default'><strong>Create +</strong></Link></Button>
            {/* <Button sx={{ background: 'rgba(9, 182, 109, 0.15)' }}><Link className="link" to='/pipelineupdate/default'><strong>Create +</strong></Link></Button>
          */}
          </ContentBox>

          <ContentBox sx={{ pt: 2 }}>
            <Span textcolor={'grey'}> <H3 color='gray'>Move Data between any Source and Destination.</H3>

            </Span>
          </ContentBox>
        </Card>
      </Grid>


    </Grid>
  );
};

export default StatCards2;
