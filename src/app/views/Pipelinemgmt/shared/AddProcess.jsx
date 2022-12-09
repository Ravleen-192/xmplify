import { React, Fragment, useState } from "react";
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import ButtonBase from '@mui/material/ButtonBase';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
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

const StyledPopper = styled(Popper)(({ theme }) => ({
    border: `1px solid ${theme.palette.mode === 'light' ? '#e1e4e8' : '#30363d'}`,
    boxShadow: `0 8px 24px ${theme.palette.mode === 'light' ? 'rgba(149, 157, 165, 0.2)' : 'rgb(1, 4, 9)'
        }`,
    borderRadius: 6,
    width: 300,
    zIndex: theme.zIndex.modal,
    fontSize: 13,
    color: theme.palette.mode === 'light' ? '#24292e' : '#c9d1d9',
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
    padding: 10,
    width: '100%',
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#eaecef' : '#30363d'
        }`,
    '& input': {
        borderRadius: 4,
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#0d1117',
        padding: 8,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        border: `1px solid ${theme.palette.mode === 'light' ? '#eaecef' : '#30363d'}`,
        fontSize: 14,
        '&:focus': {
            boxShadow: `0px 0px 0px 3px ${theme.palette.mode === 'light'
                ? 'rgba(3, 102, 214, 0.3)'
                : 'rgb(12, 45, 107)'
                }`,
            borderColor: theme.palette.mode === 'light' ? '#0366d6' : '#388bfd',
        },
    },
}));

const Button = styled(ButtonBase)(({ theme }) => ({
    fontSize: 13,
    width: '100%',
    textAlign: 'left',
    paddingBottom: 8,
    color: theme.palette.mode === 'light' ? '#586069' : '#8b949e',
    fontWeight: 600,
    '&:hover,&:focus': {
        color: theme.palette.mode === 'light' ? '#0366d6' : '#58a6ff',
    },
    '& span': {
        width: '100%',
    },
    '& svg': {
        width: 16,
        height: 16,
    },
}));


export default function AddProcess() {

    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState(initialOptions);
    const theme = useTheme();
    return (
        <Autocomplete
            options={options}
            freeSolo
            noOptionsText="Enter to create a new option"
            multiple
            //defaultValue={[options[1].name]}
            getOptionLabel={(option) => option.name}
            onInputChange={(e, newValue) => {
                setInputValue(newValue);
            }}
            disableCloseOnSelect
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
                    onKeyDown={(e) => {
                        if (
                            e.key === "Enter" &&
                            options.findIndex((o) => o.name === inputValue) === -1
                        ) {
                            setOptions((o) => o.concat({ name: inputValue, icon: "/assets/images/awsicons/quicksight.png" }));
                        }
                    }}
                />
            )}
        />
    );
}