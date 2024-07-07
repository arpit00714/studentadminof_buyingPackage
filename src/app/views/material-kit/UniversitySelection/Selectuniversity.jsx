import React from "react";
import { Autocomplete, Button, Grid, Icon, styled, Box, Stack } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import SelectUniversityform from "./SelectUniversityform";
import StepSlider from "../Stepslider/StepSlider";
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

function Selectuniversity() {
  return (
    <div>
      <Container>
        <StepSlider />
        <Box className="breadcrumb">
          {/* <Breadcrumb
            routeSegments={[
              //   { name: "UNIVERSITY SELECTION", path: "/material" },
              { name: "SELECT UNIVERSITY" }
            ]}
          /> */}
        </Box>
        <Stack spacing={3}>
          <SelectUniversityform />
        </Stack>
      </Container>
    </div>
  );
}

export default Selectuniversity;
