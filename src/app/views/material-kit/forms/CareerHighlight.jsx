import { Autocomplete, Button, Grid, Icon, styled, Box, Stack } from "@mui/material";
import { H3, Span } from "app/components/Typography";
import { Breadcrumb, SimpleCard } from "app/components";
import SimpleForm from "./SimpleForm";
import StepperForm from "./StepperForm";
import Academicdetails from "./Academicdetails";
import Ugexams from "./Ugexams";
import { pgform } from "Apis/Persnoldetailsform";
import { useEffect } from "react";
import { useState } from "react";
import Persnoldetailspre from "./Persnoldetailspre";
import CareerHighlightform from "./CareerHighlightform";
import StepSlider from "../Stepslider/StepSlider";
import CareerHighlightPre from "./CareerHighlightPre";
// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

function CareerHighlight() {
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
          if (foundUser && foundUser.CareerHighLightList) {
            console.log("foundUser", foundUser.CareerHighLightList);
            SetUserData(foundUser?.CareerHighLightList);
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
  }, [userData]);
  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          <StepSlider />
          {/* <Breadcrumb
            routeSegments={[{ name: "Material", path: "/material" }, { name: "Career Highlight" }]}
          /> */}
        </Box>
        <div
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
        </div>
        {editpage && (
          <Stack spacing={3}>
            <SimpleCard >
              <CareerHighlightform userData={formstatus} />
            </SimpleCard>
          </Stack>
        )}
        {!editpage && (
          <Stack>
            <SimpleCard title="Universities And Courses You Desire">
              <CareerHighlightPre userData={userData ? JSON.parse(JSON.parse(userData)) : []} formstatus={formstatus} />
            </SimpleCard>
          </Stack>
        )}
      </Container>
    </div>
  );
}

export default CareerHighlight;
