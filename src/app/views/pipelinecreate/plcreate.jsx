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
const initSteps = ['Create Pipeline', 'Add Process', 'Review and Create a pipleline'];

const PlCreate = () => {
  const [steps, setSteps] = useState(initSteps);
  const [preOptions, setpreOptions] = useState(null);
  const [preSteps, setpreSteps] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [activeProcess, setActiveProcess] = useState({});
  const [completed, setCompleted] = useState({});
  const [bNameConfirmed, setbNameConfirmed] = useState('false');
  const [bAddStep, setbAddstep] = useState('false');
  const [processData, setprocessData] = useState({ processtemplateid: '', name: '', icon: '', status: '', sequenceid: '', steps: [] });
  const [process, setprocess] = useState([]);
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

  const AddProcessData = (field) => (event, value, selectedKey) => {
    console.log(event, value, selectedKey);
    let data = { ...processData };
    if (selectedKey === 'processData') {
      if (event) {

        data.processtemplateid = `${event.processtemplateid}`;
        data.name = event.name;
        data.icon = event.icon;
        data.status = event.status;
      }
    }
    else if (selectedKey === 'processSeq') {
      if (event) {
        data.sequenceid = `${event}`;
      }
    }
    else if (selectedKey === 'stepsData') {
      if (event) {
        data.steps = event;
      }
    }
    console.log("data", data)
    setprocessData(data)
    setprocessAtIndex(activeStep, data)

  };
  const setprocessAtIndex = (activeStep, data) => {
    const newProcesses = [...process];

    newProcesses[activeStep - 1] = data;

    setprocess(newProcesses);

  };
  const setstepLabelAtIndex = (activeStep) => {
    const newsteps = [...steps];

    newsteps[activeStep] = "Add Process";
    newsteps[activeStep + 1] = "Review and Create Pipeline";
    console.log("setstepLabelAtIndex", newsteps)
    setprocessAtIndex(activeStep, processData);

    setSteps(newsteps);
    setbAddstep('false');

  };
  useEffect(() => {

    console.log("%%%%%%%%%%%%%%%process", process)

  }, [process]);
  useEffect(() => {

    console.log("%%%%%%%%%%%%%%%steps", steps)

  }, [steps]);
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
  useEffect(() => {
    if (bAddStep === 'true') {
      setstepLabelAtIndex(activeStep);
    }

    console.log("pipelineData ", pipelineData);

  }, [bAddStep]);

  useEffect(() => {
    if (activeStep !== 0) {
      setActiveProcess(process[activeStep - 1])
      setprocessData(process[activeStep - 1])
    }
    console.log("activeStep ", activeStep);
  }, [activeStep]);
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
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  };

  const handleStep = (step) => () => {
    setActiveStep(step);

  };
  const handleFinish = () => {

    if (state[0].name != null && state[0].name !== '' && pipelineData[0].processes.length >= 1)
      createPipeline();
    else seterrMsg("Please add Pipeline Name and atleast one process to create a pipeline.")

  };
  const handleAddStep = () => {
    console.log("handleAddStep")
    setbAddstep('true');
    handleComplete();

  };
  const handleComplete = () => {
    const newCompleted = completed;
    console.log("HandleComplete state[0].name", state[0].name)
    if (!completed[activeStep]) {
      if (processData.name !== '')
        AddtoPipeline();
      if (activeStep === 0 && (state[0].name != null && state[0].name !== ''))
        changeStepLabel(activeStep, state[0].name);
      else {
        setActiveProcess(process[activeStep - 1]);
        if ((process[activeStep - 1].name != null && process[activeStep - 1].name !== '')) {
          changeStepLabel(activeStep, process[activeStep - 1].name);
        }
      }
      //handleNext();
      console.log("activestep", activeStep)
      console.log("total steps", totalSteps())
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      const newActiveStep =
     /* isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : */activeStep + 1;
      setActiveStep(newActiveStep);
      console.log("activestep", newActiveStep)
      console.log("total steps", totalSteps())
      setprocessData({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
    }
    else
      seterrMsg("Step Already Completed. Reset to update.")
  };


  const handleReset = () => {
    setSteps({});
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
    seterrMsg("");
    setsuccMsg("");
    setprocessData({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
    setprocess([{ processtemplateid: '', name: '', icon: '', status: '', steps: [] }]);

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
          <Alert severity="error" onClose={() => { seterrMsg(""); handleReset(); }}>
            <AlertTitle>Error</AlertTitle>
            <strong>{errMsg}</strong>
          </Alert> : null}
        {succMsg !== "" ?
          <Alert severity="success" onClose={() => { setsuccMsg(""); handleReset(); }}>
            <AlertTitle>Success</AlertTitle>
            <strong>{succMsg}</strong>
          </Alert> : null}
        {bcreatePipeline === 'true' ? (
          <Fragment>
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
                  activeStep < totalSteps() - 1 ? <><AddProcess key={`${activeStep}`} process={processData} AddProcessData={AddProcessData('processData')} preOptions={preOptions} /> {(processData && processData.name !== null && processData && processData.name !== '') ? <AddSteps key={`${activeStep}` + 'steps'} selsteps={process[activeStep - 1].steps} AddProcessData={AddProcessData('stepsData')} preSteps={preSteps} /> : null}</>
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
              {activeStep !== totalSteps() - 1 ?
                <>{(activeStep >= 1) ?
                  <><Button onClick={handleAddStep}>
                    Continue to Add Process
                  </Button><Button onClick={handleComplete}>
                      Complete Step
                    </Button>{(activeStep === 1) ? null : <Button onClick={handleFinish}>
                      Finish
                    </Button>} </> : <>{(activeStep === totalSteps() - 2) ? <Button onClick={handleFinish}>
                      Finish
                    </Button> : <Button onClick={handleComplete}>
                      Add Process
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