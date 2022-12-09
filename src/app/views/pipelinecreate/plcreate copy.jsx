import { React, useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddProcess from './shared/AddProcess';
import AddSteps from './shared/AddSteps';
import Pipelinetable from './shared/Pipelinetable';
import { SimpleCard } from "app/components";
import SimpleForm from "./shared/SimpleForm";

const getPocessURL = "https://3uiqfn8244.execute-api.us-east-1.amazonaws.com/dev/get-process-templates";
const getStepsURL = "https://3uiqfn8244.execute-api.us-east-1.amazonaws.com/dev/get-step-templates";
const createPipelineURL = "https://3uiqfn8244.execute-api.us-east-1.amazonaws.com/dev/create-pipeline";



const steps = ['Process1 and Steps', 'Process2 and Steps', 'Process3 and Steps', 'Process4 and Steps', 'Review and Create a pipleline'];


const PlCreate = () => {
  const [preOptions, setpreOptions] = useState(null);
  const [preSteps, setpreSteps] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [activeProcess, setActiveProcess] = useState({});
  const [completed, setCompleted] = useState({});
  const [processData, setprocessData] = useState({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
  const [process1, setprocess1] = useState({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
  const [process2, setprocess2] = useState({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
  const [process3, setprocess3] = useState({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
  const [process4, setprocess4] = useState({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
  const [bcreatePipeline, setbceatePipeline] = useState('false');
  const [jPipelineData, setJpipelineData] = useState("");

  const [state, setState] = useState([
    {
      name: null,
      processes: []
    }
  ]
  );
  const [pipelineData, setpipelineData] = useState({});

  const AddtoPipeline = () => {

    setState((prev) => [
      ...prev.filter((a, i) => i !== 0),
      { ...prev[0], processes: [...prev[0].processes, { processtemplateid: processData.processtemplateid, name: processData.name, icon: processData.icon, status: processData.status, steps: processData.steps }] }
    ]);
  };
  const setPipelinename = (value) => {
    console.log("set pipeline name called")
    setState((prev) => [
      ...prev.filter((a, i) => i !== 0),
      { ...prev[0], name: value }
    ]);

  };
  useEffect(() => {

  }, [state], [state.name]);

  const AddProcessData = (field) => (event, value, selectedKey) => {

    let data = { ...processData };
    if (selectedKey === 'processData') {
      if (event) {

        data.processtemplateid = `${event.processtemplateid}`;
        data.name = event.name;
        data.icon = event.icon;
        data.status = event.status;
      }
    }
    else if (selectedKey === 'stepsData')
      if (event) {
        data.steps = event;
      }
    console.log("data", data)
    setprocessData(data)
    if (activeStep === 0) { setprocess1(data) }
    else if (activeStep === 1) { setprocess2(data) }
    else if (activeStep === 2) { setprocess3(data) }
    else if (activeStep === 3) { setprocess4(data) }
  };

  useEffect(() => {
    axios.post(getPocessURL, requestOptions)
      .then(res => {
        setpreOptions(res.data);
        console.log("%%%%%%%%%%%%%%%getPocessURL")
        console.log(res.data);
      })

  }, [getPocessURL]);

  useEffect(() => {
    axios.post(getStepsURL, requestOptions)
      .then(result => {
        setpreSteps(result.data);
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
        console.log(result.data);
      })
    // .then(response => response.json())
    // .then(data => this.setState({ postId: data.id }));
  }, [getStepsURL]);

  useEffect(() => {

    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    console.log("preOptions", preOptions);
  }, [preOptions]);
  useEffect(() => {

    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    console.log("preSteps", preSteps);
  }, [preSteps]);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'React POST Request Example' })
  };

  const createPipelines = async (jPipelineData) => {
    console.log("createPipelines")
    var requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jPipelineData)
    };

    var url = new URL(createPipelineURL)

    /* try {
       fetch(url, requestOptions)
         .then((res) => res.json())
         .then((jPipelineData) => {
           console.log(jPipelineData)
           setbceatePipeline('false')
         });
     } catch (error) {
       console.log("error", error)
       setbceatePipeline('false')
     }*/
  }

  useEffect(() => {
    if (bcreatePipeline === 'true')
      createPipelines(jPipelineData);
    console.log("bcreatePipeline", bcreatePipeline)
  }, [bcreatePipeline]);
  const createPipeline = () => {
    setbceatePipeline('true');
  };
  useEffect(() => {

  }, [processData]);
  //////////////////////////////////////////
  useEffect(() => {

    setpipelineData(state);
    // setJpipelineData(JSON.stringify(state));
    console.log("state ", state);
  }, [state]);
  useEffect(() => {
    if (pipelineData) {
      var strpipeline = pipelineData[0];
      setJpipelineData(strpipeline);
    }
    console.log("pipelineData ", pipelineData);

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
    return;

  };

  const handleBack = () => {
    if (activeStep === 0) { setActiveProcess(process1) }
    else if (activeStep === 1) { setActiveProcess(process2) }
    else if (activeStep === 2) { setActiveProcess(process3) }
    else if (activeStep === 3) { setActiveProcess(process4) }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    if (activeStep === 0) { setActiveProcess(process1) }
    else if (activeStep === 1) { setActiveProcess(process2) }
    else if (activeStep === 2) { setActiveProcess(process3) }
    else if (activeStep === 3) { setActiveProcess(process4) }
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    /*
        if (activeStep === 0) {
          createpipleineID();
        }*/
    if (processData.name !== '')
      AddtoPipeline();
    if (activeStep === 0) { setActiveProcess(process1); }
    else if (activeStep === 1) { setActiveProcess(process2) }
    else if (activeStep === 2) { setActiveProcess(process3) }
    else if (activeStep === 3) { setActiveProcess(process4) }

    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    //handleNext();
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    setprocessData({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
    // if (completedSteps() === totalSteps()) {
    if (activeStep === totalSteps()) {
      console.log("creating pipeline")
      createPipeline();
    }
  };


  const handleReset = () => {
    setActiveStep(0);
    setActiveProcess(null);
    setbceatePipeline('false');
    setpipelineData(null);
    setJpipelineData("");
    setCompleted({});
    setprocessData({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
    setprocess1({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
    setprocess2({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
    setprocess3({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
    setprocess4({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });

  };

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
        {activeStep === 0 ?
          <SimpleCard title="Create New Pipeline">
            <SimpleForm setPipelinename={setPipelinename} />
          </SimpleCard> : null}
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
            {preOptions && preSteps ?
              <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                {/*Step {activeStep + 1}*/}

                {activeStep === 0 ? <><AddProcess key={'process1'} process={process1} AddProcessData={AddProcessData('processData')} preOptions={preOptions} /> <AddSteps key={"process1Steps"} selsteps={process1.steps} AddProcessData={AddProcessData('stepsData')} preSteps={preSteps} /></>
                  : activeStep === 1 ? <><AddProcess key={'process2'} process={process2} AddProcessData={AddProcessData('processData')} preOptions={preOptions} /> <AddSteps key={"process2Steps"} selsteps={process2.steps} AddProcessData={AddProcessData('stepsData')} preSteps={preSteps} /></>
                    : activeStep === 2 ? <><AddProcess key={'process3'} process={process3} AddProcessData={AddProcessData('processData')} preOptions={preOptions} /> <AddSteps key={"process3Steps"} selsteps={process3.steps} AddProcessData={AddProcessData('stepsData')} preSteps={preSteps} /></>
                      : activeStep === 3 ? <><AddProcess key={'process4'} process={process4} AddProcessData={AddProcessData('processData')} preOptions={preOptions} /> <AddSteps key={"process4Steps"} selsteps={process4.steps} AddProcessData={AddProcessData('stepsData')} preSteps={preSteps} /> </>
                        : <Pipelinetable pipelineData={pipelineData} pipelineName={state.name} />}

              </Typography> : <>Loading...</>}
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
              {/*  <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              <Typography variant="caption" sx={{ display: 'inline-block', color: 'red', mt: '20' }}>
                    Step {activeStep + 1} already completed
                </Typography>*/}
              {activeStep !== steps.length &&
                (completed[activeStep] ? (

                  <Button sx={{ color: 'red' }}>
                    Step {activeStep + 1} already completed
                  </Button>
                ) : (
                  <Button onClick={handleComplete}>
                    {/*{completedSteps() === totalSteps() - 1*/}
                    {activeStep === totalSteps() - 1
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