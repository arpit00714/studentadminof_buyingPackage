import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TableHead from "@mui/material/TableHead";
import { Button, Grid, Icon, styled } from "@mui/material";
import { Span } from "app/components/Typography";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import parse from "html-react-parser";
import { useEffect } from "react";
import { StudentDocument, UpdateStudentDocument } from "Apis/Document";
import apiUrl from "URLS/ApiUrl";
import { useState } from "react";
import { filesupload } from "Apis/filesupload";

const ApplicationStatus = [
  {
    universityname: "universityname",
    DocuploadedByAdmin: "DocuploadedByAdmin",
    TODO: "TODO",
    Status: "Status",
    Intake: "Intake ",
    id: 1
  }
];

function ApplicationStatusInner() {
  const [documentlist, setDocumentList] = useState([]);
  const [dialogdetails, setdialogdetails] = useState("");
  const [open, setOpen] = useState(false);
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    const getDocs = async () => {
      try {
        const response = `${apiUrl}/api/universitiesattach/getbyStudent/${userID}`;
        const resp = await fetch(response);
        if (resp.status === 200) {
          const data = await resp.json();
          console.log("accomodationListdata,", data);
          setDocumentList(data.message);
        }
      } catch (err) {
        console.log("err", err);
      }
    };
    getDocs();
  }, [userID]);

  const handleClose = () => {
    setOpen(false);
  };
  // console.log("documentlistapplicationlist", documentlist);
  //   useEffect(() => {
  //     const getDocs = async () => {
  //       try {
  //         console.log("rPDzlHkMvlTAgg1xZplOXL15cD53rd");
  //         const response = `${apiUrl}/api/documentuploaded/getDocumentById/${userID}`;
  //         const resp = await fetch(response);
  //         if (resp.status === 200) {
  //           const data = await resp.json();
  //           setDocumentListData((p) => [...data.message]);
  //           setDocumentList((p) => [...data.message]);
  //           console.log("setDocumentListdata,", data);
  //         }
  //       } catch (err) {
  //         console.log("err", err);
  //       }
  //     };
  //     getDocs();
  //   }, [userID]);

  const onDownloadingPdf = (filename) => {
    fetch(filename).then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);

        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = filename;
        alink.click();
      });
    });
  };

  return (
    <div>
      <div>
        <TableContainer component={Paper} style={{ padding: "10px 20px", height: "400px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell>Serial Number</TableCell> */}
                {/* <TableCell align="center"></TableCell> */}
                <TableCell align="center">University Name </TableCell>
                <TableCell align="center">Intake </TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">TODO</TableCell>
                <TableCell align="center">Downlod</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documentlist?.map((documentlist, key) => {
                return (
                  <>
                    {documentlist.IntakeByAdmin && (
                      <TableRow
                        key={key}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        {/* <TableCell align="center"></TableCell> */}
                        <TableCell align="center">{documentlist.universityName}</TableCell>
                        <TableCell align="center">
                          {" "}
                          {documentlist.IntakeByAdmin}
                        </TableCell>
                        <TableCell align="center">
                          {" "}
                          {documentlist.StatusByAdmin}
                        </TableCell>
                        {/* <TableCell align="center">{documentlist.StatusByAdmin}</TableCell> */}
                        <TableCell align="center">
                          <Button
                            onClick={() => {
                              // setdialogdetails(documentlist.TODOByAdmin);
                              setdialogdetails(parse(`${documentlist.TODOByAdmin}`));
                              setOpen(true);
                            }}
                            variant="contained"
                          >
                            View
                          </Button>
                        </TableCell>

                        {/* <TableCell align="center">{documentlist.TODOByAdmin}</TableCell> */}
                        <TableCell align="center">
                          {documentlist.applicationDocsByAdmin && (
                            <Button
                              color="primary"
                              variant="contained"
                              onClick={() => {
                                // onDownloadingPdf(item.AdvisoryPackagefile)
                                onDownloadingPdf(
                                  `${apiUrl}/api/${documentlist.applicationDocsByAdmin}`
                                );
                              }}
                            >
                              <Icon>download</Icon>
                              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Download</Span>
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                );
              })}
            </TableBody>
          </Table>

          <Dialog
            open={open}
            // onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Submit"}</DialogTitle>
            {dialogdetails && <DialogContent>{dialogdetails}</DialogContent>}

            <DialogActions>
              <Button onClick={handleClose}>OK</Button>
            </DialogActions>
          </Dialog>
        </TableContainer>
      </div>
    </div>
  );
}

export default ApplicationStatusInner;
