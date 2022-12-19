import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Fab,
  Grid,
  Hidden,
  Icon,
  IconButton,
  styled,
  useTheme,
} from '@mui/material';
import { Span } from 'app/components/Typography';
import { format } from 'date-fns';
import { Fragment } from 'react';

const ProcessName = styled(Span)(({ theme }) => ({
  marginLeft: 24,
  fontWeight: '500',
  [theme.breakpoints.down('sm')]: { marginLeft: 4 },
}));

const StarOutline = styled(Fab)(() => ({
  marginLeft: 0,
  boxShadow: 'none',
  background: '#08ad6c !important',
  backgroundColor: 'rgba(9, 182, 109, 1) !important',
}));

const DateRange = styled(Fab)(({ theme }) => ({
  marginLeft: 0,
  boxShadow: 'none',
  color: 'white !important',
  background: `${theme.palette.error.main} !important`,
}));

const StyledAvatar = styled(Avatar)(() => ({
  width: '32px !important',
  height: '32px !important',
}));

const RowCards = () => {
  const { palette } = useTheme();
  const textMuted = palette.text.secondary;

  return [1].map((id) => (
    <Fragment key={id}>
      <Card sx={{ py: 1, px: 2 }} className="project-card">
        <Grid container alignItems="center">
          <Grid item md={5} xs={7}>
            <Box display="flex" alignItems="center">
              <Checkbox />
              <Hidden smDown>

                <StarOutline size="small">
                  <Icon>star_outline</Icon>
                </StarOutline>

              </Hidden>
              <ProcessName>Process {id}</ProcessName>
            </Box>
          </Grid>

          <Grid item md={3} xs={4}>
            <Box display="flex" position="relative" marginLeft="-0.875rem !important">
              <StyledAvatar src="/assets/images/awsicons/redarr1.jpg" />

            </Box>
          </Grid>

          <Hidden smDown>
            <Grid item xs={3}>
              <Box display="flex" position="relative" marginLeft="-0.875rem !important">
                <StyledAvatar src="/assets/images/awsicons/Onprem.png" />

              </Box>
            </Grid>
          </Hidden>

          <Grid item xs={1}>
            <Box display="flex" justifyContent="flex-end">
              <IconButton>
                <Icon>more_vert</Icon>
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Card>
      <Box py={1} />
    </Fragment>
  ));
};

export default RowCards;
