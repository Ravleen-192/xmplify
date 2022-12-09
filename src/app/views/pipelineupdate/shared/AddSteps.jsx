import { React, useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import { useTheme, styled } from '@mui/material/styles';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';

//import ClickAwayListener from '@mui/material/ClickAwayListener';
//import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

//import Chip from '@mui/material/Chip';


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

export default function AddSteps({ AddProcessData, selsteps, preSteps }) {

  const [inputValue, setInputValue] = useState({});
  const [steps, setSteps] = useState(preSteps);
  const [selectedSteps, setSelectedSteps] = useState(selsteps);
  const [sequence, setSequence] = useState("Seq*")

  const theme = useTheme();
  useEffect(() => {
    console.log("selsteps from AddSteps", selsteps);
  }, [selsteps]);

  useEffect(() => {
    console.log("steps from AddSteps", steps);
  }, [steps]);

  const handleSelectChange = (event) => {
    setSequence(event.target.value)
  };
  return (
    <Autocomplete
      options={steps}
      freeSolo
      noOptionsText="No Option available."
      multiple
      //open
      autoFocus
      defaultValue={selectedSteps}
      //defaultValue={[steps[1].name]}
      getOptionLabel={(step) => step.name}
      /*inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}*/
      name='stepsData'
      onChange={(event, newValue) => {
        console.log("Onchange", newValue)
        setSelectedSteps(newValue);
        return (AddProcessData(newValue, null, 'stepsData'))
      }}
      disableCloseOnSelect
      PopperComponent={PopperComponent}
      /*renderTags={(value, getTagProps) =>
          value.map((option, index) => (
              <Chip variant="outlined" label={Array.isArray(option) ? option.name : option}  {...getTagProps({ index })} />
          ))
      }*/
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
          <li {...props} sx={{ width: '100%', height: 50 }}>
            <Box
              component={DoneIcon}
              sx={{ width: 17, height: 17, mr: '5px', ml: '-2px' }}
              style={{
                visibility: selected ? 'visible' : 'hidden',
              }}
            />
            <Box
              sx={{
                width: 17, height: 17, mr: '5px', ml: '10px',
                flexGrow: 1,
                '& span': {
                  color:
                    theme.palette.mode === 'light' ? '#586069' : '#8b949e',
                },
              }}
            >
              {steps.steptemplateid}
              {"           "}

              <Avatar src={steps.icon} alt="I" />


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
            {/*<Box
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

            </Box>*/}

            <Box sx={{ minWidth: 120, height: '120px' }}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel sx={{ minWidth: 120, minHeight: 30 }} >Seq *</InputLabel>
                <Select

                  //value={sequence}
                  label="Age"
                  onChange={handleSelectChange}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              component={CloseIcon}
              sx={{ opacity: 0.6, width: 18, height: 18 }}
              style={{
                visibility: selected ? 'visible' : 'hidden',
              }}
            />
          </li>

        )
      }

      }

      renderInput={(params) => (
        <TextField
          {...params}

          placeholder="Steps"
        /*onKeyDown={(e) => {
          if (
            e.key === "Enter" &&
            steps.findIndex((o) => o.name === inputValue) === -1
          ) {

            setSteps((o) => o.concat({ name: inputValue, icon: "/assets/images/awsicons/quicksight.png" }));
          }
        }}*/
        />
      )}
    />
  );
}