import { React, Fragment, useState } from "react";
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';

import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AddSteps from './AddSteps';
//import Chip from '@mui/material/Chip';
import { options as initialOptions } from "./options";


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
      alignItems: 'flex-start',
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





export default function AddProcess(props) {

  const [processData, setprocessData] = useState(props.processData);
  const [options, setOptions] = useState(initialOptions);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(options[0]);

  const theme = useTheme();

  return (
    <>
      <h4>Select the process.</h4>
      <Autocomplete
        options={options}
        freeSolo
        autoFocus
        //noOptionsText="No option available"
        //multiple
        //open
        //defaultValue={[options[1].name]}
        getOptionLabel={(option) => option.name}
        value={value}
        onChange={(event, newValue) => setprocessData(newValue => ({
          ...processData, newValue
        })
        )}

        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        //disableCloseOnSelect
        PopperComponent={PopperComponent}


        /* renderTags={(value, getTagProps) =>
             value.map((option, index) => (
                 <Chip variant="outlined" label={Array.isArray(option) ? option.name : option}  {...getTagProps({ index })} />
             ))
         }*/
        renderOption={(props, options, { selected }) => (
          <li {...props}>
            <Box
              component={DoneIcon}
              sx={{ width: 17, height: 17, mr: '5px', ml: '-2px' }}
              style={{
                visibility: selected ? 'visible' : 'hidden',
              }}
            />
            <Box
              sx={{
                flexGrow: 1,
                '& span': {
                  color:
                    theme.palette.mode === 'dark' ? '#586069' : '#8b949e',
                },
              }}
            >
              <Avatar src={options.icon} alt="I" />
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
              {options.name}
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
        )}

        renderInput={(params) => (
          <TextField
            {...params}
            autoFocus
            placeholder="Processes"
          /* onKeyDown={(e) => {
             if (
               e.key === "Enter" &&
               options.findIndex((o) => o.name === inputValue) === -1
             ) {
  
               setOptions((o) => o.concat({ name: inputValue, icon: "/assets/images/awsicons/quicksight.png" }));
             }
           }}*/
          />

        )}
      />
      <h4>Add the Steps for the selected process.</h4>
      {console.log("props.processData", props.processData)}
      <AddSteps />
    </>
  );
}