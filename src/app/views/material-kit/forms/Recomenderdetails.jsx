import { Autocomplete, Button, Grid, Icon, styled, Box, Stack } from "@mui/material";
import { H3, Span } from "app/components/Typography";
import { Breadcrumb, SimpleCard } from "app/components";
import React from "react";
import Recomendedform from "./Recomendedform";
import { useState } from "react";
import { useEffect } from "react";
import { pgform } from "Apis/Persnoldetailsform";
import Recemonderpre from "./Recemonderpre";
import StepSlider from "../Stepslider/StepSlider";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

function Recomenderdetails() {
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
          if (foundUser && foundUser.recemonderform) {
            console.log("foundUser", foundUser);

            SetUserData(foundUser?.recemonderform);
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
          >
            <Icon>edit</Icon>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Edit</Span>
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
          <SimpleCard title="Recommender Details">
            <Recomendedform userData={formstatus} />
          </SimpleCard>
        </Stack>
      )}
      {!editpage && (
        <Stack spacing={3}>
          <SimpleCard title="Recommender Details">
            <Recemonderpre userData={userData ? JSON.parse(JSON.parse(userData)) : []} formstatus={formstatus} />
          </SimpleCard>
        </Stack>
      )}
    </Container>
  );
}

export default Recomenderdetails;
