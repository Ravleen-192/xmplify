import { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import React from "react";
import NPSimpleForm from './NPSimpleForm';
import NPStatCards from './NPStatCards';
import ReviewCard from './NPRowCards';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const baseURL = "";

function getSteps() {
  return ["Create a new process", "Select Adornments", "Review and Create"];
}

export default function StepperForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [bNameConfirmed, setbNameConfirmed] = useState('false');
  const [Processname, setProcessname] = useState(null);
  const [processData, setprocessData] = useState({ processtemplateid: '', name: '', desc: '', icon: '', status: '', sequenceid: '' });
  const [bcreateProcess, setbcreateProcess] = useState('false');
  const [jProcessData, setJprocessData] = useState("");
  const [errMsg, seterrMsg] = useState("");
  const [succMsg, setsuccMsg] = useState("");

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <NPSimpleForm setProcessnamedesc={setProcessnamedesc} setbNameConfirmed={setbNameConfirmed} bNameConfirmed={bNameConfirmed} />;

      case 1:
        return <NPStatCards process={processData} AddProcessData={AddProcessData} />;

      case 2:
        return <ReviewCard process={processData} />;

      default:
        return `Aenean arcu ligula, porttitor id neque imperdiet, congue convallis erat. Integer libero sapien, convallis a vulputate vel, pretium vulputate metus. Donec leo justo, viverra ut tempor commodo, laoreet eu velit. Donec vel sem quis velit pharetra elementum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam in commodo mauris. Ut iaculis ipsum velit.`;
    }
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

  };
  const setProcessnamedesc = (name, desc) => {
    setprocessData((prev) => [
      ...prev.filter((a, i) => i !== 0),
      { ...prev[0], name: name, desc: desc }
    ]);

  };
  const createProcesses = async (jProcessData) => {
    console.log("createProcess jProcessData", JSON.stringify(jProcessData))
    var requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jProcessData)
    };

    var url = new URL(baseURL)

    try {
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((jProcessData) => {
          console.log(jProcessData)

        });
      setsuccMsg("Process Created!")
    } catch (error) {
      console.log("error", error)
      seterrMsg(error);
    }
  }
  useEffect(() => {
    if (bcreateProcess === 'true')
      createProcess(jProcessData);
    console.log("bcreateProcess", bcreateProcess)
  }, [bcreateProcess]);

  const createProcess = () => {
    setbcreateProcess('true');
  };

  useEffect(() => {
    if (processData) {
      var strpipeline = processData[0];
      setJprocessData(strpipeline);
    }
    console.log("processData ", processData);

  }, [processData]);
  const steps = getSteps();

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleFinish = () => {
    if (processData.name != null && processData.name !== '') {
      createProcess();
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    else seterrMsg("Please add Process name to create a process.");
  }

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => setActiveStep(0);

  return (
    <Box>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
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
        <Box mt={4}>
          {activeStep === steps.length ? (
            <Box>
              <Typography>All steps completed</Typography>

              <Button sx={{ mt: 2 }} variant="contained" color="secondary" onClick={handleReset}>
                Reset
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography>{getStepContent(activeStep)}</Typography>

              <Box pt={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  Back
                </Button>

                <Button sx={{ ml: 2 }} variant="contained" color="primary" onClick={activeStep === steps.length - 1 ? { handleFinish } : { handleNext }}>
                  {activeStep === steps.length - 1 ? "Approve" : "Next"}
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </div>
    </Box>

  );
}
