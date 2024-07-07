import React, { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Button, Grid, Icon, styled } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Span } from "app/components/Typography";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import { persnoaldetailsupdate } from "Apis/Persnoldetailsform";

const TextFieldValidator = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

function PersnolDetailsForm(props) {
  const [commentbox, setCommentBox] = useState(false);
  const isFormFiled = props.userData;
  const [filedopen, setfiledOpen] = useState(true);
  const userID = localStorage.getItem("userID");
  const navigation = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [persnolquestion, setPersnolQuestion] = useState({
    interestindesirearea: "",
    surroundinghelpyou: "",
    Familyhelpyou: "",
    AcademicBackgroudhelpyou: "",
    professionalBackgroudyou: "",
    startedakingshapeinyourmind: "",
    shortandlongtermgoal: "",
    helpdesirecoursetohelpgoal: "",
    coursemakingsositybatterplace: "",
    ogicalculminationofyourprogress: "",
  });
  const [showInfo, setShoeInfo] = useState(false);
  const [persnoaldeata, setPersnoalData] = useState([]);

  const countWords = (str) => {
    return str.trim().split(/\s+/).length;
  };

  const handleClose = async () => {
    setOpen(false);
    if (showInfo) {
      try {
        const resp = await persnoaldetailsupdate(
          {
            examfromstatus: "1",
            persnoaldetailsfrom: JSON.stringify(persnoaldeata),
          },
          userID
        );
        if (resp.status === 200) {
          setOpen(false);
          navigation("/student/dashboard/default");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handlecancle = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    setOpen(true);
    const fieldValues = Object.values(persnolquestion);
    const allFieldsLongEnough = fieldValues.every((field) => countWords(field) >= 250);
    setShoeInfo(allFieldsLongEnough);

    if (allFieldsLongEnough) {
      setPersnoalData([
        ...persnoaldeata,
        { ...persnolquestion },
      ]);
    }
  };

  const savedefaultdata = async () => {
    const updatedData = [...persnoaldeata, persnolquestion];
    setPersnoalData(updatedData);
    console.log("persnoaldeata", updatedData);
    try {
      if (persnolquestion.interestindesirearea !== "") {
        const resp = await persnoaldetailsupdate(
          {
            persnoaldetailsfrom: JSON.stringify(updatedData),
          },
          userID
        );
        console.log("resp", resp);
        if (resp.status === 200) {
          setPersnolQuestion({});
        }
      }
    } catch (err) {
      console.log("x", err);
    }
  };

  const handleChange = (event) => {
    setCommentBox(false);
    setPersnolQuestion({
      ...persnolquestion,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      {commentbox && <Popup commentbox={commentbox} setCommentBox={setCommentBox} />}
      <ValidatorForm
        onSubmit={handleSubmit}
        onError={() => {
          setCommentBox(true);
        }}
      >
        <Grid></Grid>
        <Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <p>How Your Become Interested In Desired Area ? (min 250 Words)</p>
            <TextFieldValidator
              type="text"
              multiline
              name="interestindesirearea"
              onChange={handleChange}
              value={persnolquestion.interestindesirearea || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <p>How Your Surrounding Help You To Build Interest In Desired Area ? (min 250 Words)</p>
            <TextFieldValidator
              type="text"
              multiline
              name="surroundinghelpyou"
              onChange={handleChange}
              value={persnolquestion.surroundinghelpyou || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <p>How Your Family Help You To Build Interest For Desired Area? (min 250 Words)</p>
            <TextFieldValidator
              type="text"
              multiline
              name="Familyhelpyou"
              onChange={handleChange}
              value={persnolquestion.Familyhelpyou || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <p>How Your Academic Backgroud Help You To Build Interest For Desired Area ? (min 250 Words)</p>
            <TextFieldValidator
              type="text"
              multiline
              name="AcademicBackgroudhelpyou"
              onChange={handleChange}
              value={persnolquestion.AcademicBackgroudhelpyou || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <p>How Your Professional Backgroud Help You To Build Interest For Desired Area ? (min 250 Words)</p>
            <TextFieldValidator
              type="text"
              multiline
              name="professionalBackgroudyou"
              onChange={handleChange}
              value={persnolquestion.professionalBackgroudyou || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <p>When And At What Incidence You Goal Started Taking Shape In Your Mind And Why ? (min 250 Words)</p>
            <TextFieldValidator
              type="text"
              multiline
              name="startedakingshapeinyourmind"
              onChange={handleChange}
              value={persnolquestion.startedakingshapeinyourmind || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <p>What Is Your Short And Long Term Goal? (min 250 Words)</p>
            <TextFieldValidator
              type="text"
              multiline
              name="shortandlongtermgoal"
              onChange={handleChange}
              value={persnolquestion.shortandlongtermgoal || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <p>How This Course Will Help You To Achive Desired Goal? (min 250 Words)</p>
            <TextFieldValidator
              type="text"
              multiline
              name="helpdesirecoursetohelpgoal"
              onChange={handleChange}
              value={persnolquestion.helpdesirecoursetohelpgoal || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <p>How Pursing This Course Help You To Make World/society Better Place? (min 250 Words)</p>
            <TextFieldValidator
              type="text"
              multiline
              name="coursemakingsositybatterplace"
              onChange={handleChange}
              value={persnolquestion.coursemakingsositybatterplace || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <p>How Pursing This Course Is The Logical Culmination Of Your Growth / Progress? (min 250 Words)</p>
            <TextFieldValidator
              type="text"
              multiline
              name="ogicalculminationofyourprogress"
              onChange={handleChange}
              value={persnolquestion.ogicalculminationofyourprogress || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
          </Grid>
        </Grid>

        {!isFormFiled && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <Button color="primary" variant="contained" onClick={savedefaultdata} >
              <Icon>save</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Save</Span>
            </Button>
            <Button style={{ marginLeft: "10px" }} color="primary" variant="contained" type="submit">
              <Icon>save</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
            </Button>
          </div>
        )}
      </ValidatorForm>
      {isFormFiled && (
        <Dialog
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
        </Dialog>
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
              {Object.entries(persnolquestion).map(([key, value]) => (
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  key={key}
                >
                  <p style={{ margin: "0px 10px" }}>{key.replace(/([A-Z])/g, " $1")}</p>
                  <p style={{ color: countWords(value) < 250 ? "red" : "green" }}>
                    {countWords(value)}
                  </p>
                </div>
              ))}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handlecancle}>Cancel</Button>
          {showInfo && (
            <Button onClick={handleClose} autoFocus>
              OK
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PersnolDetailsForm;
