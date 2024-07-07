import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TextField from "@mui/material/TextField";
import TableHead from "@mui/material/TableHead";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Grid, Icon, styled } from "@mui/material";
import { Span } from "app/components/Typography";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useEffect } from "react";
import { StudentDocument, UpdateStudentDocument, UpdateStudentDocumentStatus } from "Apis/Document";
import apiUrl from "URLS/ApiUrl";
import { useState } from "react";
import { filesupload } from "Apis/filesupload";
import { studentData } from "Apis/Persnoldetailsform";
function Documentget() {
  const [open, setOpen] = useState(false);
  const [dialogdetails, setDialogDetails] = useState("");
  const [documentlist, setDocumentList] = useState([]);
  const [validatefom, setValidateForm] = useState(false)
  const [documentlistData, setDocumentListData] = useState([]);
  const userID = localStorage.getItem("userID");

  const [hidebtn, sethidebtn] = useState(false)
  useEffect(() => {
    const check = async () => {
      const resp = await studentData(userID);
      if (resp?.status === 200) {
        const data = await resp.json();
        console.log("dreachedLimitstudentDataata", data);
        const steps = data.message[0]?.steps;
        if (steps === "4") {
          sethidebtn(true)

        }
        console.log("steps", steps)
      };
    }
    check();
  }, [userID]);


  useEffect(() => {
    const getDocs = async () => {
      try {
        const response = `${apiUrl}/api/documentuploaded/getDocumentById/${userID}`;
        const resp = await fetch(response);
        if (resp.status === 200) {
          const data = await resp.json();
          setDocumentListData([...data.message]);
          setDocumentList([...data.message]);
          console.log("setDocumentListdata,", data.message);

          // Filter documents where DocUploadedBystudent is null
          const nullDocs = data.message.filter(doc => doc.DocUploadedBystudent === null);
          console.log("Documents with DocUploadedBystudent as null:", nullDocs);

          // Log all fields of each document
          data.message.forEach(doc => {
            console.log("Document details:", doc);
          });
        }
      } catch (err) {
        console.log("err", err);
      }
    };
    getDocs();
  }, [userID]);

  console.log("documentlistData", documentlistData)
  const getFileExtension = (filename) => {
    return filename.split('.').pop(); // Extracts extension from filename
  };
  const onDownloadingPdf = (filename, fileType) => {
    fetch(filename).then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);

        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = `SOP-Dheeraj Mitra.${fileType}`;
        alink.click();
      });
    });
  };


  const StudentDownloadFile = (filename, fileType) => {
    if (filename) {
      fetch(filename).then((response) => {
        response.blob().then((blob) => {
          // Creating new object of PDF file
          const fileURL = window.URL.createObjectURL(blob);

          // Setting various property values
          let alink = document.createElement("a");
          alink.href = fileURL;
          alink.download = `studentDocs.${fileType}`;
          alink.click();
        });
      });
    }

  };
  const StudentUploadDocs = async (event, row) => {
    const file = event.target.files[0];
    // const fileName = file.name;
    const fd = new FormData();
    fd.append("StudentDocs", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    const newdocumentlist = documentlist.map((item) => {
      if (row.id === item.id) {
        return { ...item, DocUploadedBystudent: data[0].filename };
      }
      return item;
    });

    const resp = await UpdateStudentDocument(newdocumentlist, userID);
    console.log("resp", resp);
    setDocumentListData((p) => [...newdocumentlist]);
    setDocumentList((p) => [...newdocumentlist]);

  };

  const handleClose = () => {
    setOpen(false);
  };


  const HandleValidatew = async () => {
    const updatestatus = await UpdateStudentDocumentStatus(userID)

    console.log("updatestatus", updatestatus)
    setValidateForm(false)
  }
  return (
    <div>
      <TableContainer component={Paper} style={{ padding: "10px 20px", height: "400px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell>Serial Number</TableCell> */}
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Download </TableCell>
              <TableCell align="center">Instruction</TableCell>
              <TableCell align="center">Upload Another</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documentlist?.map((row, index) => (
              <TableRow key={row.title} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="center">
                  {row.DocuploadedByAdmin && (
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        // onDownloadingPdf(item.AdvisoryPackagefile)
                        onDownloadingPdf(`${apiUrl}/api/${row.DocuploadedByAdmin}`, getFileExtension(`${apiUrl}/api/${row.DocuploadedByAdmin}`));
                      }}
                    >
                      <Icon>download</Icon>
                      <Span sx={{ pl: 1, textTransform: "capitalize" }}>Download</Span>
                    </Button>
                  )}
                </TableCell>

                <TableCell align="center">
                  {" "}
                  <Button
                    onClick={() => {
                      setDialogDetails(row.Instruction);
                      setOpen(true);
                    }}
                    variant="contained"
                  >
                    View
                  </Button>
                </TableCell>

                <TableCell align="center" disabled={row.status === false}>
                  {row.DocUploadedBystudent ? (
                    <>
                      <Button
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => {
                          StudentDownloadFile(`${apiUrl}/api/${row.DocUploadedBystudent}`, getFileExtension(`${apiUrl}/api/${row.DocuploadedByAdmin}`))
                        }}
                      >
                        Download
                      </Button>
                      <button
                        type="button"
                        onClick={() => {
                          setDocumentList((p) => {
                            p[index] = { ...p[index], DocUploadedBystudent: null };
                            return [...p];
                          });
                          console.log(
                            "documentlistData[index].DocUploadedBystudent==.",
                            documentlistData[index].DocUploadedBystudent
                          );
                        }}
                      >
                        Edit
                      </button>
                    </>
                  ) : (
                    <>
                      {" "}
                      <TextField
                        disabled={row.status === false}
                        onChange={(e) => {
                          StudentUploadDocs(e, row);
                        }}
                        type="file"
                      // style={{ width: "100%" }}
                      />
                      {documentlistData[index].DocUploadedBystudent && (
                        <button
                          type="button"
                          onClick={() => {
                            console.log(
                              "documentlistData[index].DocUploadedBystudent",
                              documentlistData[index].DocUploadedBystudent
                            );
                            setDocumentList((p) => {
                              p[index].DocUploadedBystudent =
                                documentlistData[index].DocUploadedBystudent;
                              return [...p];
                            });
                          }}
                        >
                          Back
                        </button>
                      )}
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog
          open={open}
          // onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Instruction"}</DialogTitle>
          {console.log("dialogdetails", dialogdetails)}
          {dialogdetails && <DialogContent>{dialogdetails}</DialogContent>}

          <DialogActions>
            <Button onClick={handleClose}>OK</Button>
          </DialogActions>
        </Dialog>


        <Dialog
          open={validatefom}
          // onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Instruction"}</DialogTitle>
          {console.log("dialogdetails", dialogdetails)}
          {dialogdetails && <DialogContent>After Submiting This Form You Cant Edit It</DialogContent>}

          <DialogActions>
            <Button onClick={HandleValidatew}>OK</Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
      {!hidebtn && <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "20px 0px" }}>
        <Button disabled={documentlistData.some(doc => doc.DocUploadedBystudent === null)}
          variant="contained" onClick={() => {
            setValidateForm(true)
          }}>
          Submit
        </Button>
      </div>}


    </div>
  );
}

export default Documentget;
