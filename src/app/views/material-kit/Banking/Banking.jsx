import React from "react";
import { Autocomplete, Button, Grid, Icon, styled, Box, Stack } from "@mui/material";
import { H3, Span } from "app/components/Typography";
import { Breadcrumb, SimpleCard } from "app/components";
import Bankinginner from "./Bankinginner";
import StepSlider from "../Stepslider/StepSlider";
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));
function Banking() {
  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          {/* <Breadcrumb
            routeSegments={[{ name: "Select Document", path: "/material" }, { name: "Document" }]}
          /> */}
          <StepSlider />
        </Box>

        <Stack spacing={3}>
          {/* <SimpleCard>
          </SimpleCard> */}
          <Bankinginner />
        </Stack>
      </Container>
    </div>
  );
}

export default Banking;
