import React from "react";
import { Autocomplete, Button, Grid, Icon, styled, Box, Stack } from "@mui/material";
import { H3, Span } from "app/components/Typography";
import { Breadcrumb, SimpleCard } from "app/components";
import AccomodationInner from "./AccomodationInner";
import StepSlider from "../Stepslider/StepSlider";
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

function Accomodation() {
  return (
    <Container>
      <Box className="breadcrumb">
        <StepSlider />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Document">
          <AccomodationInner />
        </SimpleCard>
      </Stack>
    </Container>
  );
}

export default Accomodation;
