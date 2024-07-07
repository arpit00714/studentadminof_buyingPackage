import React from "react";
import { Autocomplete, Button, Grid, Icon, styled, Box, Stack } from "@mui/material";
import { H3, Span } from "app/components/Typography";
import { Breadcrumb, SimpleCard } from "app/components";
import ApplicationStatusInner from "./ApplicationStatusInner";
import StepSlider from "../Stepslider/StepSlider";
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

function ApplicationStatus() {
  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          <StepSlider />
        </Box>

        <Stack spacing={3}>
          <SimpleCard title="Document">
            <ApplicationStatusInner />
          </SimpleCard>
        </Stack>
      </Container>
    </div>
  );
}

export default ApplicationStatus;
