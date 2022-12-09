import { React, useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddProcess from './shared/AddProcess';
import AddSteps from './shared/AddSteps';
import Pipelinetable from 'app/views/Pipelinemgmt/shared/Pipelinetable';


const steps = ['Process1 and Steps', 'Process2 and Steps', 'Process3 and Steps', 'Process4 and Steps', 'Review and Create a pipleline'];


const PlCreate = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [processData, setprocessData] = useState({ id: '', name: '', icon: '', steps: [] });
  const [pUid, setpUid] = useState('');
  //const [pipelineData, setpipelineData] = useState({ id: '', processes: [] });
  const [state, setState] = useState([
    {
      id: "",
      processes: []
    }
  ]);
  const [pipelineData, setpipelineData] = useState([
    {
      id: "",
      processes: []
    }
  ]);

  const AddtoPipeline = () => {
    //let rg = ((Math.random() * 1000) / 10).toFixed();
    setState((prev) => [
      ...prev.filter((a, i) => i !== 0),
      { ...prev[0], processes: [...prev[0].processes, { process: processData }] }
    ]);
  };
  const AddProcessData = (field) => (event, value, selectedKey) => {

    let data = { ...processData };
    if (selectedKey === 'processData') {
      data.id = event.id;
      data.name = event.name;
      data.icon = event.icon;
    }
    else if (selectedKey === 'stepsData')
      data.steps = event;

    setprocessData(data)

  };

  const createpipleineID = () => {
    const unique_id = uuid();
    const small_id = unique_id.slice(0, 8);

    setpUid(small_id)

  };
  ///dont touch
  useEffect(() => {
    //setState({ id: pUid });

  }, [pUid]);


  useEffect(() => {

  }, [processData]);
  useEffect(() => {
    console.log("pipelinedata ", pipelineData);
  }, [pipelineData]);


  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {

    console.log("processData handle next", processData);

    if (activeStep === 0) {
      createpipleineID();
    }

    AddtoPipeline();

    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {

    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  console.log(JSON.stringify(state));
  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <Fragment>
            {/*<Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
        </Typography>*/}
            <Button sx={{ background: 'rgba(9, 182, 109, 0.15)', mt: 2, mb: 1 }}><Link className="link" to='/Pipelinemgmt/default'><strong>All steps completed - pipeline is ready.</strong></Link></Button>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </Fragment>
        ) : (
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              {/*Step {activeStep + 1}*/}

              {activeStep === 0 ? <><AddProcess key={"process1"} AddProcessData={AddProcessData('processData')} /> <AddSteps key={"process1Steps"} AddProcessData={AddProcessData('stepsData')} /></>
                : activeStep === 1 ? <><AddProcess key={"process2"} AddProcessData={AddProcessData('processData')} /> <AddSteps key={"process2Steps"} AddProcessData={AddProcessData('stepsData')} /></>
                  : activeStep === 2 ? <><AddProcess key={"process3"} AddProcessData={AddProcessData('processData')} /> <AddSteps key={"process3Steps"} AddProcessData={AddProcessData('stepsData')} /></>
                    : activeStep === 3 ? <><AddProcess key={"process4"} AddProcessData={AddProcessData('processData')} /> <AddSteps key={"process4Steps"} AddProcessData={AddProcessData('stepsData')} /> </>
                      : <Pipelinetable />}

            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {/* <Typography variant="caption" sx={{ display: 'inline-block', color: 'red', mt: '20' }}>
                    Step {activeStep + 1} already completed
                </Typography>*/}
              {activeStep !== steps.length &&
                (completed[activeStep] ? (

                  <Button sx={{ color: 'red' }}>
                    Step {activeStep + 1} already completed
                  </Button>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button>
                ))}
            </Box>
          </Fragment>
        )}
      </div>
    </Box>
  );
}
export default PlCreate;