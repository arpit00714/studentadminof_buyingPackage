import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TextField from "@mui/material/TextField";
import TableHead from "@mui/material/TableHead";
import { Button, Grid, Icon, styled } from "@mui/material";
import { Span } from "app/components/Typography";
import TableRow from "@mui/material/TableRow";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect } from "react";
import { StudentDocument, UpdateStudentDocument, UpdateStudentVisaDocument } from "Apis/Document";
import apiUrl from "URLS/ApiUrl";
import { useState } from "react";
import { filesupload } from "Apis/filesupload";

function VisaIneer() {
  const [documentlistData, setDocumentListData] = useState([]);
  const [documentlist, setDocumentList] = useState();
  const userID = localStorage.getItem("userID");
  const [dialogdetails, setdialogdetails] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const getDocs = async () => {
      try {
        const response = `${apiUrl}/api/visa/getvisa/${userID}`;
        const resp = await fetch(response);
        if (resp.status === 200) {
          const data = await resp.json();
          console.log("viosadata,", data);
          setDocumentList((p) => [...data.message]);
          setDocumentListData((p) => [...data.message]);
        }
      } catch (err) {
        console.log("err", err);
      }
    };
    getDocs();
  }, [userID]);



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
        alink.download = `Specimen.${fileType}`;
        alink.click();
      });
    });
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
        return { ...item, UploadDoc: data[0].filename };
      }
      return item;
    });
    const resp = await UpdateStudentVisaDocument(newdocumentlist, userID);
    console.log("resp", resp);
    setDocumentListData((p) => [...newdocumentlist]);
    setDocumentList((p) => [...newdocumentlist]);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // setpassportfront(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("Selected file:", file);
    // console.log("File name:", fileName);
  };

  const handleClose = async () => {
    setOpen(false);
  };
  return (
    <div>
      <div>
        <div>
          <TableContainer component={Paper} style={{ padding: "10px 20px", height: "400px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {/* <TableCell>Serial Number</TableCell> */}
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Instruction</TableCell>
                  <TableCell align="center">Specimen</TableCell>
                  <TableCell align="center">Upload </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documentlist?.map((documentlist, key) => {
                  return (
                    <TableRow key={key} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell align="center">{documentlist?.Title}</TableCell>
                      <TableCell align="center">
                        {" "}
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => {
                            setOpen(true);
                            setdialogdetails(documentlist?.Instruction);
                            // onDownloadingPdf(item.AdvisoryPackagefile)
                          }}
                        >
                          <Icon>
                            <VisibilityOutlinedIcon />
                          </Icon>
                          <Span sx={{ pl: 1, textTransform: "capitalize" }}>View</Span>
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        {documentlist?.SpecimenDoc && (
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={() => {
                              // onDownloadingPdf(item.AdvisoryPackagefile)
                              onDownloadingPdf(`${apiUrl}/api/${documentlist?.SpecimenDoc}`, getFileExtension(`${apiUrl}/api/${documentlist?.SpecimenDoc}`));
                            }}
                          >
                            <Icon>download</Icon>
                            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Download</Span>
                          </Button>
                        )}
                      </TableCell>

                      {documentlist.UploadDoc ? (
                        <>
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={`${apiUrl}/api/${documentlist.UploadDoc}`}
                          >
                            Download
                          </a>
                          <button
                            type="button"
                            onClick={() => {
                              setDocumentList((p) => {
                                p[key] = { ...p[key], UploadDoc: null };
                                return [...p];
                              });
                              console.log(
                                "documentlistData[index].DocUploadedBystudent==.",
                                documentlistData[key].UploadDoc
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
                            onChange={(e) => {
                              StudentUploadDocs(e, documentlistData);
                            }}
                            type="file"
                          // style={{ width: "100%" }}
                          />
                          {documentlistData[key].UploadDoc && (
                            <button
                              type="button"
                              onClick={() => {
                                console.log(
                                  "documentlistData[index].DocUploadedBystudent",
                                  documentlistData[key].UploadDoc
                                );
                                setDocumentList((p) => {
                                  p[key].UploadDoc = documentlistData[key].UploadDoc;
                                  return [...p];
                                });
                              }}
                            >
                              Back
                            </button>
                          )}
                        </>
                      )}
                    </TableRow>
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
    </div>
  );
}

export default VisaIneer;
