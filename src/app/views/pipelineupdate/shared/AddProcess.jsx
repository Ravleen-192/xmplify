import { React, useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import { useTheme, styled } from '@mui/material/styles';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';
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

export default function AddProcess({ AddProcessData, LoadProcessData, process, preOptions }) {

  const [options, setOptions] = useState(preOptions);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(process.name);
  const [sequence, setSequence] = useState("Seq*")

  const theme = useTheme();
  console.log("process name", process.name)
  console.log("value", value)

  useEffect(() => {
    LoadProcessData();
    setInputValue(process.name);
    console.log("process.name ", process.name);
  }, [process.name]);

  useEffect(() => {

    console.log("options ", options);
  }, [options]);

  const handleSelectChange = (event) => {
    setSequence(event.target.value)
  };
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
        //defaultValue={[options[0].name]}
        isOptionEqualToValue={(option, value) => option.name === process.name}
        getOptionLabel={(option) => option.name}
        value={value}
        name='processData'
        onChange={(event, newValue) => { AddProcessData(newValue, null, 'processData'); setValue(newValue); }}

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
        renderOption={(props, options, { selected }) => {
          { (options.processtemplateid) % 2 === 0 ? options.status = "/assets/images/awsicons/greenarr.jpg" : options.status = "/assets/images/awsicons/redarr.jpg" }

          return (
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
              {/* <Box
                sx={{
                  flexGrow: 1,
                  '& span': {
                    color:
                      theme.palette.mode === 'dark' ? '#586069' : '#8b949e',
                  },
                }}
              >
                <Avatar src={options.status} alt="I" />
                <br />

              </Box>*/}

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
          )
        }
        }

        renderInput={(params) => (
          <Stack direction="row" spacing={2} height="50"><TextField
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

            <Box sx={{ minWidth: 120, height: '120px' }}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel sx={{ minWidth: 120, minHeight: 30 }} >Seq *</InputLabel>
                <Select

                  value={sequence}
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

          </Stack>
        )}
      />




      <h4>Add the Steps for the selected process.</h4>
    </>
  );
}