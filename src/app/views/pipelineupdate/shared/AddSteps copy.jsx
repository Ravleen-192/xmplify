import { React, useState, useEffect, Fragment } from "react";
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import { Checkbox } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';

import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';

//import ClickAwayListener from '@mui/material/ClickAwayListener';
//import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

//import Chip from '@mui/material/Chip';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const StyledAutocompletePopper = styled('div')(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: 'none',
    margin: 0,
    color: 'inherit',
    fontSize: 13,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
    padding: 0,
    [`& .${autocompleteClasses.option}`]: {
      minHeight: 'auto',
      alignItems: 'center',
      padding: 8,
      borderBottom: `1px solid  ${theme.palette.mode === 'light' ? ' #eaecef' : '#30363d'
        }`,
      '&[aria-selected="true"]': {
        backgroundColor: 'transparent',
      },
      [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
      {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: 'relative',
  },
}));

function PopperComponent(props) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

PopperComponent.propTypes = {
  anchorEl: PropTypes.any,
  disablePortal: PropTypes.bool,
  open: PropTypes.bool.isRequired,
};
const filtered = [null];
export default function AddSteps({ AddProcessData, selsteps, preSteps }) {
  const [inputValue, setInputValue] = useState({});
  const [steps, setSteps] = useState(preSteps);
  const [selectedSteps, setSelectedSteps] = useState(selsteps);
  const theme = useTheme();
  useEffect(() => {
    console.log("selsteps from AddSteps", selsteps);
  }, [selsteps]);
  useEffect(() => {

  }, [steps]);
  console.log("filtered", filtered);

  return (
    <Autocomplete
      multiple

      options={steps}
      //disableCloseOnSelect
      defaultValue={filtered.length === 0 ? filtered : selectedSteps}

      name='stepsData'
      onChange={(event, newValue) => {
        console.log("Onchange", newValue)

        for (var i = 0; i < selectedSteps.length; i++) {
          for (var j = 0; j < newValue.length; j++) {
            if (selectedSteps[i].name !== newValue[j].name) {
              filtered[i] = newValue[j]
            }
          }
        }
        console.log("filtered", filtered)
        setSelectedSteps(newValue)
        return (AddProcessData(newValue, null, 'stepsData'))
      }}
      getOptionLabel={(step) => step.name}
      renderOption={(props, steps, { selected }) => {
        for (var i = 0; i < selectedSteps.length; i++) {
          if (selectedSteps[i].name === steps.name) {

            selected = true;

          }
        }
        { (steps.steptemplateid) % 2 === 0 ? steps.status = "/assets/images/awsicons/greenarr.jpg" : steps.status = "/assets/images/awsicons/redarr.jpg" }
        const tempstepid = `${steps.steptemplateid}`;
        steps.steptemplateid = tempstepid;

        return (
          <Stack direction="row" spacing={2} width="100%" height="50" >
            <li {...props} sx={{ height: 50, width: '80%' }}>
              <Box
                component={DoneIcon}
                sx={{ width: 17, height: 17, mr: '5px', ml: '-2px' }}
                style={{
                  visibility: selected ? 'visible' : 'hidden',
                }}
              />
              <Box
                sx={{
                  width: 17, height: 17, mr: '5px', ml: '-2px',
                  flexGrow: 1,
                  '& span': {
                    color:
                      theme.palette.mode === 'light' ? '#586069' : '#8b949e',
                  },
                }}
              >
                {tempstepid}
                <br />

              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  '& span': {
                    color:
                      theme.palette.mode === 'dark' ? '#586069' : '#8b949e',
                  },
                }}
              >
                <Avatar src={steps.icon} alt="I" />
                <br />

              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  '& span': {
                    color:
                      theme.palette.mode === 'light' ? '#586069' : '#8b949e',
                  },
                }}
              >
                {steps.name}
                <br />
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  '& span': {
                    color:
                      theme.palette.mode === 'dark' ? '#586069' : '#8b949e',
                  },
                }}
              >
                <Avatar src={steps.status} alt="I" />
                <br />

              </Box>
              <Box
                component={CloseIcon}
                sx={{ opacity: 0.6, width: 18, height: 18 }}
                style={{
                  visibility: selected ? 'visible' : 'hidden',
                }}
              />
            </li>
            <Select sx={{ opacity: 0.6, minWidth: 120, height: 50 }}
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
            //value={}

            // onChange={handleChange}
            >
              <MenuItem value="">
                <em>Sequence</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </Stack>

        )
      }

      }

      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Steps"
          placeholder="steps"
          autoComplete="off"

        />
      )}
    />
  );
}