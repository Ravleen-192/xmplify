import {Avatar, Card, Fab, Grid, Icon,IconButton,Tooltip, lighten, styled, useTheme,Button, ButtonBase,Select, MenuItem } from '@mui/material';
import {  useState } from 'react';
import { Small } from 'app/components/Typography';
const ContentBox = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  padding: '4px !important',
  height:'30px',
  verticalAlign:'center',
  alignContent:'center',
  justifyContent: 'space-between',
 
}));
const FilterInput = styled('input')(({ theme }) => ({
  width: '100%',
  border: '0',
  outline: 'none',
  fontSize: '1rem',
  paddingLeft: '20px',
  marginBottom: '2px',
  alignItems:'left',
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  '&::placeholder': { color: theme.palette.text.primary },
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

const H1 = styled('h1')(({ theme }) => ({
  margin: 0,
  flexGrow: 1,
  color: theme.palette.text.secondary,
}));

const Span = styled('span')(({ textcolor }) => ({
  fontSize: '13px',
  color: textcolor,
  marginLeft: '4px',
}));

const IconBox = styled('div')(() => ({
  width: 16,
  height: 16,
  color: '#fff',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '300px ',
  justifyContent: 'center',
  '& .icon': { fontSize: '14px' },
}));

const StatCards2 = () => {
  const { palette } = useTheme();
  const [query,setquery] = useState("");
  const textError = palette.error.main;
  const textColor = palette.text.primary;
  const bgError = lighten(palette.error.main, 0.85);
  const handleSearch = (event) =>{
    let value = event.target.value.toLowerCase();
    setquery(value);
    console.log(value);   
  }
  const handleClick = (event) =>{
   
  }
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={12} md={3}>
        <Card elevation={3} sx={{ p: 2 }}>
          <ContentBox >
          <Span textcolor={'grey'}> <H3 color='gray'>290 pipelines found.</H3>
            
          </Span>
          </ContentBox>
        </Card>
      </Grid>
      {/*<Grid item xs={12} md={3}>
        <Card elevation={3}  sx={{ p: 2 }}>
          <ContentBox>
          <ButtonBase sx={{ height:50,  marginLeft: '15px' }}>
         <Icon sx={{ color: textColor }}>search</Icon>
        <FilterInput type="text" placeholder="Search" autoFocus onChange={(event) =>handleSearch(event)}/>
        <Tooltip title="View Details" placement="top">
              <IconButton onClick={handleClick}>
                <Icon>close</Icon>
              </IconButton>
            </Tooltip>
        </ButtonBase>
          </ContentBox>
         
        </Card>
  </Grid>*/}
      <Grid item xs={12} md={9}>
        <Card elevation={3}  sx={{ p: 2 }}>
          <ContentBox>
        <Select xs={12} md={4} sx={{ width:'200px', fontSize:'16px', boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }} defaultValue="Destination">
        <MenuItem value="Destination"><Small>Destination</Small></MenuItem>
          <MenuItem value="Dest1"><Avatar src='/assets/images/awsicons/redshift1.png' /><Small>Redshift</Small></MenuItem>
          <MenuItem value="Dest2"><Avatar src='/assets/images/awsicons/Curated1.jpg' /><Small>DataGlue</Small></MenuItem>
        </Select>
        <Select xs={12} md={4} sx={{ width:'200px',fontSize:'16px',boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }} defaultValue="Status">
       <MenuItem value="Status"><Small>Status</Small></MenuItem>
           <MenuItem color = 'green' value="Success"><Avatar src='/assets/images/awsicons/redarr1.jpg' /><Small>Success</Small></MenuItem>
          <MenuItem color = 'red' value="Failed"><Avatar src='/assets/images/awsicons/greenarr1.jpg' /><Small>Failed</Small></MenuItem>
        </Select>
        
          <Select xs={12} md={4}  sx={{ width:'200px',fontSize:'16px',boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }} defaultValue="this_month">
          <MenuItem value="this_month"><Small>NewestFirst</Small></MenuItem>
          <MenuItem value="last_month"><Small>Last Month</Small></MenuItem>
        </Select>
          </ContentBox>
        </Card>
      </Grid>
    
     
    </Grid>
  );
};

export default StatCards2;
