import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const steps = [
    'Trigger job to move/copy to S3',
    'for push - N/A, e.g. cron copies from STFP to S3',
    'N/A - will leverage Storage Gateway',
    'On-prem DAtabase to AWS Redshift Replication',
    'Check if trailer file exists; if not generate trailer file',
    'Load trailer file to log table',
    'Reconcile trailer file and raw table count',
    'Trigger notification/alerts',
    'Copy data from source_raw to curated tables',
    'each table will have its own step to load',
    'Run DQ controls - reconcile',

];

export default function SelectSteps() {
    const [stepName, setStepName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setStepName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ width: '100%' }}>
                <InputLabel id="demo-multiple-checkbox-label">Steps</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={stepName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Steps" />}
                    renderValue={(selected) => selected.join('; ')}
                    MenuProps={MenuProps}
                >
                    {steps.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={stepName.indexOf(name) > -1} />
                            <Avatar src={"/assets/images/awsicons/Curated.jpg"} alt="I" />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
