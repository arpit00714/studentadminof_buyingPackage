import React from "react";
import { Autocomplete, Button, Grid, Icon, styled, Box, Stack } from "@mui/material";
import { H3, Span } from "app/components/Typography";
import { Breadcrumb, SimpleCard } from "app/components";
import Documentget from "./Documentget";
import StepSlider from "../Stepslider/StepSlider";
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));
function DocumentReview() {
  return (
    <Container>
      <Box className="breadcrumb">
        <StepSlider />
      </Box>
      <Stack spacing={3}>
        <SimpleCard title="Document">
          <Documentget />
        </SimpleCard>
      </Stack>
    </Container>
  );
}

export default DocumentReview;
