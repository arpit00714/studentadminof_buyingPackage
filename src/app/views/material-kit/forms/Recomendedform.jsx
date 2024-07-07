// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/lab/DesktopDatePicker";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "moment/locale/de";
import Dialog from "@mui/material/Dialog";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete, Button, Grid, Icon, styled } from "@mui/material";
import TextField from "@mui/material/TextField";
import { H3, Span } from "app/components/Typography";
import { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Fragment } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { persnoaldetailsupdate } from "Apis/Persnoldetailsform";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
const AutoComplete = styled(Autocomplete)(() => ({ width: 300, marginBottom: "16px" }));
const suggestio = [
  {
    label: "Professional"
  },
  {
    label: "Academic"
  }
];
const TextFieldvalidator = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px"
}));

const datePickerStyles = {
  width: "100%", // Adjust width as needed// Center the date picker
  marginBottom: "16px" // Add some top margin
};

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 10px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);
function Recomendedform(props) {
  const isFormFiled = props.userData;
  const [filedopen, setfiledOpen] = useState(true);
  const [errormsg, setErrormsg] = useState("")
  const [commentbox, setCommentBox] = useState(false)
  const [recemenderform, setRecemenderform] = useState("");
  const [recomenderlist, setRecomenderlist] = useState([]);
  const [open, setOpen] = useState(false);
  const userID = localStorage.getItem("userID");
  console.log("userID", userID);
  const navigation = useNavigate();
  const [Recemendorbtn, setRecemendorbtn] = useState(true);
  const {
    typeofrecemonder,
    Nameofrecommender,
    Qualificationofrecommender,
    Designationofrecommender,
    Phonenoofrecommende,
    DepartmentofRecommender,
    Mobilenumberofrecommender,
    cameincontactwithrecommender,
    emailofrecommender,
    Tenureoflinkage,
    CompleteDescriptionofworkwithrecemomder
  } = recemenderform;

  const handleChange = (event, index) => {
    setCommentBox(false)
    setRecemenderform({ ...recemenderform, [event.target.name]: event.target.value });
  };

  const handleaddrecomendation = () => {
    if (typeofrecemonder) {
      if (validate()) {
        setErrormsg("")
        setRecemendorbtn(true);
        setRecomenderlist([...recomenderlist, recemenderform]);
        setRecemenderform({});
      }
    }


  };

  const handleasaverecomendation = () => {
    if (typeofrecemonder) {
      setRecemendorbtn(false);
      setRecomenderlist([...recomenderlist, recemenderform]);
    }
    setRecemenderform({});
  };
  const HandledeleterecomenderDetails = (index) => {
    const updatedata = [...recomenderlist];
    updatedata.splice(index, 1);
    setRecomenderlist(updatedata);
  };

  const validate = () => {
    const validate = CompleteDescriptionofworkwithrecemomder.trim().split(/\s+/).length >= 250
    if (validate) {
      setErrormsg("")
      return true
    }
    else {
      setErrormsg("Please Enter Min 250 Character")
      return false
    }
  }

  const handleSubmit = async () => {
    if (validate()) {
      const recemonderdataa = [...recomenderlist, recemenderform]
      console.log("fd");
      try {
        const resp = await persnoaldetailsupdate(
          {
            recemonderform: JSON.stringify(recemonderdataa)
          },
          userID
        );
        console.log("resp", resp);
        if (resp.status === 200) {
          setOpen(false);
          navigation("/student/material/DesireCource");
        }
      } catch (err) {
        console.log(err);
      }
    }

  };

  const handleClose = async () => {
    try {
      const resp = await persnoaldetailsupdate(
        {
          recemonderform: JSON.stringify(recomenderlist)
        },
        userID
      );
      console.log("resp", resp);
      if (resp.status === 200) {
        setOpen(false);
        navigation("/student/material/DesireCource");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        {recomenderlist?.map((item, key) => {
          return (
            <div key={key} style={{ padding: "15px 15px", borderBottom: "1px solid" }}>
              <div
                style={{
                  width: "100%",
                  margin: "10px 0px",
                  display: "flex",
                  justifyContent: "end",
                  padding: "10px",
                  cursor: "pointer"
                }}
              >
                <DeleteIcon
                  onClick={() => {
                    HandledeleterecomenderDetails(key);
                  }}
                />
              </div>
              <Grid></Grid>
              <H3>{item.typeofrecemonder}</H3>
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    style={{ width: "100%", marginTop: "15px" }}
                    type="text"
                    name="Nameofrecommender"
                    disabled={true}
                    label="Name Of Recommender:"
                    value={item.Nameofrecommender || ""}
                  />
                  <TextField
                    style={{ width: "100%", marginTop: "15px" }}
                    type="text"
                    name="Qualificationofrecommender"
                    label="Qualification Of Recommender:"
                    disabled={true}
                    value={item.Qualificationofrecommender || ""}
                  />
                  <TextField
                    type="text"
                    style={{ width: "100%", marginTop: "15px" }}
                    name="Designationofrecommender"
                    label="Designation Of Recommender:"
                    disabled={true}
                    value={item.Designationofrecommender || ""}
                  />
                  <TextField
                    style={{ width: "100%", marginTop: "15px" }}
                    type="text"
                    name="Phonenoofrecommende"
                    label="Phone No Of Recommender:"
                    disabled={true}
                    value={item.Phonenoofrecommende || ""}
                  />
                  <TextField
                    style={{ width: "100%", marginTop: "15px" }}
                    type="text"
                    disabled={true}
                    label="Department Of Recommender:"
                    value={item.DepartmentofRecommender || ""}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    style={{ width: "100%", marginTop: "15px" }}
                    type="text"
                    disabled={true}
                    label="Mobile Of Recommender:"
                    value={item.Mobilenumberofrecommender || ""}
                  />
                  <TextField
                    style={{ width: "100%", marginTop: "15px" }}
                    type="text"
                    disabled={true}
                    label="Connection with  Recommender:"
                    value={item.cameincontactwithrecommender || ""}
                  />
                  <TextField
                    style={{ width: "100%", marginTop: "15px" }}
                    type="text"
                    disabled={true}
                    label="Email Of Recommender:"
                    value={item.emailofrecommender || ""}
                  />
                  <TextField
                    style={{ width: "100%", marginTop: "15px" }}
                    type="text"
                    disabled={true}
                    label="Tenure Of Linkage:"
                    value={item.Tenureoflinkage || ""}
                  />
                  <TextField
                    style={{ width: "100%", marginTop: "15px" }}
                    type="text"
                    disabled={true}
                    label="Complete Description Of Work With Him/her(Write At Least 6 Sentence): Subject Taught By Him Or Project Or Training Done Under Him:"
                    value={item.CompleteDescriptionofworkwithrecemomder || ""}
                  />
                </Grid>
              </Grid>
            </div>
          );
        })}
      </div>
      {commentbox && <Popup commentbox={commentbox} setCommentBox={setCommentBox} />}
      <ValidatorForm onSubmit={handleSubmit} onError={() => {
        setCommentBox(true)
      }} >

        <div>
          <Grid></Grid>
          {/* <H3>Type Of Recommender </H3> */}
          <div style={{ display: "flex", alignItems: "center", margin: "20px 0px" }}>
            <AutoComplete
              options={suggestio}
              getOptionLabel={(option) => option.label}
              onChange={(e, val) => {
                setRecemenderform({ ...recemenderform, typeofrecemonder: val?.label });
                console.log("ee", val?.label);
              }}
              renderInput={(params) => (
                <TextFieldvalidator
                  {...params}
                  label="Type Of Recommende "
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Button
              onClick={handleaddrecomendation}
              color="primary"
              variant="contained"
              style={{ marginLeft: "20px", marginTop: "-50px" }}
            >
              <Icon>add</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
            </Button>
          </div>
          {Recemendorbtn && (
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>


                <TextFieldvalidator
                  type="text"
                  name="Nameofrecommender"
                  label="Name Of Recommender:"
                  onChange={handleChange}
                  value={Nameofrecommender || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextFieldvalidator
                  type="text"
                  name="Qualificationofrecommender"
                  label="Qualification Of Recommender:"
                  onChange={handleChange}
                  value={Qualificationofrecommender || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextFieldvalidator
                  type="text"
                  name="Designationofrecommender"
                  label="Designation Of Recommender:"
                  onChange={handleChange}
                  value={Designationofrecommender || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextFieldvalidator
                  type="number"
                  name="Phonenoofrecommende"
                  label="Phone No Of Recommender:"
                  onChange={handleChange}
                  value={Phonenoofrecommende || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />

              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextFieldvalidator
                  type="text"
                  name="DepartmentofRecommender"
                  label="Department Of Recommender:"
                  onChange={handleChange}
                  value={DepartmentofRecommender || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextFieldvalidator
                  type="number"
                  name="Mobilenumberofrecommender"
                  label="Mobile Number Of Recommender:"
                  onChange={handleChange}
                  value={Mobilenumberofrecommender || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextFieldvalidator
                  type="text"
                  name="cameincontactwithrecommender"
                  label="Name Of University And Institute Where You Came In Contact With Recommender:"
                  onChange={handleChange}
                  value={cameincontactwithrecommender || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextFieldvalidator
                  type="text"
                  name="emailofrecommender"
                  label="Email Address Of Recommender:"
                  onChange={handleChange}
                  value={emailofrecommender || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextFieldvalidator
                  type="text"
                  name="Tenureoflinkage"
                  label="Tenure Of Linkage :"
                  onChange={handleChange}
                  value={Tenureoflinkage || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />

                <TextareaAutosize style={{ width: "100%", marginBottom: "16px", padding: "10px" }}
                  placeholder="Complete Description of work with recommender (min 250 Words)"
                  name="CompleteDescriptionofworkwithrecemomder"
                  onChange={handleChange}
                  value={CompleteDescriptionofworkwithrecemomder || ""}
                />
                {errormsg &&
                  <div style={{ color: 'red', marginBottom: '16px' }}>
                    {errormsg}
                  </div>
                }
                {/* <TextFieldvalidator
                  type="text"
                  name="CompleteDescriptionofworkwithrecemomder"
                  label="Complete Description Of Work With Him/her(Write At Least 6 Sentence): Subject Taught By Him Or Project Or Training Done Under Him "
                  onChange={handleChange}
                  value={CompleteDescriptionofworkwithrecemomder || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                /> */}
              </Grid>
            </Grid>

          )}

        </div>


        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px"
          }}
        >
          {/* {Recemendorbtn && (
            <Button onClick={handleasaverecomendation} color="primary" variant="contained">
              <Icon>done</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Save</Span>
            </Button>
          )} */}

        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px"
          }}
        >
          <Button color="primary" variant="contained" type="submit">
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Next & Continue</Span>
            <Icon>navigate_next</Icon>
          </Button>
        </div>
      </ValidatorForm>

      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Submit"}</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>

      {isFormFiled && (
        <Dialog
          open={filedopen}
          // onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"You Have Already Filed The Form"}</DialogTitle>
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
    </div>
  );
}

export default Recomendedform;
