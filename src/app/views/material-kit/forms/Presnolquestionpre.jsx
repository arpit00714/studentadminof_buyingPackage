import React, { useState } from "react";
import {Icon, Button, Grid, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled } from "@mui/material";
import { persnoaldetailsupdate } from "Apis/Persnoldetailsform";
import { Span } from "app/components/Typography";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const TextFieldEdit = styled(TextField)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

function Presnolquestionpre(props) {
  const [commentbox, setCommentBox] = useState(false);
  const formstatus = props.formstatus
  const [filedopen, setfiledOpen] = useState(true);
  const [formData, setFormData] = useState(props?.userData[0]);
  const [editable, setEditable] = useState(false);
  const [open, setOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const userID = localStorage.getItem("userID");
  // const [persnolquestion, setPersnolQuestion] = useState({
  //   AcademicBackgroudhelpyou: "",
  //   Familyhelpyou: "",
  //   coursemakingsositybatterplace: "",
  //   helpdesirecoursetohelpgoal: "",
  //   interestindesirearea: "",
  //   ogicalculminationofyourprogress: "",
  //   professionalBackgroudyou: "",
  //   shortandlongtermgoal: "",
  //   startedakingshapeinyourmind: "",
  //   surroundinghelpyou: "",
  // });
  const countWords = (str) => {
    // return str.trim().split(/\s+/).length;
    if (str == null) {
      return 0; 
    }
    return str.match(/\b\w+\b/g)?.length ?? 0;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {...formData};
    // updatedFormData[index] = { ...updatedFormData[index], [name]: value};
    if(value && value.length  > 0){
    updatedFormData[name] = value;
  }
  else{
    updatedFormData[name] = "";
  }
  setFormData(updatedFormData);
  };
  const toggleEdit = () => {
    setEditable(!editable);
  };
  const handleSubmit = async () => {
    setOpen(true);
    const fieldValues = Object.values(formData);
    // const allFieldsLongEnough = fieldValues.every((field) => countWords(field) >= 250);
    const allFieldsLongEnough = fieldValues.every((field) => {
      const wordCount = countWords(field);
      console.log(`Field: ${field}, Word Count: ${wordCount}`); // Log each field's word count
      return wordCount >= 250;
    });
    setShowInfo(allFieldsLongEnough);
    
    // if (allFieldsLongEnough) {
    //   setFormData([
    //     ...formData,
    //     { ...formData },
    //   ]);
      
    // }
  };

  const handleSubmits = async () => {
    // const updatedData = [...formData, persnolquestion];
    // setEditable(updatedData);
    try {
      if (formData.interestindesirearea !== "") {
        const resp = await persnoaldetailsupdate(
          {
            persnoaldetailsfrom: JSON.stringify([formData]),
          },
          userID
        );
        if (resp.status === 200) {
          console.log("resp", resp);
          // setFormData({
          //   AcademicBackgroudhelpyou: "",
          //     Familyhelpyou: "",
          //     coursemakingsositybatterplace: "",
          //     helpdesirecoursetohelpgoal: "",
          //     interestindesirearea: "",
          //     ogicalculminationofyourprogress: "",
          //     professionalBackgroudyou: "",
          //     shortandlongtermgoal: "",
          //     startedakingshapeinyourmind: "",
          //     surroundinghelpyou: "",
          // });
        }
      }
    } catch (err) {
      console.log("x", err);
    }
  };
  console.log(formData,"formData")
  const handleClose = async () => {
    if (showInfo) {
      try {
        const resp = await persnoaldetailsupdate(
          {
            examfromstatus: "1",
            persnoaldetailsfrom: JSON.stringify([formData]),
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
  const handleCancel = () => {
    setOpen(false);
    setShowInfo(false);
  };
  if (props.userData.length === 0) {
    return null; // Handle case when userData is empty
  }

  return (
    <div>
      {!formstatus && !editable && (<div>            
              <Button variant="contained" color="primary" onClick={toggleEdit}  >
          {editable ? "Cancel" : "Edit"}
        </Button>
       
      </div>)}
      <ValidatorForm
        onSubmit={handleSubmit}
        onError={() => {
          setCommentBox(true);
        }}
      >
      {/* {formData?.map((item, index) => ( */}
      
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <p>How Your Become Interested In Desired Area? (min 250)</p>
            <TextFieldEdit
              type="text"
              multiline
              name="interestindesirearea"
              value={formData.interestindesirearea || ""}
              onChange={(e) => handleChange(e)}
              disabled={!editable}
            />
            <p>How Your Surrounding Help You To Build Interest In Desired Area? (min 250)</p>
            <TextFieldEdit
              type="text"
              multiline
              name="surroundinghelpyou"
              value={formData.surroundinghelpyou || ""}
              onChange={(e) => handleChange(e)}
              disabled={!editable}
            />
            <p>How Your Family Help You To Build Interest For Desired Area? (min 250)</p>
            <TextFieldEdit
              type="text"
              multiline
              name="Familyhelpyou"
              value={formData.Familyhelpyou || ""}
              onChange={(e) => handleChange(e)}
              disabled={!editable}
            />
            <p>How Your Academic Backgroud Help You To Build Interest For Desired Area? (min 250)</p>
            <TextFieldEdit
              type="text"
              multiline
              name="AcademicBackgroudhelpyou"
              value={formData.AcademicBackgroudhelpyou || ""}
              onChange={(e) => handleChange(e)}
              disabled={!editable}
            />
            <p>How Your Professional Backgroud Help You To Build Interest For Desired Area? (min 250)</p>
            <TextFieldEdit
              type="text"
              multiline
              name="professionalBackgroudyou"
              value={formData.professionalBackgroudyou || ""}
              onChange={(e) => handleChange(e)}
              disabled={!editable}
            />
            <p>When And At What Incidence You Goal Started Taking Shape In Your Mind And Why? (min 250)</p>
            <TextFieldEdit
              type="text"
              multiline
              name="startedakingshapeinyourmind"
              value={formData.startedakingshapeinyourmind || ""}
              onChange={(e) => handleChange(e)}
              disabled={!editable}
            />
            <p>What Is Your Short And Long Term Goal? (min 250)</p>
            <TextFieldEdit
              type="text"
              multiline
              name="shortandlongtermgoal"
              value={formData.shortandlongtermgoal || ""}
              onChange={(e) => handleChange(e)}
              disabled={!editable}
            />
            <p>How This Course Will Help You To Achive Desired Goal? (min 250)</p>
            <TextFieldEdit
              type="text"
              multiline
              name="helpdesirecoursetohelpgoal"
              value={formData.helpdesirecoursetohelpgoal || ""}
              onChange={(e) => handleChange(e)}
              disabled={!editable}
            />
            <p>How Pursing This Course Help You To Make World/society Better Place? (min 250)</p>
            <TextFieldEdit
              type="text"
              multiline
              name="coursemakingsositybatterplace"
              value={formData.coursemakingsositybatterplace || ""}
              onChange={(e) => handleChange(e)}
              disabled={!editable}
            />
            <p>How Pursing This Course Is The Logical Culmination Of Your Growth / Progress ? (min 250)</p>
            <TextFieldEdit
              type="text"
              multiline
              name="ogicalculminationofyourprogress"
              value={formData.ogicalculminationofyourprogress || ""}
              onChange={(e) => handleChange(e)}
              disabled={!editable}
            />
          </Grid>
        </Grid>
      {/* ))} */}

       {editable && (
        <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
          <Button variant="contained" color="secondary" onClick={handleSubmits}>
            Save
          </Button>
          <Button style={{ marginLeft: "10px" }} color="primary" variant="contained" type="submit">
              <Icon>save</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
            </Button>
          </div>
        )}
        </ValidatorForm>
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
             
                {Object.entries(formData).map(([key, value]) => (
                  <div style={{ display: "flex", alignItems: "center" }} key={key}>
                    <p style={{ margin: "0px 10px" }}>{key.replace(/([A-Z])/g, " $1")}</p>
                    <p style={{ color: countWords(value) < 250 ? "red" : "green" }}>{countWords(value)}</p>
                  </div>
                ))      
          }
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
