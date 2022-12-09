import { Box } from '@mui/material';
import { MatxProgressBar, SimpleCard } from 'app/components';
import { Small } from 'app/components/Typography';

const Campaigns = () => {
  return (
    <Box>
      <SimpleCard title="Data Strategy and Data Analytics ">
        <h2>
          <span >What is a Data Strategy? (And What it’s Not)</span></h2>

        <p>Even as companies make larger investments in data and analytics initiatives
          than ever before, age-old obstacles like siloed and untrustworthy data,
          inefficient data management practices, and a lack of meaningful insights continue
          to get in the way of unlocking your data’s potential.</p>
        <p>A good data strategy
          framework is proven to help companies overcome those obstacles and define the path to
          become more data driven.</p>



        <Small color="text.secondary" display="block" pt={4}>
          Join us!
        </Small>
        <MatxProgressBar value={75} color="primary" />
        <MatxProgressBar value={45} color="secondary" />
        <MatxProgressBar value={75} color="primary" />
      </SimpleCard>
    </Box>
  );
};

export default Campaigns;
