import { Fragment } from "react";
import { Card, Grid, styled, useTheme } from "@mui/material";
import RowCards from "./shared/RowCards";
import StatCards from "./shared/StatCards";
import Campaigns from "./shared/Campaigns";
import StatCards2 from "./shared/StatCards2";
import DoughnutChart from "./shared/Doughnut";
import UpgradeCard from "./shared/UpgradeCard";
import TopSellingTable from "./shared/TopSellingTable";
import { useState } from "react";
import { useEffect } from "react";
import { app } from "../../../Firebase/firebase";
import { persnoaldetails, pgform } from "Apis/Persnoldetailsform";
import StepSlider from "../material-kit/Stepslider/StepSlider";

// STYLED COMPONENTS
const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" }
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginRight: ".5rem",
  textTransform: "capitalize"
}));

const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary
}));

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "16px",
  textTransform: "capitalize",
  color: theme.palette.text.secondary
}));

export default function Analytics() {
  const { palette } = useTheme();

  const [user, setUser] = useState(null);
  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      // console.log("user");
      setUser(user);
    });
  }, []);
  // console.log("efvdsa", user?._delegate?.uid);
  useEffect(() => {
    const getItems = async () => {
      try {
        const userID = user?._delegate?.uid;
        localStorage.setItem("userID", userID);
        console.log("userID", userID);
        const resp = await pgform();
        if (resp.status === 200) {
          const data = await resp.json();
          console.log("getstudentuserdata", data?.message);
          const users = Array.isArray(data?.message) ? data?.message : [];
          const foundUser = users.find((item) => item?.userID === userID);
          // console.log("foundUser", foundUser);
          if (foundUser) {
            console.log("foundUser", foundUser);
            // User found, handle accordingly
          } else {
            if (userID) {
              console.log("userID", userID);
              const details = await persnoaldetails({
                userID: userID
              });
              console.log("resp", details);
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    getItems();
  }, [user?._delegate?.uid]);
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: "100%" }}>
        <StepSlider />
      </div>
    </div>
  );
}
