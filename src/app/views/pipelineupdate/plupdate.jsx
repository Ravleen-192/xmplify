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
    const newsteps = [...steps];
    for (var i = 0; i <= pipeline.product.processes.length; i++) {
      if (i !== 0) {
        newsteps[i] = pipeline.product.processes[i - 1].name;
      }
    }
    newsteps[pipeline.product.processes.length + 1] = "Review and Update Pipeline"
    setSteps(newsteps);
    setprocess(pipeline.product.processes);
    console.log("CCCCCCCCCCCCCCCCCCCpipeline.product.processes[i]", i, pipeline.product.processes[i]);

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
  /*
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
  }*/
  ///////////
  const AddtoPipeline = () => {

    setState((prev) => [
      ...prev.filter((a, i) => i !== 0),
      { ...prev[0], processes: [...prev[0].processes, { processtemplateid: processData.processtemplateid, name: processData.name, icon: processData.icon, status: processData.status, steps: processData.steps }] }
    ]);
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
        data.bprocessUpdated = 'true';
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
    console.log("setstepLabelAtIndex", newsteps)

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
    //updateProcesses();
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
    console.log("HandleComplete state[0].name", state)


    if (processData && processData.name !== '')
      AddtoPipeline();

    if (!completed[activeStep]) {
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
    setprocess([{ processtemplateid: '', name: '', icon: '', status: '', steps: [] }]);
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
              {activeStep !== totalSteps() - 1 ?
                <>{(activeStep >= 1) ?
                  <><Button onClick={handleAddStep}>
                    Continue to Update/Add Process
                  </Button><Button onClick={handleComplete}>
                      Complete Step
                    </Button><Button onClick={handleFinish}>
                      Finish
                    </Button> </> : <>{(activeStep === totalSteps() - 2) ? <Button onClick={handleFinish}>
                      Finish
                    </Button> : <Button onClick={handleComplete}>
                      Update/Add Process
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