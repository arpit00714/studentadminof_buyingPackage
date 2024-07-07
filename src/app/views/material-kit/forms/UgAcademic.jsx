import { Autocomplete, Button, Grid, Icon, styled, Box, Stack } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { H3, Span } from "app/components/Typography";
import React from "react";
import SimpleForm from "./SimpleForm";

import AcademicForm from "./AcademicForm";
import UgAcadamicform from "./UgAcadamicform";
import { pgform } from "Apis/Persnoldetailsform";
import { useEffect } from "react";
import { useState } from "react";
import Ugfromedit from "./Ugfromedit";
import StepSlider from "../Stepslider/StepSlider";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));
function UgAcademic() {
  const [userAcademicData, SetUserAcademicData] = useState(null);
  const [editpage, seteditpage] = useState(true);
  const [formstatus, setformstatus] = useState();
  useEffect(() => {
    const getItems = async () => {
      try {
        const uID = localStorage.getItem("userID");
        console.log("userID", uID);
        const resp = await pgform();
        if (resp.status === 200) {
          const data = await resp.json();
          console.log("getstudentuserdata", data?.message);
          const users = Array.isArray(data?.message) ? data?.message : [];
          const foundUser = users.find((item) => item?.userID === uID);
          // console.log("foundUser", foundUser);
          if (foundUser && foundUser.examfromstatus === 1) {
            setformstatus(foundUser.examfromstatus);
          }
          if (foundUser && foundUser.AcademicDetailform) {
            SetUserAcademicData(foundUser?.AcademicDetailform);
            seteditpage(false)
            // SetUserAcademicData(JSON.parse(foundUser?.AcademicDetailform));
            // seteditpage(true);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    getItems();
  }, []);
  // console.log("userAcademicData", JSON.parse(JSON.parse(userAcademicData)));
  return (
    <Container>
      <Box className="breadcrumb">
        <StepSlider />
      </Box>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "20px 0px"
        }}
      >
        {userAcademicData !== null && (
          <Button
            color="primary"
            variant="contained"
            //  onClick={addOrganization}
            onClick={() => {
              seteditpage(true);
            }}
          >
            <Icon>edit</Icon>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Edit</Span>
          </Button>
        )}

        {userAcademicData !== null && (
          <Button
            style={{ marginLeft: "20px" }}
            color="primary"
            variant="contained"
            // onClick={DoneOrganization}
            onClick={() => {
              seteditpage(false);
            }}
          >
            <Icon>preview</Icon>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Preview</Span>
          </Button>
        )}
      </div>
      {editpage && (
        <Stack spacing={3}>
          <UgAcadamicform userData={formstatus} />
        </Stack>
      )}

      {!editpage && (
        <Stack spacing={3}>
          <Ugfromedit userData={userAcademicData ? JSON.parse(JSON.parse(userAcademicData)) : []} />
        </Stack>
      )}

      {/* <Stack spacing={3}>
        {editpage === true ? (
          <UgAcadamicform />
        ) : (
          
        )}
      </Stack> */}
    </Container>
  );
}

export default UgAcademic;
