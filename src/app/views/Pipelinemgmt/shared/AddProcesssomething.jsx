import { React, Fragment, useState } from "react";

import { TextField, IconButton } from "@mui/material";

import Autocomplete from "@mui/material/Autocomplete";
import { options as initialOptions } from "./options";



export default function AddProcess() {

    const [inputValue, setInputValue] = React.useState("");
    const [options, setOptions] = React.useState(initialOptions);

    return (
        <Autocomplete
            options={options}
            noOptionsText="Enter to create a new option"
            getOptionLabel={(option) => option.title}
            onInputChange={(e, newValue) => {
                setInputValue(newValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Select"
                    variant="outlined"
                    onKeyDown={(e) => {
                        if (
                            e.key === "Enter" &&
                            options.findIndex((o) => o.title === inputValue) === -1
                        ) {
                            setOptions((o) => o.concat({ title: inputValue }));
                        }
                    }}
                />
            )}
        />
    );
}
/*<Autocomplete
            options={options}
            noOptionsText="Enter to create a new option"
            getOptionLabel={(option) => option.name}
            onInputChange={(e, newValue) => {
                setInputValue(newValue);
            }}
            renderOption={option => {
                return (
                    <>
                        <IconButton color="primary">
                            <img src={'/assets/images/awsicons/Analytics.png'} /> 
                        </IconButton>
                        {option.title}
                    </>
                );
            }}
            renderInput={(params) => (
                <TextField
                    {...params}

                    label="Select"
                    variant="outlined"
                    onKeyDown={(e) => {
                        if (
                            e.key === "Enter" &&
                            options.findIndex((o) => o.name === inputValue) === -1
                        ) {
                            setOptions((o) => o.concat({ name: inputValue }));
                        }
                    }}
                />
            )}
                />*/