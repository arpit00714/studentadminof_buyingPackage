import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Autocomplete, Button, Grid, styled } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Icon from "@mui/material/Icon";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { H3, Span } from "app/components/Typography";
import { useEffect } from "react";
import apiUrl from "URLS/ApiUrl";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
function AccomodationInner() {
  const [open, setOpen] = useState(false);
  const [AddConsultancyId, setAddConsultancyId] = useState();
  const [accomadationList, setAccomodationList] = useState([]);
  const [dialogdetails, setDialogDetails] = useState("");
  const handleContact = () => {};
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    const getDocs = async () => {
      try {
        const response = `${apiUrl}/api/studentconsultancy/getstudentconsultancy/${userID}`;
        const resp = await fetch(response);
        if (resp.status === 200) {
          const data = await resp.json();
          console.log("accomodationListdata,", data);
          setAddConsultancyId(data.message[0].AddConsultancyId);
        }
      } catch (err) {
        console.log("err", err);
      }
    };
    getDocs();
  }, [userID]);

  useEffect(() => {
    const getDocs = async () => {
      try {
        const response = `${apiUrl}/api/accomodation/getAllAccomodationbyconsultancyId/${AddConsultancyId}`;
        const resp = await fetch(response);
        if (resp.status === 200) {
          const data = await resp.json();
          console.log("getAllAccomodationbyconsultancyId,", data);
          setAccomodationList(data.message);
        }
      } catch (err) {
        console.log("err", err);
      }
    };
    getDocs();
  }, [AddConsultancyId]);

  const handleClose = async () => {
    setOpen(false);
  };
  console.log("accomadationList", accomadationList);
  return (
    <div style={{ width: "100%", margin: "auto" }}>
      {accomadationList?.map((item, key) => {
        return (
          <Card key={key} style={{ margin: "15px 0px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  height: "100px",
                  width: "90%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0px 10px",
                  margin: "auto"
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={`${apiUrl}/api/${item.logo}`}
                  sx={{ width: 56, height: 56 }}
                />
                <H3>{item.name}</H3>
                <div>
                  <Button
                    onClick={() => {
                      setDialogDetails(item.details);
                      console.log("item", item);
                      setOpen(true);
                    }}
                    variant="contained"
                  >
                    Details
                  </Button>
                </div>
                <div>
                  <Button variant="contained">Contact</Button>
                </div>
              </Box>
            </div>
          </Card>
        );
      })}
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Submit"}</DialogTitle>
        <DialogContent>{dialogdetails}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AccomodationInner;
