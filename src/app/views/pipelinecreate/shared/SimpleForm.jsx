
import {
  Button,

  Grid,
  Icon,

  styled,
} from "@mui/material";
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const SimpleForm = ({ setPipelinename, Pipelinename, setbNameConfirmed, bNameConfirmed }) => {

  const [state, setState] = useState(Pipelinename);

  useEffect(() => {

    console.log("Pipelinename ", Pipelinename);

  }, [Pipelinename]);

  const handleSubmit = (event) => {
    // console.log("submitted");
    // console.log(event);
    console.log(state)
    setbNameConfirmed('true')
  };

  const handleChange = (event) => {
    event.persist();
    setState(event.target.value);

  };
  const handleReset = (event) => {
    event.persist();
    setState('')
    setbNameConfirmed('false')
    setPipelinename('')
  };
  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <Button hover variant="outlined" sx={{ mb: 2 }}>
              <AccountTreeTwoToneIcon />
            </Button>
            <TextField
              type="text"

              name="pipelineName"
              id="standard-basic"
              value={Pipelinename || ''}
              onChange={(event, newValue) => {
                setState(event.target.value);
                setPipelinename(event.target.value)
              }}

              errorMessages={["this field is required"]}
              label="pipelineName (Min length 4, Max length 9)"
              validators={["required", "minStringLength: 2", "maxStringLength: 150"]}
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
