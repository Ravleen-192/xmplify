import React from 'react';
import Tabs from '@mui-treasury/components/tabs/twitterIcon';
import Home from '@mui/icons-material/Home';
import Search from '@mui/icons-material/Search';
import Notifications from '@mui/icons-material/Notifications';
import MailOutlineRounded from '@mui/icons-material//MailOutlineRounded';

const PlCreate = () => {
    const [index, setIndex] = React.useState(0);
    return (
        <Tabs
            tabs={[
                { icon: <Home />, badgeProps: { badgeContent: '' } },
                { icon: <Search /> },
                { icon: <Notifications />, badgeProps: { badgeContent: 99 } },
                { icon: <MailOutlineRounded /> },
            ]}
            value={index}
            onChange={(e, i) => setIndex(i)}
        />
    );
};


export default PlCreate;