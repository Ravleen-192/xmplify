import { Box, Card, Grid, Icon, IconButton, styled, Tooltip, Divider, Select, MenuItem } from '@mui/material';
import { Small } from 'app/components/Typography';

const IconBox = styled('div')(() => ({
  width: 20,
  height: 20,
  color: '#fff',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '300px ',
  justifyContent: 'center',
  '& .icon': { fontSize: '14px' },
}));
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  height: '80px',
  alignItems: 'left',
  justifyContent: 'space-between',
  padding: '4px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',  
  alignItems: 'left',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '16px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));
const handleClick = ()=>{}
const StatCards = () => {
  const cardList = [
    { name: '290 pipelines found', type: '', icon: '' },
    { name: 'Search pipelines', type: 'button', icon: 'search' },
   
  ];

  return (
    <Grid container spacing={3}  xs={12} md={12} sx={{ mb: '24px' }}>
      <Divider style={{width:'100%'}} />
      {cardList.map((item, index) => (
        <Grid item xs={12} md={4} key={index}>
          <StyledCard elevation={3}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">
                <Small>{item.name}</Small>
                <Heading>{item.amount}</Heading>
              </Box>
            </ContentBox>

            <Tooltip title="View Details" placement="top">
              <IconButton onClick={handleClick}>
                <Icon>close</Icon>
              </IconButton>
            </Tooltip>
          </StyledCard>
        </Grid>
      ))}
       <Grid item xs={12} md={4} >
          <StyledCard elevation={3} sx={{alignItems: 'center',
                                          justifyContent: 'space-between',
                                          paddingLeft: '2px !important',}} >
            <ContentBox sx={{alignItems: 'center',
                              justifyContent: 'space-between',
                              paddingLeft: '2px !important',}}>
            <Select  sx={{  height: '50px', width:'120px',fontSize:'16px', boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }} defaultValue="Destination">
          <MenuItem value="Destination"><Small>Destination1</Small></MenuItem>
          <MenuItem value="Detination2"><Small>Destination2</Small></MenuItem>
        </Select>
        <Select sx={{ height: '50px', width:'100px',fontSize:'16px',boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }} defaultValue="Status">
           <MenuItem color = 'green' value="Status"><Small>Status</Small></MenuItem>
          <MenuItem color = 'red' value="Status2"><Small>Status2</Small></MenuItem>
        </Select>
        
          <Select  sx={{height: '50px', width:'100px', fontSize:'16px',boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }} defaultValue="this_month">
          <MenuItem value="this_month"><Small>NewestFirst</Small></MenuItem>
          <MenuItem value="last_month"><Small>Last Month</Small></MenuItem>
        </Select>
            </ContentBox>
          </StyledCard>
        </Grid>
    </Grid>
  );
};

export default StatCards;
