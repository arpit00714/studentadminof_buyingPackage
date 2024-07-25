import React, { useState } from "react";
import { Button, Grid, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled } from "@mui/material";
import { persnoaldetailsupdate } from "Apis/Persnoldetailsform";

const TextFieldEdit = styled(TextField)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

function Presnolquestionpre(props) {
  const formstatus = props.formstatus
  const [filedopen, setfiledOpen] = useState(true);
  const [formData, setFormData] = useState(props?.userData);
  const [editable, setEditable] = useState(false);
  const [open, setOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const userID = localStorage.getItem("userID");
  const countWords = (str) => {
    return str.trim().split(/\s+/).length;
  };
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[index] = { ...updatedFormData[index], [name]: value };
    setFormData(updatedFormData);
  };
  const toggleEdit = () => {
    setEditable(!editable);
  };
  const handleSubmit = () => {
    setOpen(true);
    // const fieldValues = formData.flatMap(Object.values); // Flatten the values from each formData object
    // const allFieldsLongEnough = fieldValues.every((field) => field?.length >= 250);
    // setShowInfo(allFieldsLongEnough);
    const fieldValues = formData.flatMap(Object.values);
    const allFieldsLongEnough = fieldValues.every((field) => countWords(field) >= 250);
    setShowInfo(allFieldsLongEnough);

    if (allFieldsLongEnough) {
      // Add your API call here to save data
      console.log("Submitted data:", formData);
      setEditable(false); // Disable editing after submission
    }
  };

  const handleClose = async () => {
    console.log("formData", formData)
    if (showInfo) {
      try {
        const resp = await persnoaldetailsupdate(
          {
            examfromstatus: "1",
            persnoaldetailsfrom: JSON.stringify(formData),
          },
          userID
        );
        if (resp.status === 200) {
          setOpen(false);
          // navigation("/student/dashboard/default");
        }
      } catch (err) {
        console.log(err);
      }
    }
    setOpen(false);
  };
  console.log("formData", formData)
  const handleCancel = () => {
    setOpen(false);
    setShowInfo(false);
  };
  if (props.userData.length === 0) {
    return null; // Handle case when userData is empty
  }

  return (
    <div>
      {!formstatus && <div>
        <Button variant="contained" color="primary" onClick={toggleEdit}>
          {editable ? "Cancel" : "Edit"}
        </Button>
       
      </div>}

      {formData?.map((item, index) => (

        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <p>How Your Become Interested In Desired Area? (min 250)</p>
            <TextFieldEdit
              type="text"
              multiline
              name="interestindesirearea"
              value={item.interestindesirearea || ""}
              onChange={(e) => handleChange(e, index)}
              disabled={!editable}
            />
            <p>How Your Surrounding Help You To Build Interest In Desired Area? (min 250)</p>
            <TextFieldEdit
              type="text"
              multiline
              name="surroundinghelpyou"
              value={item.surroundinghelpyou || ""}
              onChange={(e) => handleChange(e, index)}
              disabled={!editable}
            />
            <p>How Your Family Help You To Build Interest For Desired Area? (min 250)</p>
            <TextFieldEdit
              type="text"
              multiline
              name="Familyhelpyou"
              value={item.Familyhelpyou || ""}
              onChange={(e) => handleChange(e, index)}
              disabled={!editable}
            />
            <p>How Your Academic Backgroud Help You To Build Interest For Desired Area? (min 250)</p>
            <TextFieldEdit
              type="text"
              multiline
              name="AcademicBackgroudhelpyou"
              value={item.AcademicBackgroudhelpyou || ""}
              onChange={(e) => handleChange(e, index)}
              disabled={!editable}
            />
            <p>How Your Professional Backgroud Help You To Build Interest For Desired Area? (min 250)</p>
            <TextFieldEdit
              type="text"
              multiline
              name="professionalBackgroudyou"
              value={item.professionalBackgroudyou || ""}
              onChange={(e) => handleChange(e, index)}
              disabled={!editable}
            />
            <p>When And At What Incidence You Goal Started Taking Shape In Your Mind And Why? (min 250)</p>
            <TextFieldEdit
              type="text"
              multiline
              name="startedakingshapeinyourmind"
              value={item.startedakingshapeinyourmind || ""}
              onChange={(e) => handleChange(e, index)}
              disabled={!editable}
            />
            <p>What Is Your Short And Long Term Goal? (min 250)</p>
            <TextFieldEdit
              type="text"
              multiline
              name="shortandlongtermgoal"
              value={item.shortandlongtermgoal || ""}
              onChange={(e) => handleChange(e, index)}
              disabled={!editable}
            />
            <p>How This Course Will Help You To Achive Desired Goal? (min 250)</p>
            <TextFieldEdit
              type="text"
              multiline
              name="helpdesirecoursetohelpgoal"
              value={item.helpdesirecoursetohelpgoal || ""}
              onChange={(e) => handleChange(e, index)}
              disabled={!editable}
            />
            <p>How Pursing This Course Help You To Make World/society Better Place? (min 250)</p>
            <TextFieldEdit
              type="text"
              multiline
              name="coursemakingsositybatterplace"
              value={item.coursemakingsositybatterplace || ""}
              onChange={(e) => handleChange(e, index)}
              disabled={!editable}
            />
            <p>How Pursing This Course Is The Logical Culmination Of Your Growth / Progress ? (min 250)</p>
            <TextFieldEdit
              type="text"
              multiline
              name="ogicalculminationofyourprogress"
              value={item.ogicalculminationofyourprogress || ""}
              onChange={(e) => handleChange(e, index)}
              disabled={!editable}
            />
          </Grid>
        </Grid>
      ))}
       {editable && (
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Save
          </Button>
        )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          {showInfo ? (
            <DialogContentText id="alert-dialog-description">
              <h3>
                Do You Want To Submit This Form? After submission, you can't edit
                the form.
              </h3>
            </DialogContentText>
          ) : (
            <DialogContentText id="alert-dialog-description">
              {formData.map((item, index) =>
                Object.entries(item).map(([key, value]) => (
                  <div style={{ display: "flex", alignItems: "center" }} key={key}>
                    <p style={{ margin: "0px 10px" }}>{key.replace(/([A-Z])/g, " $1")}</p>
                    <p style={{ color: value?.length < 250 ? "red" : "green" }}>{value?.length}</p>
                  </div>
                ))
              )}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          {showInfo && (
            <Button onClick={handleClose} autoFocus>
              OK
            </Button>
          )}
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

export default Presnolquestionpre;
