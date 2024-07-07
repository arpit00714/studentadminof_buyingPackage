import React from "react";
import { Autocomplete, Button, Grid, Icon, styled, Box, Stack } from "@mui/material";
import { H3, Span } from "app/components/Typography";
import { Breadcrumb, SimpleCard } from "app/components";
import VisaIneer from "./VisaIneer";
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

function Visa() {
  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[{ name: "Select Document", path: "/material" }, { name: "Document" }]}
          />
        </Box>

        <Stack spacing={3}>
          <SimpleCard title="Document">
            <VisaIneer />
          </SimpleCard>
        </Stack>
      </Container>
    </div>
  );
}

export default Visa;
