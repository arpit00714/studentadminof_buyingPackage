import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { H3 } from "app/components/Typography";
import { persnoaldetailsupdate } from "Apis/Persnoldetailsform";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
function Compatativepre(props) {
  const formstatus = props.formstatus
  const userID = localStorage.getItem("userID");
  const [open, setOpen] = useState(false)
  const [filedopen, setfiledOpen] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [compatativeExamList, setCompatativeExamList] = useState(props.userData);
  console.log("props.userData", props.userData)
  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleInputChange = (index, examType, field, value) => {
    const updatedList = [...compatativeExamList];
    updatedList[index][examType][field] = value;
    setCompatativeExamList(updatedList);
  };

  const handleSubmit = async () => {
    setOpen(true)
    setEditMode(false);
    const resp = await persnoaldetailsupdate(
      {
        CompatativeExam: JSON.stringify(compatativeExamList)
      },
      userID
    );
    if (resp.status === 200) {
      console.log("data Update SucessFully")
    }
    // Add your submit logic here, e.g., sending the updated data to a server
    console.log("Updated Data:", compatativeExamList);
  };
  const handleClose = () => {
    setOpen(false)
    window.location.reload();
  }
  return (
    <div>
      {!formstatus && <div>
        <Button variant="contained" color="primary" onClick={handleEditClick}>
          Edit
        </Button>
        {editMode && (
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>}

      {compatativeExamList.map((item, index) => (
        <div key={index}>
          {item?.GreExamForm && (
            <div>
              <H3>{item?.GreExamForm?.typeofexam}</H3>
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="date"
                    name="examdate"
                    label="Date of examination"
                    value={item.GreExamForm.examdate || ""}
                    onChange={(e) =>
                      handleInputChange(index, "GreExamForm", "examdate", e.target.value)
                    }
                  />
                  <TextField
                    disabled={!editMode}
                    type="text"
                    style={{ width: "100%", marginBottom: "20px" }}
                    name="Username"
                    label="Username"
                    value={item.GreExamForm.Username || ""}
                    onChange={(e) =>
                      handleInputChange(index, "GreExamForm", "Username", e.target.value)
                    }
                  />
                  <TextField
                    disabled={!editMode}
                    type="text"
                    style={{ width: "100%", marginBottom: "20px" }}
                    name="Password"
                    label="Password"
                    value={item.GreExamForm.Password || ""}
                    onChange={(e) =>
                      handleInputChange(index, "GreExamForm", "Password", e.target.value)
                    }
                  />
                  <TextField
                    disabled={!editMode}
                    type="text"
                    name="AWA"
                    style={{ width: "100%", marginBottom: "20px" }}
                    label="AWA"
                    value={item.GreExamForm.AWA || ""}
                    onChange={(e) =>
                      handleInputChange(index, "GreExamForm", "AWA", e.target.value)
                    }
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="text"
                    name="Quantitative"
                    label="Quantitative"
                    value={item.GreExamForm.Quantitative || ""}
                    onChange={(e) =>
                      handleInputChange(index, "GreExamForm", "Quantitative", e.target.value)
                    }
                  />
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="text"
                    name="Verbal"
                    label="Verbal"
                    value={item.GreExamForm.Verbal || ""}
                    onChange={(e) =>
                      handleInputChange(index, "GreExamForm", "Verbal", e.target.value)
                    }
                  />
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="text"
                    name="Total"
                    label="Total"
                    value={item.GreExamForm.Total || ""}
                    onChange={(e) =>
                      handleInputChange(index, "GreExamForm", "Total", e.target.value)
                    }
                  />
                </Grid>
              </Grid>
            </div>
          )}
          {item?.GmateExamForm && (
            <div>
              <H3>{item.GmateExamForm.typeofexam}</H3>
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="date"
                    name="ACTDateofexamination"
                    label="Date of examination"
                    value={item.GmateExamForm.examdate || ""}
                    onChange={(e) =>
                      handleInputChange(index, "GmateExamForm", "examdate", e.target.value)
                    }
                  />
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="text"
                    name="GmateUsername"
                    label="Username"
                    value={item.GmateExamForm.GmateUsername || ""}
                    onChange={(e) =>
                      handleInputChange(index, "GmateExamForm", "GmateUsername", e.target.value)
                    }
                  />
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="text"
                    name="GmatePassword"
                    label="Password"
                    value={item.GmateExamForm.GmatePassword || ""}
                    onChange={(e) =>
                      handleInputChange(index, "GmateExamForm", "GmatePassword", e.target.value)
                    }
                  />
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="text"
                    name="GmateAWA"
                    label="AWA"
                    value={item.GmateExamForm.GmateAWA || ""}
                    onChange={(e) =>
                      handleInputChange(index, "GmateExamForm", "GmateAWA", e.target.value)
                    }
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="text"
                    name="GmateIR"
                    label="IR"
                    value={item.GmateExamForm.GmateIR || ""}
                    onChange={(e) =>
                      handleInputChange(index, "GmateExamForm", "GmateIR", e.target.value)
                    }
                  />
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="text"
                    name="GmateQuantitative"
                    label="Quantitative"
                    value={item.GmateExamForm.GmateQuantitative || ""}
                    onChange={(e) =>
                      handleInputChange(index, "GmateExamForm", "GmateQuantitative", e.target.value)
                    }
                  />
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="text"
                    name="GmateVerbal"
                    label="Verbal"
                    value={item.GmateExamForm.GmateVerbal || ""}
                    onChange={(e) =>
                      handleInputChange(index, "GmateExamForm", "GmateVerbal", e.target.value)
                    }
                  />
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="text"
                    name="GmateTotal"
                    label="Total"
                    value={item.GmateExamForm.GmateTotal || ""}
                    onChange={(e) =>
                      handleInputChange(index, "GmateExamForm", "GmateTotal", e.target.value)
                    }
                  />
                </Grid>
              </Grid>
            </div>
          )}
          {item?.IELTSExamForm && (
            <div>
              <H3>{item.IELTSExamForm.typeofexam}</H3>
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="date"
                    name="IELTSDateofexamination"
                    label="Date of examination"
                    value={item.IELTSExamForm.examdate || ""}
                    onChange={(e) =>
                      handleInputChange(index, "IELTSExamForm", "examdate", e.target.value)
                    }
                  />
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="text"
                    name="IELTSUsername"
                    label="Username"
                    value={item.IELTSExamForm.IELTSUsername || ""}
                    onChange={(e) =>
                      handleInputChange(index, "IELTSExamForm", "IELTSUsername", e.target.value)
                    }
                  />
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="text"
                    name="IELTSPassword"
                    label="Password"
                    value={item.IELTSExamForm.IELTSPassword || ""}
                    onChange={(e) =>
                      handleInputChange(index, "IELTSExamForm", "IELTSPassword", e.target.value)
                    }
                  />
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="text"
                    name="IELTSReading"
                    label="Reading"
                    value={item.IELTSExamForm.IELTSReading || ""}
                    onChange={(e) =>
                      handleInputChange(index, "IELTSExamForm", "IELTSReading", e.target.value)
                    }
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="text"
                    name="IELTListening"
                    label="Listening"
                    value={item.IELTSExamForm.IELTListening || ""}
                    onChange={(e) =>
                      handleInputChange(index, "IELTSExamForm", "IELTListening", e.target.value)
                    }
                  />
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="text"
                    name="IELTSSpeaking"
                    label="Speaking"
                    value={item.IELTSExamForm.IELTSSpeaking || ""}
                    onChange={(e) =>
                      handleInputChange(index, "IELTSExamForm", "IELTSSpeaking", e.target.value)
                    }
                  />
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="text"
                    name="IELTSWriting"
                    label="Writing"
                    value={item.IELTSExamForm.IELTSWriting || ""}
                    onChange={(e) =>
                      handleInputChange(index, "IELTSExamForm", "IELTSWriting", e.target.value)
                    }
                  />
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="text"
                    name="IELTSTotal"
                    label="Total"
                    value={item.IELTSExamForm.IELTSTotal || ""}
                    onChange={(e) =>
                      handleInputChange(index, "IELTSExamForm", "IELTSTotal", e.target.value)
                    }
                  />
                </Grid>
              </Grid>
            </div>
          )}
          {item?.TOEFLExamForm && (
            <div>
              <H3>{item.TOEFLExamForm.typeofexam}</H3>
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="date"
                    name="TOEFLEDateofexamination"
                    label="Date of examination"
                    value={item.TOEFLExamForm.examdate || ""}
                    onChange={(e) =>
                      handleInputChange(index, "TOEFLExamForm", "examdate", e.target.value)
                    }
                  />
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="text"
                    name="TOEFLEUsername"
                    label="Username"
                    value={item.TOEFLExamForm.TOEFLEUsername || ""}
                    onChange={(e) =>
                      handleInputChange(index, "TOEFLExamForm", "TOEFLEUsername", e.target.value)
                    }
                  />
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="text"
                    name="TOEFLEPassword"
                    label="Password"
                    value={item.TOEFLExamForm.TOEFLEPassword || ""}
                    onChange={(e) =>
                      handleInputChange(index, "TOEFLExamForm", "TOEFLEPassword", e.target.value)
                    }
                  />
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="text"
                    name="TOEFLEReading"
                    label="Reading"
                    value={item.TOEFLExamForm.TOEFLEReading || ""}
                    onChange={(e) =>
                      handleInputChange(index, "TOEFLExamForm", "TOEFLEReading", e.target.value)
                    }
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="text"
                    name="TOEFLEistening"
                    label="Listening"
                    value={item.TOEFLExamForm.TOEFLEistening || ""}
                    onChange={(e) =>
                      handleInputChange(index, "TOEFLExamForm", "TOEFLEistening", e.target.value)
                    }
                  />
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="text"
                    name="TOEFLESpeaking"
                    label="Speaking"
                    value={item.TOEFLExamForm.TOEFLESpeaking || ""}
                    onChange={(e) =>
                      handleInputChange(index, "TOEFLExamForm", "TOEFLESpeaking", e.target.value)
                    }
                  />
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="text"
                    name="TOEFLEWriting"
                    label="Writing"
                    value={item.TOEFLExamForm.TOEFLEWriting || ""}
                    onChange={(e) =>
                      handleInputChange(index, "TOEFLExamForm", "TOEFLEWriting", e.target.value)
                    }
                  />
                  <TextField
                    disabled={!editMode}
                    style={{ width: "100%", marginBottom: "20px" }}
                    type="text"
                    name="TOEFLETotal"
                    label="Total"
                    value={item.TOEFLExamForm.TOEFLETotal || ""}
                    onChange={(e) =>
                      handleInputChange(index, "TOEFLExamForm", "TOEFLETotal", e.target.value)
                    }
                  />
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      ))}
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">{"Submit"}</DialogTitle> */}
        <DialogContent>{"Update Successfully"}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>



      {formstatus && <Dialog
        open={filedopen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You Have Already Filed The Form"}
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setfiledOpen(false);
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>}
    </div>
  );
}

export default Compatativepre;
