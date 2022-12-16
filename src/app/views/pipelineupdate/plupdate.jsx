import { React, useState, useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
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
const updatePipelineURL = "https://3uiqfn8244.execute-api.us-east-1.amazonaws.com/dev/update-pipeline";

const initSteps = ['Update Pipeline', 'Update Process', 'Review and Update the pipleline'];


const PlUpdate = () => {
  const [steps, setSteps] = useState(initSteps);
  const location = useLocation()
  const { product } = location.state.product;
  const [pipeline, setPipeline] = useState({ product });
  const [preOptions, setpreOptions] = useState(null);
  const [preSteps, setpreSteps] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [activeProcess, setActiveProcess] = useState({});
  const [completed, setCompleted] = useState({});
  const [bNameConfirmed, setbNameConfirmed] = useState('true');
  const [bAddStep, setbAddstep] = useState('false');
  const [processData, setprocessData] = useState({ processtemplateid: '', name: '', icon: '', status: '', sequenceid: '', steps: [] });
  const [process, setprocess] = useState([]);
  const [bupdatePipeline, setbupdatePipeline] = useState('false');

  const [pUid, setpUid] = useState('');
  const [jPipelineData, setJpipelineData] = useState("");
  const [errMsg, seterrMsg] = useState("");
  const [succMsg, setsuccMsg] = useState("");
  const [state, setState] = useState([
    {
      id: "",
      name: null,
      processes: []
    }
  ]
  );

  const [pipelineData, setpipelineData] = useState({});
  const changeStepLabel = (index, name) => {
    const nextLabels = steps.map((c, i) => {
      if (i === index) {

        c = name;
      }
      return c;
    });
    //console.log("nextLabels", nextLabels)
    setSteps(nextLabels);
  };
  const setPipelinename = (value) => {
    // console.log("set pipeline name called")
    setState((prev) => [
      ...prev.filter((a, i) => i !== 0),
      { ...prev[0], name: value }
    ]);
  };
  useEffect(() => {
    // console.log("state[0].name", state[0].name)
  }, [state], [state[0].name]);

  useEffect(() => {
    // console.log("steps", steps)
  }, [steps]);

  const initializeProcesses = () => {
    const newsteps = [...initSteps];
    for (var i = 0; i <= pipeline.product.processes.length; i++) {
      if (i === 0) {
        newsteps[i] = pipeline.product.name;
      }
      if (i !== 0) {
        newsteps[i] = pipeline.product.processes[i - 1].name;
      }
    }
    newsteps[pipeline.product.processes.length + 1] = "Review and Update Pipeline"
    setSteps(newsteps);
    setprocess(pipeline.product.processes);

  };
  useEffect(() => {

    initializeProcesses();

  }, [pipeline.product], [pipeline.product.processes]);


  /////////////

  const loadPipeline = () => {

    if (pipeline && pipeline.product) {
      setpUid(pipeline.product.id);

      setState((prev) => [
        ...prev.filter((a, i) => i !== 0),
        { ...prev[0], name: pipeline.product.name }
      ]);
      setState((prev) => [
        ...prev.filter((a, i) => i !== 0),
        { ...prev[0], id: pipeline.product.id }
      ]);

    }
  }
  useEffect(() => {
    console.log("pipeline", pipeline)
    loadPipeline();
  }, [pipeline]);

  useEffect(() => {
    axios.post(getPocessURL)
      .then(res => {
        setpreOptions(res.data);

      })

  }, [getPocessURL]);

  useEffect(() => {
    axios.post(getStepsURL)
      .then(result => {
        setpreSteps(result.data);

      })

  }, [getStepsURL]);

  useEffect(() => {

  }, [preOptions]);
  useEffect(() => {

  }, [preSteps]);


  const updateProcesses = () => {


    for (var i = 0; i < process.length; i++) {
      if (process[i].bStepsUpdated === 'false' && process[i].bProcessUpdated === 'false') {
        setprocessData(process[i]);
        AddtoPipeline(i);
        process[i].bStepsUpdated = 'true';
        process[i].bProcessUpdated = 'true';

      }
      else if (process[i].bStepsUpdated === 'false' && process[i].bProcessUpdated === 'true') {
        let data = { ...processData };
        data.steps = process[i].steps;
        process[i].bStepsUpdated = 'true';
        console.log("data", data)
        setprocessData(data)
        AddtoPipeline(i);

      }
      else if (process[i].bStepsUpdated === 'true' && process[i].bProcessUpdated === 'false') {
        let data = { ...processData };
        data.processtemplateid = `${process[i].processtemplateid}`;
        data.name = process[i].name;
        data.icon = process[i].icon;
        data.status = process[i].status;
        data.sequenceid = process[i].sequenceid;
        process[i].bProcessUpdated = 'true';
        console.log("data", data)
        setprocessData(data)
        AddtoPipeline(i);

      }


    }

  }
  const AddtoPipeline = (index) => {
    const newItems = [...process];
    console.log("process and index", process, index);
    if (index >= process.length) {
      setState((prev) => [
        ...prev.filter((a, i) => i !== 0),
        { ...prev[0], processes: [...prev[0].processes, { processtemplateid: processData.processtemplateid, name: processData.name, icon: processData.icon, status: processData.status, steps: processData.steps }] }
      ]);
    }
    else {//update at index
      for (var i = 0; i < process.length; i++) {
        if (i === index)

          newItems[index] = processData;

      }
      console.log("newItems", newItems);
      setState((prev) => [
        ...prev.filter((a, i) => i !== 0),
        { ...prev[0], processes: newItems }
      ]);
    }


    /* */
  };
  const LoadProcessData = () => {
    setprocessData(process[activeStep - 1]);

  };

  const AddProcessData = (field) => (event, value, selectedKey) => {

    console.log(event, value, selectedKey);
    let data = { ...processData };
    if (selectedKey === 'processData') {
      if (event) {

        data.processtemplateid = `${event.processtemplateid}`;
        data.name = event.name;
        data.icon = event.icon;
        data.status = event.status;
        data.bProcessUpdated = 'true';
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
        data.bStepsUpdated = 'true';
      }
    }
    console.log("data", data)
    setprocessData(data)
    setprocessAtIndex(activeStep - 1, data)

  };
  const setprocessAtIndex = (index, data) => {
    const newProcesses = [...process];
    console.log("process", index, process)

    newProcesses[index] = data;
    console.log("newProcesses", index, newProcesses)
    setprocess(newProcesses);

  };
  const setstepLabelAtIndex = (activeStep) => {

    const newsteps = [...steps];
    newsteps[activeStep] = "Update Process";
    newsteps[activeStep + 1] = "Review and Update Pipeline";
    setprocessAtIndex(activeStep - 1, processData);
    setSteps(newsteps);
    setbAddstep('false');
  };
  useEffect(() => {

    console.log("process", process)

  }, [process]);
  useEffect(() => {
  }, [steps]);
  useEffect(() => {
    if (bAddStep === 'true') {
      setstepLabelAtIndex(activeStep);
    }

  }, [bAddStep]);

  useEffect(() => {
    if (activeStep !== 0) {
      setActiveProcess(process[activeStep - 1])
      setprocessData(process[activeStep - 1])
    }

  }, [activeStep]);

  useEffect(() => {

  }, [bupdatePipeline]);

  const updatePipelines = async (jPipelineData) => {

    var requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jPipelineData)
    };

    // var urlstr = 'https://3uiqfn8244.execute-api.us-east-1.amazonaws.com/dev/update-pipeline'
    var url = new URL(updatePipelineURL)
    console.log(JSON.stringify(jPipelineData))

    try {
      fetch(url, requestOptions)
        .then((res) =>
          res.json()
        )
        .then((jPipelineData) => {
          console.log(jPipelineData)

        });
      setsuccMsg("Pipeline Updated!")
    } catch (error) {
      console.log("error", error)
      seterrMsg(error);
    }
  }

  useEffect(() => {
    if (bupdatePipeline === 'true')
      updatePipelines(jPipelineData);

  }, [bupdatePipeline]);


  const updatePipeline = () => {
    updateProcesses();

    setbupdatePipeline('true');
  };
  useEffect(() => {

  }, [processData]);

  useEffect(() => {
    console.log("state", state);
    setpipelineData(state);

  }, [state]);

  useEffect(() => {
    console.log("pipelineData", pipelineData);
    if (pipelineData) {
      var strpipeline = pipelineData[0];
      setJpipelineData(strpipeline);
    }

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

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {

    setActiveStep(step);
  };
  const handleFinish = () => {
    // if (completedSteps() === totalSteps()) {
    if (state[0].name != null && state[0].name !== '' && pipelineData[0].processes.length >= 1)
      updatePipeline();
    else seterrMsg("Please Add Pipeline Name and atleast Add/Update one process to update a pipeline.")


  };
  const handleAddStep = () => {
    console.log("handleAddStep")
    setbAddstep('true');
    handleComplete();

  };
  const handleComplete = () => {
    const newCompleted = completed;
    if (!completed[activeStep]) {
      if (processData && processData.name !== '') {
        AddtoPipeline(activeStep - 1);
      }
      else {
        console.log("AM I HERE")
        updateProcesses();
        AddtoPipeline(activeStep - 1);
      }


      if (activeStep === 0 && (state[0].name != null && state[0].name !== ''))
        changeStepLabel(activeStep, state[0].name);

      else {
        setActiveProcess(process[activeStep - 1]);
        if ((process[activeStep - 1].name != null && process[activeStep - 1].name !== '')) {
          changeStepLabel(activeStep, process[activeStep - 1].name);
        }
      }
      //handleNext();

      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      const newActiveStep =
         /* isLastStep() && !allStepsCompleted()
            ? // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            steps.findIndex((step, i) => !(i in completed))
            : */activeStep + 1;
      setActiveStep(newActiveStep);

      setprocessData({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });

    }
    else
      seterrMsg("Step Already Completed. Reset to update.")
  };

  const handleReset = () => {

    setActiveStep(0);
    setActiveProcess(null);
    setbupdatePipeline('false');
    setpipelineData(null);
    setpUid('');
    setbNameConfirmed('false');
    setJpipelineData("");
    setCompleted({});
    initializeProcesses();
    setPipeline({ product });
    seterrMsg("");
    setsuccMsg("");
    setState([
      {
        name: null,
        processes: []
      }
    ]
    );
    setprocessData({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });

  };

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
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
        {bupdatePipeline === 'true' ? (
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

                {activeStep === 0 ? <SimpleCard title="Update the Pipeline"><SimpleForm setPipelinename={setPipelinename} Pipelinename={state[0].name} setbNameConfirmed={setbNameConfirmed} bNameConfirmed={bNameConfirmed} /></SimpleCard> :
                  activeStep < totalSteps() - 1 ? <><AddProcess key={`${activeStep}`} process={processData} AddProcessData={AddProcessData('processData')} LoadProcessData={LoadProcessData} preOptions={preOptions} /> {(processData && processData.name !== null && processData && processData.name !== '') ? <AddSteps key={`${activeStep}` + 'steps'} selsteps={process[activeStep - 1].steps} AddProcessData={AddProcessData('stepsData')} preSteps={preSteps} /> : null}</>
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
              {(activeStep === totalSteps() - 2) ? <Button onClick={handleAddStep}>
                Add New Process
              </Button> : null}
              {activeStep !== totalSteps() - 1 ?
                <>{activeStep >= 1 ?
                  <><Button onClick={handleComplete}>
                    Complete Step
                  </Button>
                    {(activeStep === 1) ? null
                      :
                      <Button onClick={handleFinish}>
                        Finish
                      </Button>} </>
                  :
                  <>
                    {(activeStep === totalSteps() - 2) ?
                      <Button onClick={handleFinish}>
                        Finish
                      </Button>
                      :
                      <Button onClick={handleComplete}>
                        Update Process
                      </Button>}</>} </>
                : null}
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

export default PlUpdate;