
import { Breadcrumb, SimpleCard } from "app/components";
import { H3, Span } from "app/components/Typography";
import React from "react";
import SimpleForm from "./SimpleForm";
import AcademicForm from "./AcademicForm";
import { Autocomplete, Button, Grid, Icon, styled, Box, Stack } from "@mui/material";
import StepSlider from "../Stepslider/StepSlider";
import { useState } from "react";
import { pgform, studentData } from "Apis/Persnoldetailsform";
import { useEffect } from "react";
import Ugfromedit from "./Ugfromedit";
import Acadmeicfromedit from "./Acadmeicfromedit";
import UgAcademic from "./UgAcademic";
const userID = localStorage.getItem("userID");
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));
function Academicdetails() {
  const [examType, setExamType] = useState();
  const [userData, SetUserData] = useState(null);
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
            console.log("foundUser", foundUser);
            SetUserData(foundUser?.AcademicDetailform);
            // seteditpage(false)
            // SetUserAcademicData(JSON.parse(foundUser?.AcademicDetailform));
            // seteditpage(true);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    console.log("userAcademicData", userData);
    getItems();
  }, [userData]);

  useEffect(() => {
    const check = async () => {
      const resp = await studentData(userID);
      if (resp?.status === 200) {
        const data = await resp.json();
        console.log("dstudentDataata", data);
        const examtype = data.message[0]?.examtype;
        setExamType(examtype);
      };
    }
    check();
  })
  return (
    <Container>
      <Box className="breadcrumb">
        <StepSlider />
        {/* <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Form" }]} /> */}
      </Box>

      {/* <Stack spacing={3}>
        <SimpleCard title="Academic Detail">
          <AcademicForm />
        </SimpleCard>

      </Stack> */}

      {/* <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "20px 0px"
        }}
      >
        {userData !== null && (
          <Button
            color="primary"
            variant="contained"
            //  onClick={addOrganization}
            onClick={() => {
              seteditpage(true);
            }}
          >
            <Icon>edit</Icon>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Back</Span>
          </Button>
        )}

        {userData !== null && (
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
      </div> */}
      {console.log("examType", examType)}
      {editpage && (
        <Stack spacing={3}>
          <SimpleCard title="Personnel Detail">
            {examType === "Ug" ? <UgAcademic /> : <AcademicForm userData={formstatus} />}

          </SimpleCard>
        </Stack>
      )}
      {!editpage && (
        <Stack>
          <SimpleCard title="Universities And Courses You Desire">
            <Acadmeicfromedit userData={userData ? JSON.parse(JSON.parse(userData)) : []} formstatus={formstatus} />
          </SimpleCard>
        </Stack>
      )}
      {examType === "Ug"}
    </Container>
  );
}

export default Academicdetails;
