import React from "react";
import { Button, Icon, styled, Box, Stack } from "@mui/material";
import { Span } from "app/components/Typography";
import { SimpleCard } from "app/components";
import { pgform } from "Apis/Persnoldetailsform";
import { useEffect } from "react";
import { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CompatativeForm from "./CompatativeForm";
import CompatativePreviewpg from "./CompatativePreviewpg";
import StepSlider from "../Stepslider/StepSlider";
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

function CompatativeExam() {
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
          if (foundUser && foundUser.examfromstatus === 1) {
            setformstatus(foundUser.examfromstatus);
          }
          if (foundUser && foundUser.CompatativeExam) {
            console.log("foundUser", foundUser);
            SetUserData(foundUser?.CompatativeExam);
            seteditpage(false)
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

  return (
    <div>
       <div style={{ border:"2px solid #00000080",padding:"20px",marginBottom:"20px"}}>
      <Container>
        <Box className="breadcrumb">
          <StepSlider />
        </Box>
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
              startIcon={<ArrowBackIcon />}
            >

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
        {editpage && (
          <Stack spacing={3}>

            <CompatativeForm userData={formstatus} />
          </Stack>
        )}
        {!editpage && (
          <Stack spacing={3}>
            <SimpleCard title="Compitative Exam">
              <CompatativePreviewpg userData={userData ? JSON.parse(JSON.parse(userData)) : []} formstatus={formstatus} />
            </SimpleCard>
          </Stack>
        )}
        {/* <Stack spacing={3}>
          <SimpleCard title="Compitative Exam ">
            <CompatativeForm />
          </SimpleCard>
        </Stack> */}
      </Container>
      </div>
    </div>
  );
}

export default CompatativeExam;
