import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  styled,
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const SimpleForm = ({ setProcessnamedesc, Processname, Processdesc, setbNameConfirmed, bNameConfirmed }) => {
  const [state, setState] = useState({});
  const {
    processName,
    processDescription,
  } = state;

  useEffect(() => {

    setState({ ...state, processName: Processname, processDescription: Processdesc });

  }, [Processname], [Processdesc]);

  const handleSubmit = (event) => {
    // console.log("submitted");
    // console.log(event);
    setbNameConfirmed('true');
    setProcessnamedesc(state.processName, state.processDescription);

  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleReset = (event) => {
    event.persist();
    setState('')
    setbNameConfirmed('false')
    setProcessnamedesc('', '');
  };



  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="processName"
              id="standard-basic"
              value={processName || ""}
              onChange={handleChange}
              errorMessages={["this field is required"]}
              label="ProcessName (Min length 4, Max length 250)"
              validators={["required", "minStringLength: 4", "maxStringLength: 250"]}
            />


          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="processDescription"
              id="standard-basic2"
              value={processDescription || ""}
              onChange={handleChange}
              errorMessages={["this field is required"]}
              label="ProcessDesc (Min length 4, Max length 250)"
              validators={["required", "minStringLength: 4", "maxStringLength: 250"]}
            />

          </Grid>
        </Grid>

        {(bNameConfirmed === 'false') ?
          <Button color="primary" variant="outlined" type="submit">
            <Icon>send</Icon>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Confirm</Span>
          </Button> : <Button color="primary" variant="outlined" sx={{ mr: 1 }} onClick={handleReset}>
            Reset
          </Button>}
      </ValidatorForm>
    </div>
  );
};

export default SimpleForm;
