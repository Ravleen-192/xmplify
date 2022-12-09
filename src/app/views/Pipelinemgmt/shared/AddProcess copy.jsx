import * as React from 'react';
import { useState } from 'react';
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
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [value, setValue] = React.useState([labels[1], labels[3]]);

    const [pendingValue, setPendingValue] = React.useState([]);
    const theme = useTheme();

    const handleClick = (event) => {
        setPendingValue(value);
        console.log("handleClick");
        console.log("value");
        console.log(value);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setValue(pendingValue);
        console.log("handleClick");
        console.log("pendingValue");
        console.log(pendingValue);
        if (anchorEl) {
            anchorEl.focus();
        }
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'github-label' : undefined;
    const [inputValue, setInputValue] = useState("");
    return (
        <React.Fragment>
            <Box sx={{ width: 221, fontSize: 13 }}>
                <Button disableRipple aria-describedby={id} onClick={handleClick}>
                    <span>Processes</span>
                    <AccountTreeTwoToneIcon />
                </Button>
                {value.map((label) => (
                    <Box
                        key={label.name}
                        sx={{
                            mt: '3px',
                            height: 20,
                            padding: '.15em 4px',
                            fontWeight: 600,
                            lineHeight: '15px',
                            borderRadius: '2px',
                        }}
                        style={{
                            backgroundColor: label.color,
                            color: theme.palette.getContrastText(label.color),
                        }}
                    >
                        {label.name}
                    </Box>
                ))}
            </Box>
            <StyledPopper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
                <ClickAwayListener onClickAway={handleClose}>
                    <div>

                        <Autocomplete
                            noOptionsText="Enter to create a new option"
                            open
                            multiple
                            onClose={(event, reason) => {
                                if (reason === 'escape') {
                                    handleClose();
                                }
                            }}
                            value={pendingValue}
                            onInputChange={(e, newValue) => {
                                console.log("onInputChange called");
                                console.log(newValue);
                                setInputValue(newValue);
                            }}
                            onChange={(event, newValue, reason) => {
                                if (
                                    event.type === 'keydown' &&
                                    event.key === 'Backspace' &&
                                    reason === 'removeOption'
                                ) {
                                    return;
                                }
                                setPendingValue(newValue);
                            }}
                            disableCloseOnSelect
                            PopperComponent={PopperComponent}
                            renderTags={() => null}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Box
                                        component={DoneIcon}
                                        sx={{ width: 17, height: 17, mr: '5px', ml: '-2px' }}
                                        style={{
                                            visibility: selected ? 'visible' : 'hidden',
                                        }}
                                    />
                                    <Box
                                        component="span"
                                        sx={{
                                            width: 14,
                                            height: 14,
                                            flexShrink: 0,
                                            borderRadius: '3px',
                                            mr: 1,
                                            mt: '2px',
                                        }}
                                        style={{ backgroundColor: option.color }}
                                    />
                                    <Box
                                        sx={{
                                            flexGrow: 1,
                                            '& span': {
                                                color:
                                                    theme.palette.mode === 'light' ? '#586069' : '#8b949e',
                                            },
                                        }}
                                    >
                                        {option.name}
                                        <br />
                                        <span>{option.description}</span>
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
                            options={[...labels].sort((a, b) => {
                                // Display the selected labels first.
                                let ai = value.indexOf(a);
                                ai = ai === -1 ? value.length + labels.indexOf(a) : ai;
                                let bi = value.indexOf(b);
                                bi = bi === -1 ? value.length + labels.indexOf(b) : bi;
                                return ai - bi;
                            })}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <StyledInput
                                    {...params}
                                    ref={params.InputProps.ref}
                                    inputProps={params.inputProps}
                                    autoFocus
                                    placeholder="Filter labels"
                                    onKeyDown={(e) => {
                                        if (
                                            e.key === "Enter" &&
                                            value.findIndex((o) => o.name === inputValue) === -1
                                        ) {
                                            console.log("value from render");
                                            console.log(inputValue);
                                            let [o] = [{
                                                name: inputValue,
                                                color: 'rgba(9, 182, 109, 0.15)',
                                                description: '',
                                            }];
                                            console.log("o");
                                            console.log(o);
                                            setPendingValue([o]);
                                        }
                                    }}
                                />
                            )}
                        />
                    </div>
                </ClickAwayListener>
            </StyledPopper>
        </React.Fragment>
    );
}

// From https://github.com/abdonrd/github-labels
const labels = [
    {
        name: 'On-prem to S3',
        color: 'rgba(9, 182, 109, 0.15)',
        description: 'Good for newcomers',
    },
    {
        name: 'S3 to Redshift Source-raw',
        color: '#777',
        description: 'Extra attention is needed',
    },
    {
        name: 'Source-raw to Curated',
        color: 'rgba(9, 182, 109, 0.15)',
        description: '',
    },
    {
        name: 'S3 to Athena',
        color: '#777',
        description: '',
    },
    {
        name: 'Curated to Consumption',
        color: 'rgba(9, 182, 109, 0.15)',
        description: '',
    },
    {
        name: 'RDM to AWS Redshift Curated',
        color: 'rgba(9, 182, 109, 0.15)',
        description: 'Good for newcomers',
    },
    {
        name: 'RDM to MDM',
        color: '#777',
        description: 'Extra attention is needed',
    },
    {
        name: 'User Interface to RDM',
        color: 'rgba(9, 182, 109, 0.15)',
        description: '',
    },
    {
        name: 'On-prem SFTP Server to CDP AWS S3',
        color: '#777',
        description: '',
    },
    {
        name: 'CDL to On-prem SFTP Server',
        color: 'rgba(9, 182, 109, 0.15)',
        description: '',
    },
];
/* <Autocomplete
        multiple
        id="tags-filled"
        options={top100Films.map((option) => option.title)}
        defaultValue={[top100Films[13].title]}
        freeSolo
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="freeSolo"
            placeholder="Favorites"
          />
        )}
      />*/