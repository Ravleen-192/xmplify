import { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack } from "@mui/material";
import { styled } from "@mui/system";
import { SimpleCard } from "app/components";

import StepperForm from "./shared/NSStepperForm";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const baseURL = "https://3uiqfn8244.execute-api.us-east-1.amazonaws.com/dev/get-all-pipelines";

const Pladdns = () => {
  const [result, setResult] = useState(null);
  useEffect(() => {
    axios.post(baseURL, requestOptions)
      .then(res => {
        setResult(res.data);
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
        console.log(res.data);
      })
      .then(err => {
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
        console.log(err);
      })
    // .then(response => response.json())
    // .then(data => this.setState({ postId: data.id }));
  }, []);
  useEffect(() => {

    // .then(response => response.json())
    // .then(data => this.setState({ postId: data.id }));
  }, [result]);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'React POST Request Example' })
  };
  return (
    <Container>

      <Stack spacing={3}>

        <SimpleCard title="Create a Process Step">
          <StepperForm />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default Pladdns;
