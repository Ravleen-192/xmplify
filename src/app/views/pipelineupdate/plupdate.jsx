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

const initSteps = ['Update Pipeline', 'Update Process', 'Update Process', 'Update Process', 'Update Process', 'Review and Update the pipleline'];


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
  const [processData, setprocessData] = useState({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });

  const [process1, setprocess1] = useState({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
  const [process2, setprocess2] = useState({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
  const [process3, setprocess3] = useState({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
  const [process4, setprocess4] = useState({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });

  const [bprocess1Updated, setbprocess1Updated] = useState('false');
  const [bprocess2Updated, setbprocess2Updated] = useState('false');
  const [bprocess3Updated, setbprocess3Updated] = useState('false');
  const [bprocess4Updated, setbprocess4Updated] = useState('false');
  const [bsteps1Updated, setbsteps1Updated] = useState('false');
  const [bsteps2Updated, setbsteps2Updated] = useState('false');
  const [bsteps3Updated, setbsteps3Updated] = useState('false');
  const [bsteps4Updated, setbsteps4Updated] = useState('false');
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
        // Increment the clicked counter
        c = name;
      }
      return c;
    });
    console.log("nextLabels", nextLabels)
    setSteps(nextLabels);
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
  /*
    useEffect(() => {
      if ((state[0].name != null || state[0].name !== ''))
        changeStepLabel(0, state[0].name);
    }, [state], [state[0].name]);
  
    useEffect(() => {
      if ((pipeline.product.processes[0].name != null || pipeline.product.processes[0].name !== ''))
        changeStepLabel(1, pipeline.product.processes[0].name);
    }, [pipeline.product.processes[0].name]);
  
    useEffect(() => {
      if ((pipeline.product.processes[1].name != null || pipeline.product.processes[1].name !== ''))
        changeStepLabel(2, pipeline.product.processes[1].name);
    }, [pipeline.product.processes[1].name]);
  
    useEffect(() => {
      if ((pipeline.product.processes[2].name != null || pipeline.product.processes[2].name !== ''))
        changeStepLabel(3, pipeline.product.processes[2].name);
    }, [pipeline.product.processes[2].name]);
  
    useEffect(() => {
      if ((pipeline.product.processes[3].name != null || pipeline.product.processes[3].name !== ''))
        changeStepLabel(4, pipeline.product.processes[3].name);
    }, [pipeline.product.processes[3].name]);
  */

  useEffect(() => {
    for (var i = 0; i < pipeline.product.processes.length; i++) {

      switch (i) {

        case 0: setprocess1(pipeline.product.processes[0]);
          console.log("process1", pipeline.product.processes[0]);
          break;
        case 1: setprocess2(pipeline.product.processes[1]);
          console.log("process1", pipeline.product.processes[1])
          break;
        case 2:
          setprocess3(pipeline.product.processes[2]);
          console.log("process1", pipeline.product.processes[2])
          break;
        case 3:
          setprocess4(pipeline.product.processes[3]);
          break;
        default:
          break;
      }

    }
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

  /////////////
  const updateProcesses = () => {
    console.log("updateProcesses")
    console.log(process1)
    console.log(bsteps1Updated)
    console.log(bprocess1Updated)

    if (bsteps1Updated === 'false' && bprocess1Updated === 'false') { setprocessData(process1); AddtoPipeline(); setbsteps1Updated('true'); setbprocess1Updated('true') }
    if (bsteps2Updated === 'false' && bprocess2Updated === 'false') { setprocessData(process2); AddtoPipeline(); setbsteps2Updated('true'); setbprocess2Updated('true') }
    if (bsteps3Updated === 'false' && bprocess3Updated === 'false') { setprocessData(process3); AddtoPipeline(); setbsteps3Updated('true'); setbprocess3Updated('true') }
    if (bsteps4Updated === 'false' && bprocess4Updated === 'false') { setprocessData(process4); AddtoPipeline(); setbsteps4Updated('true'); setbprocess4Updated('true') }

    //////////////////
    if (bsteps1Updated === 'false' && bprocess1Updated === 'true') {
      let data = { ...processData };
      data.steps = process1.steps;
      setbsteps1Updated('true');
      console.log("data", data)
      setprocessData(data)
      AddtoPipeline();
    }
    else if (bsteps1Updated === 'true' && bprocess1Updated === 'false') {
      let data = { ...processData };
      data.processtemplateid = `${process1.processtemplateid}`;
      data.name = process1.name;
      data.icon = process1.icon;
      data.status = process1.status;
      setbprocess1Updated('true');
      console.log("data", data)
      setprocessData(data)
      AddtoPipeline();
    }
    /////////
    if (bsteps2Updated === 'false' && bprocess2Updated === 'true') {
      let data = { ...processData };
      data.steps = process2.steps;
      setbsteps2Updated('true');
      console.log("data", data)
      setprocessData(data)
      AddtoPipeline();
    }
    else if (bsteps2Updated === 'true' && bprocess2Updated === 'false') {
      let data = { ...processData };
      data.processtemplateid = `${process2.processtemplateid}`;
      data.name = process2.name;
      data.icon = process2.icon;
      data.status = process2.status;
      setbprocess2Updated('true');
      console.log("data", data)
      setprocessData(data)
      AddtoPipeline();
    }
    /////////////////////
    if (bsteps3Updated === 'false' && bprocess3Updated === 'true') {
      let data = { ...processData };
      data.steps = process3.steps;
      setbsteps3Updated('true');
      console.log("data", data)
      setprocessData(data)
      AddtoPipeline();
    }
    else if (bsteps3Updated === 'true' && bprocess3Updated === 'false') {
      let data = { ...processData };
      data.processtemplateid = `${process3.processtemplateid}`;
      data.name = process3.name;
      data.icon = process3.icon;
      data.status = process3.status;
      setbprocess3Updated('true');
      console.log("data", data)
      setprocessData(data)
      AddtoPipeline();
    }
    //////////////////
    if (bsteps4Updated === 'false' && bprocess4Updated === 'true') {
      let data = { ...processData };
      data.steps = process4.steps;
      setbsteps4Updated('true');
      console.log("data", data)
      setprocessData(data)
      AddtoPipeline();
    }
    else if (bsteps4Updated === 'true' && bprocess4Updated === 'false') {
      let data = { ...processData };
      data.processtemplateid = `${process4.processtemplateid}`;
      data.name = process4.name;
      data.icon = process4.icon;
      data.status = process4.status;
      setbprocess4Updated('true');
      console.log("data", data)
      setprocessData(data)
      AddtoPipeline();
    }
  }
  ///////////
  const AddtoPipeline = () => {

    setState((prev) => [
      ...prev.filter((a, i) => i !== 0),
      { ...prev[0], processes: [...prev[0].processes, { processtemplateid: processData.processtemplateid, name: processData.name, icon: processData.icon, status: processData.status, steps: processData.steps }] }
    ]);
  };
  const LoadProcessData = () => {

    if (activeStep === 1) { console.log("LoadProcessData1"); setprocessData(process1) }
    else if (activeStep === 2) { console.log("LoadProcessData2"); setprocessData(process2) }
    else if (activeStep === 3) { setprocessData(process3) }
    else if (activeStep === 4) { setprocessData(process4) }
  };

  const AddProcessData = (field) => (event, value, selectedKey) => {

    let data = { ...processData };
    if (selectedKey === 'processData') {
      if (event) {
        console.log("AddProcessData", event)
        data.processtemplateid = `${event.processtemplateid}`;
        data.name = event.name;
        data.icon = event.icon;
        data.status = event.status;
        if (activeStep === 1) { setprocess1(data); setbprocess1Updated('true') }
        else if (activeStep === 2) { setprocess2(data); setbprocess1Updated('true') }
        else if (activeStep === 3) { setprocess3(data); setbprocess1Updated('true') }
        else if (activeStep === 4) { setprocess4(data); setbprocess1Updated('true') }
      }
    }
    else if (selectedKey === 'stepsData')
      if (event) {
        console.log("AddProcessData stepsData", event)
        data.steps = event;
        if (activeStep === 1) { setprocess1(data); setbsteps1Updated('true') }
        else if (activeStep === 2) { setprocess2(data); setbsteps2Updated('true') }
        else if (activeStep === 3) { setprocess3(data); setbsteps3Updated('true') }
        else if (activeStep === 4) { setprocess4(data); setbsteps4Updated('true') }
      }

    setprocessData(data)

  };


  useEffect(() => {
    console.log("jPipelineData", jPipelineData);
  }, [bupdatePipeline]);

  const updatePipelines = async (jPipelineData) => {
    console.log("updatePipelines")
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
    console.log("bupdatePipeline", bupdatePipeline)
  }, [bupdatePipeline]);


  const updatePipeline = () => {
    updateProcesses();
    ///////////////////////////
    setbupdatePipeline('true');
  };
  useEffect(() => {

  }, [processData]);
  //////////////////////////////////////////
  useEffect(() => {

    setpipelineData(state);

    console.log("state ", state);
  }, [state]);

  useEffect(() => {
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
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
    setActiveStep(step);
  };
  const handleFinish = () => {
    // if (completedSteps() === totalSteps()) {
    if (state[0].name != null && state[0].name !== '' && pipelineData[0].processes.length >= 1)
      updatePipeline();
    else seterrMsg("Please Add Pipeline Name and atleast Add/Update one process to update a pipeline.")


  };
  const handleComplete = () => {
    const newCompleted = completed;
    console.log("HandleComplete state[0].name", state)


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
    console.log(product)
    setActiveStep(0);
    setActiveProcess(null);
    setbupdatePipeline('false');
    setpipelineData(null);
    setpUid('');
    setbNameConfirmed('false');
    setJpipelineData("");
    setCompleted({});
    setSteps(initSteps);
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
    setprocess1({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
    setprocess2({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
    setprocess3({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
    setprocess4({ processtemplateid: '', name: '', icon: '', status: '', steps: [] });
  };
  console.log(process1);
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

                {activeStep === 0 ? <SimpleCard title="Update the Pipeline"><SimpleForm setPipelinename={setPipelinename} Pipelinename={state[0].name} setbNameConfirmed={setbNameConfirmed} bNameConfirmed={bNameConfirmed} /></SimpleCard> :
                  activeStep === 1 ? <><AddProcess key={'process1'} LoadProcessData={LoadProcessData} process={process1} AddProcessData={AddProcessData('processData')} preOptions={preOptions} /> <AddSteps key={"process1Steps"} selsteps={process1.steps} AddProcessData={AddProcessData('stepsData')} preSteps={preSteps} /></>
                    : activeStep === 2 ? <><AddProcess key={'process2'} LoadProcessData={LoadProcessData} process={process2} AddProcessData={AddProcessData('processData')} preOptions={preOptions} /> <AddSteps key={"process2Steps"} selsteps={process2.steps} AddProcessData={AddProcessData('stepsData')} preSteps={preSteps} /></>
                      : activeStep === 3 ? <><AddProcess key={'process3'} LoadProcessData={LoadProcessData} process={process3} AddProcessData={AddProcessData('processData')} preOptions={preOptions} /> <AddSteps key={"process3Steps"} selsteps={process3.steps} AddProcessData={AddProcessData('stepsData')} preSteps={preSteps} /></>
                        : activeStep === 4 ? <><AddProcess key={'process4'} LoadProcessData={LoadProcessData} process={process4} AddProcessData={AddProcessData('processData')} preOptions={preOptions} /> <AddSteps key={"process4Steps"} selsteps={process4.steps} AddProcessData={AddProcessData('stepsData')} preSteps={preSteps} /> </>
                          : <Pipelinetable pipelineData={pipelineData} pipelineID={pUid} Pipelinename={state[0].name} />}

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
                    Continue to Update/Add Process
                  </Button><Button onClick={handleFinish}>
                      Finish
                    </Button> </> : <>{(activeStep === totalSteps() - 2) ? <Button onClick={handleFinish}>
                      Finish
                    </Button> : <Button onClick={handleComplete}>
                      Continue to Update/Add Process
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

export default PlUpdate;