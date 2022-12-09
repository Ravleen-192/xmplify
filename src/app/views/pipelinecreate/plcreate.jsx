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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
const getPocessURL = "https://3uiqfn8244.execute-api.us-east-1.amazonaws.com/dev/get-process-templates";
const getStepsURL = "https://3uiqfn8244.execute-api.us-east-1.amazonaws.com/dev/get-step-templates";
const createPipelineURL = "https://3uiqfn8244.execute-api.us-east-1.amazonaws.com/dev/create-pipeline";
const initSteps = ['Create Pipeline', 'Add Process', 'Add Process', 'Add Process', 'Add Process', 'Review and Create a pipleline'];

const PlCreate = () => {
  const [steps, setSteps] = useState(initSteps);
  const [preOptions, setpreOptions] = useState(null);
  const [preSteps, setpreSteps] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [activeProcess, setActiveProcess] = useState({});
  const [completed, setCompleted] = useState({});
  const [bNameConfirmed, setbNameConfirmed] = useState('false');
  const [processData, setprocessData] = useState({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
  const [process1, setprocess1] = useState({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
  const [process2, setprocess2] = useState({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
  const [process3, setprocess3] = useState({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
  const [process4, setprocess4] = useState({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
  const [bcreatePipeline, setbceatePipeline] = useState('false');
  const [jPipelineData, setJpipelineData] = useState("");
  const [errMsg, seterrMsg] = useState("");
  const [succMsg, setsuccMsg] = useState("");

  const [state, setState] = useState([
    {
      name: null,
      processes: []
    }
  ]
  );
  const [pipelineData, setpipelineData] = useState({});
  const changeStepLabel = (index, name) => {
    const nextLabels = steps.map((c, i) => {
      if (i === index) {
        // Increment the clicked counter
        c = name;
      }
      return c;
    });
    console.log("nextLabels", nextLabels)
    setSteps(nextLabels);
  };

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
    console.log("state[0].name", state[0].name)
  }, [state], [state[0].name]);

  useEffect(() => {
    console.log("steps", steps)
  }, [steps]);

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
    if (activeStep === 1) { setprocess1(data) }
    else if (activeStep === 2) { setprocess2(data) }
    else if (activeStep === 3) { setprocess3(data) }
    else if (activeStep === 4) { setprocess4(data) }
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
    console.log("createPipelines jPipelineData", JSON.stringify(jPipelineData))
    var requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jPipelineData)
    };

    var url = new URL(createPipelineURL)

    try {
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((jPipelineData) => {
          console.log(jPipelineData)

        });
      setsuccMsg("Pipeline Created!")
    } catch (error) {
      console.log("error", error)
      seterrMsg(error);
    }
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
    if (activeStep === 1) { setActiveProcess(process1) }
    else if (activeStep === 2) { setActiveProcess(process2) }
    else if (activeStep === 3) { setActiveProcess(process3) }
    else if (activeStep === 4) { setActiveProcess(process4) }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    if (activeStep === 1) { setActiveProcess(process1) }
    else if (activeStep === 2) { setActiveProcess(process2) }
    else if (activeStep === 3) { setActiveProcess(process3) }
    else if (activeStep === 4) { setActiveProcess(process4) }
    const newActiveStep =
      /* isLastStep() && !allStepsCompleted()
         ? // It's the last step, but not all steps have been completed,
         // find the first step that has been completed
         steps.findIndex((step, i) => !(i in completed))
         : */
      activeStep + 1;
    setActiveStep(newActiveStep);
    setActiveStep(step);
  };
  const handleFinish = () => {
    if (state[0].name != null && state[0].name !== '' && pipelineData[0].processes.length >= 1)
      createPipeline();
    else seterrMsg("Please add Pipeline Name and atleast one process to create a pipeline.")

  };

  const handleComplete = () => {
    const newCompleted = completed;
    console.log("HandleComplete state[0].name", state[0].name)
    if (processData.name !== '')
      AddtoPipeline();
    if (!completed[activeStep]) {
      if (activeStep === 0 && (state[0].name != null && state[0].name !== ''))
        changeStepLabel(activeStep, state[0].name);

      if (activeStep === 1) {
        setActiveProcess(process1);
        if ((process1.name != null && process1.name !== '')) {
          changeStepLabel(activeStep, process1.name);
        }
      }
      else if (activeStep === 2) {
        setActiveProcess(process2);
        if ((process2.name != null && process2.name !== '')) {
          changeStepLabel(activeStep, process2.name);
        }
      }
      else if (activeStep === 3) {
        setActiveProcess(process3);
        if ((process3.name != null && process3.name !== '')) {
          changeStepLabel(activeStep, process3.name);
        }
      }
      else if (activeStep === 4) {
        setActiveProcess(process4);
        if ((process4.name != null && process4.name !== '')) {
          changeStepLabel(activeStep, process4.name);
        }
      }
    }
    const newActiveStep =
     /* isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : */activeStep + 1;
    setActiveStep(newActiveStep);
    //handleNext();
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    setprocessData({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
  };


  const handleReset = () => {
    setActiveStep(0);
    setActiveProcess(null);
    setbceatePipeline('false');
    setpipelineData(null);
    setJpipelineData("");
    setCompleted({});
    setbNameConfirmed('false');
    setSteps(initSteps);
    setState([
      {
        name: null,
        processes: []
      }
    ]
    );
    setprocessData({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
    setprocess1({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
    setprocess2({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
    setprocess3({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
    setprocess4({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });

  };

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>

      <div>
        {errMsg !== "" ?
          <Alert severity="error" onClose={() => { seterrMsg("") }}>
            <AlertTitle>Error</AlertTitle>
            <strong>{errMsg}</strong>
          </Alert> : null}
        {succMsg !== "" ?
          <Alert severity="success" onClose={() => { setsuccMsg("") }}>
            <AlertTitle>Success</AlertTitle>
            <strong>{succMsg}</strong>
          </Alert> : null}
        {bcreatePipeline === 'true' ? (
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

                {activeStep === 0 ? <SimpleCard title="Create a Pipeline"><SimpleForm setPipelinename={setPipelinename} Pipelinename={state[0].name} setbNameConfirmed={setbNameConfirmed} bNameConfirmed={bNameConfirmed} /></SimpleCard> :
                  activeStep === 1 ? <><AddProcess key={'process1'} process={process1} AddProcessData={AddProcessData('processData')} preOptions={preOptions} /> <AddSteps key={"process1Steps"} selsteps={process1.steps} AddProcessData={AddProcessData('stepsData')} preSteps={preSteps} /></>
                    : activeStep === 2 ? <><AddProcess key={'process2'} process={process2} AddProcessData={AddProcessData('processData')} preOptions={preOptions} /> <AddSteps key={"process2Steps"} selsteps={process2.steps} AddProcessData={AddProcessData('stepsData')} preSteps={preSteps} /></>
                      : activeStep === 3 ? <><AddProcess key={'process3'} process={process3} AddProcessData={AddProcessData('processData')} preOptions={preOptions} /> <AddSteps key={"process3Steps"} selsteps={process3.steps} AddProcessData={AddProcessData('stepsData')} preSteps={preSteps} /></>
                        : activeStep === 4 ? <><AddProcess key={'process4'} process={process4} AddProcessData={AddProcessData('processData')} preOptions={preOptions} /> <AddSteps key={"process4Steps"} selsteps={process4.steps} AddProcessData={AddProcessData('stepsData')} preSteps={preSteps} /> </>
                          : <Pipelinetable pipelineData={pipelineData} pipelineName={state[0].name} />}

              </Typography> : <>Loading...</>}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              {activeStep === 0 ?
                null : <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>}
              <Box sx={{ flex: '1 1 auto' }} />
              {/*  <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              <Typography variant="caption" sx={{ display: 'inline-block', color: 'red', mt: '20' }}>
                    Step {activeStep + 1} already completed
                </Typography>*/}

              {activeStep !== totalSteps() - 1 ?
                <>{(activeStep > 1) ?
                  <><Button onClick={handleComplete}>
                    Continue to Add Process
                  </Button><Button onClick={handleFinish}>
                      Finish
                    </Button> </> : <>{(activeStep === totalSteps() - 2) ? <Button onClick={handleFinish}>
                      Finish
                    </Button> : <Button onClick={handleComplete}>
                      Continue to Add Process
                    </Button>}</>} </> : null}
              {activeStep === totalSteps() - 1 && state[0].name != null && state[0].name !== '' && pipelineData[0].processes.length >= 1 ?
                <><Button onClick={handleReset}>
                  Reset
                </Button>
                  <Button onClick={handleFinish}>
                    Finish
                  </Button> </> : <Button onClick={handleReset}>
                  Reset
                </Button>

              }

            </Box>
          </Fragment>
        )}
      </div>
    </Box>
  );
}

export default PlCreate;