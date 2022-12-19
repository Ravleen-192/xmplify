
import { Stack } from "@mui/material";
import { styled } from "@mui/system";
import { SimpleCard } from "app/components";

import StepperForm from "./shared/NPStepperForm";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));


const Pladdnp = () => {
 
  return (
    <Container>

      <Stack spacing={3}>

        <SimpleCard title="Create a Process">
          <StepperForm />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default Pladdnp;
