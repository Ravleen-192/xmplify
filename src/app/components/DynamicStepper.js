import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepContent from '@mui/material/StepContent';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Tooltip from '@mui/material/Tooltip';

import Add from '@mui/icons-material/AddCircleOutlineSharp';
import Delete from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { Menu } from '@mui/material';

export const isSet = (value) => {
  return value !== undefined && value !== null;
};

export const stepOptions = [
  { label: 'Add a Pipeline Name', value: '1' },
  { label: 'Add a new Process', value: '1' },
  { label: 'Review and Create Pipeline', value: '2' },
];

class DynamicStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [{ title: null, value: null }],
      activeStep: 0,
    };
  }

  changeStepValue(ind, value) {
    let steps = [...this.state.steps];
    steps[ind].value = value;
    const option = stepOptions.find((item) => item.value === value);
    steps[ind].title = option ? option.label : 'Undefined';
    this.setState({ steps: steps, activeStep: steps.length });
  }

  addStep(n = 1) {
    let newSteps = [...this.state.steps];
    for (let i = 0; i < n; i++) {
      newSteps.push({ title: null, value: null });
    }
    this.setState({ steps: newSteps, activeStep: newSteps.length - 1 });
  }

  removeStep(ind) {
    let steps = [...this.state.steps];
    if (steps.length < ind + 1) {
      return;
    }
    steps = steps.filter((item, i) => i !== ind);
    this.setState({ steps: steps, activeStep: steps.length });
  }

  render() {
    const { classes } = this.props;
    const { activeStep, steps } = this.state;

    return (
      <React.Fragment>
        <AppBar position="relative">
          <Toolbar>
            <IconButton color="inherit">
              <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit" style={{ flex: '1 1 0px' }}>
              Dynamic Stepper
            </Typography>
            <Tooltip title="Clear All Steps">
              <IconButton
                aria-label="Clear All Steps"
                color="inherit"
                onClick={() => this.setState({ steps: [] })}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <div className={classes.body}>
          <Stepper nonLinear activeStep={activeStep} orientation="horizontal">
            {steps.map((step, index) => (
              <Step
                key={`step_${index}_container`}
                disabled={!isSet(steps[steps.length - 1].value) && index !== steps.length - 1}
              >
                <StepButton
                  onClick={() =>
                    this.setState({
                      activeStep:
                        activeStep === index && isSet(steps[index].value) ? steps.length : index,
                    })
                  }
                >
                  <div style={{ display: 'flex' }}>
                    <Typography>{step.title || 'Choose an action'}</Typography>
                    {activeStep === index && (
                      <Tooltip title="Remove Step" placement={'right'}>
                        <Delete style={{ marginLeft: 5 }} onClick={() => this.removeStep(index)} />
                      </Tooltip>
                    )}
                  </div>
                </StepButton>
                <StepContent>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="action"
                      name={`action_${index}`}
                      value={steps[index].value}
                      onChange={(evt) => this.changeStepValue(index, evt.target.value)}
                    >
                      {stepOptions.map((step, i) => (
                        <FormControlLabel
                          key={`step_${index}_option_${i}`}
                          value={step.value}
                          control={<Radio />}
                          label={step.label}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </StepContent>
              </Step>
            ))}
            <Step
              key={'add-a-step'}
              disabled={steps.length > 0 && !isSet(steps[steps.length - 1].value)}
            >
              <StepButton
                icon={
                  <Add
                    className={
                      classes.addButton +
                      (steps.length > 0 && !isSet(steps[steps.length - 1].value) ? ' disabled' : '')
                    }
                  />
                }
                onClick={() => this.addStep()}
                style={{ fontWeight: 'bold' }}
              >
                {'Add a Step'}
              </StepButton>
            </Step>
          </Stepper>
        </div>
      </React.Fragment>
    );
  }
}

DynamicStepper.propTypes = {
  classes: PropTypes.object,
};

const styles = (theme) => ({
  addButton: {
    color: '#0088f2',
    transformOrigin: 'center',
    transform: 'scale(1.3)',
    '&.disabled': {
      color: 'rgba(0,0,0,0.38)',
    },
  },
  body: {
    marginTop: theme.spacing.unit * 8,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit * 7,
    },
  },
});

export default withStyles(styles)(DynamicStepper);
