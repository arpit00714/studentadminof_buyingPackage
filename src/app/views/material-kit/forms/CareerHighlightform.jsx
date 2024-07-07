import React from "react";
import { Button, Grid, Icon, styled } from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { filesupload } from "Apis/filesupload";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { H3, Span } from "app/components/Typography";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import "moment/locale/de";
import apiUrl from "URLS/ApiUrl";
import { useNavigate } from "react-router-dom";
import { persnoaldetailsupdate } from "Apis/Persnoldetailsform";
const TextFieldValidator = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px"
}));
const datePickerStyles = {
  width: "100%",
  marginBottom: "16px"
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


const yesterday = moment().subtract(1, "day");
function CareerHighlightform(props) {
  const isFormFiled = props.userData;
  const [filedopen, setfiledOpen] = useState(true);
  const [errormsg, setErrormsg] = useState("")
  const navigation = useNavigate();
  const userID = localStorage.getItem("userID");
  const [open, setOpen] = useState(false);
  const [careerForm, setCareerForm] = useState("");
  const [companyProfile, setCompanyProfile] = useState("");
  const [careerBtn, setCareerBtn] = useState(true);
  const [CareerLIst, SetCareerList] = useState([]);
  const { compaName, companyWebLink, YourDesignation, SupervisorName, yourWorkSummary, TenureFrom, companyprofile } =
    careerForm;

  const handleChange = (event) => {
    event.persist();
    setCareerForm({ ...careerForm, [event.target.name]: event.target.value });
  };
  const HandleCompanyProfile = async (event) => {
    const file = event.target.files[0]; // Get the first file selected
    const fd = new FormData();
    fd.append("Company_profile", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    careerForm.companyLogo = data[0].filename;
    const fileName = file.name; // Get the file name
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCompanyProfile(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("Selected file:", file);
    console.log("File name:", fileName);
  };


  const HandleAddHighlights = () => {
    if (validate()) {
      setCareerBtn(true);
      setErrormsg("")
      if (compaName !== undefined) {
        SetCareerList([...CareerLIst, careerForm]);
        setCareerForm({});
      }
    }

  };
  const HandleSaveHighlights = () => {
    if (compaName !== undefined) {
      SetCareerList([...CareerLIst, careerForm]);
      setCareerForm({});
      setCareerBtn(false);
    }
  };

  const validate = () => {
    console.log("yourWorkSummary", careerForm.yourWorkSummary)
    const isValid = careerForm.yourWorkSummary.trim().split(/\s+/).length >= 250
    if (isValid) {
      setErrormsg("")
      return true;
    } else {
      setErrormsg("Please enter at least 250 words.")
      return false;
    }
  }

  const handleSubmit = async () => {
    if (validate()) {
      if (CareerLIst.length === 0) {
        const careerData = [...CareerLIst, careerForm]
        try {
          console.log("userIDSS", userID);
          const resp = await persnoaldetailsupdate(
            {
              CareerHighLightList: JSON.stringify(careerData)
            },
            userID
          );
          console.log("resp", resp);
          if (resp.status === 200) {
            setOpen(false);
            navigation("/student/material/Recomenderdetails");
          }
        } catch (err) {
          console.log(err);
          setOpen(false);
        }

      }
    }

  };


  const handleClose = async () => {
    try {
      console.log("userIDSS", userID);
      const resp = await persnoaldetailsupdate(
        {
          CareerHighLightList: JSON.stringify(CareerLIst)
        },
        userID
      );
      console.log("resp", resp);
      if (resp.status === 200) {
        setOpen(false);
        navigation("/student/material/Recomenderdetails");
      }
    } catch (err) {
      console.log(err);
      setOpen(false);
    }
  };


  const handledeletevisitedCountry = (index) => {
    const updatevisitedcountry = [...CareerLIst];
    updatevisitedcountry.splice(index, 1);
    SetCareerList(updatevisitedcountry);
  };


  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        {CareerLIst.map((item, key) => {
          return (
            <div
              key={key}
              style={{ margin: "20px 0px", borderBottom: "1px solid", padding: "10px 0px" }}
            >
              <div style={{ display: "flex", justifyContent: "end", zIndex: 99, cursor: "pointer" }}>
                <DeleteIcon
                  style={{ zIndex: 99, cursor: "pointer" }}
                  onClick={() => {
                    handledeletevisitedCountry(key);
                  }}
                /></div>
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextFieldValidator
                    type="text"
                    label="Company Name"
                    onChange={handleChange}
                    value={item.compaName || ""}
                    disabled
                  />
                  {item.companyLogo && (
                    <div style={{ margin: "20px 0px" }}>
                      <p>Company Profile</p>
                      <img
                        src={`${apiUrl}/api/${item.companyLogo}`}
                        alt="companyProfile"
                        style={{ width: "100px", height: "50px", margin: "10px 0px" }}
                      />
                    </div>
                  )}

                  <TextFieldValidator
                    disabled
                    type="text"
                    label="Company Website"
                    onChange={handleChange}
                    value={item.companyWebLink || ""}
                  />
                  <TextFieldValidator
                    disabled
                    type="text"
                    label="Tenure From"
                    onChange={handleChange}
                    value={item.TenureFrom || ""}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextFieldValidator
                    type="text"
                    disabled
                    label="Your Designation"
                    onChange={handleChange}
                    value={item.YourDesignation || ""}
                  />
                  <TextFieldValidator
                    type="text"
                    disabled
                    label="Name and designation of Supervisor you work under"
                    onChange={handleChange}
                    value={item.SupervisorName || ""}
                  />
                  <TextFieldValidator
                    type="text"
                    disabled
                    label="Summary of work Profile (250 Words)"
                    onChange={handleChange}
                    value={item.yourWorkSummary || ""}
                  />
                  <TextFieldValidator
                    type="text"
                    disabled
                    label="Tenure To"
                    onChange={handleChange}
                    value={item.TenureTo || ""}
                  />
                </Grid>
              </Grid>
            </div>
          );
        })}
        <div style={{ display: "flex", alignItems: "center" }}>
          <H3>Career Highlight</H3>
          <Button
            color="primary"
            variant="contained"
            style={{ marginLeft: "20px" }}
            onClick={HandleAddHighlights}
          >
            <Icon>add</Icon>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
          </Button>
        </div>
        {careerBtn && (
          <div>

            <Grid container spacing={6}>

              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextFieldValidator
                  type="text"
                  name="compaName"
                  label="Company Name"
                  onChange={handleChange}
                  value={compaName || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                {/* Company Profile */}
                {/* <TextareaAutosize style={{ width: "100%", padding: "15px" }} placeholder="Company profile" onChange={handleChange}
                  value={companyprofile || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]} /> */}
                <TextFieldValidator
                  type="text"
                  name="companyprofile"
                  label="Company profile"
                  onChange={handleChange}
                  value={companyprofile || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                {/* <TextFieldValidator
                  type="file"
                  //   label="Company Profile"
                  onChange={HandleCompanyProfile}
                /> */}
                {/* {companyProfile && (
                  <img
                    src={companyProfile}
                    alt="companyProfile"
                    style={{ width: "100px", height: "50px", margin: "10px 0px" }}
                  />
                )} */}
                <TextFieldValidator
                  type="text"
                  name="companyWebLink"
                  label="Company Website"
                  onChange={handleChange}
                  value={companyWebLink || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <div style={datePickerStyles}>
                  <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                    <DatePicker
                      label="Tenure From"
                      onChange={(e) => {
                        console.log("rwe", e.format("YYYY-MM-DD"));
                        setCareerForm((pre) => ({
                          ...pre,
                          TenureFrom: e.format("YYYY-MM-DD")
                        }));
                      }}
                      maxDate={yesterday}
                    />
                  </LocalizationProvider>
                </div>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextFieldValidator
                  type="text"
                  name="YourDesignation"
                  label="Your Designation"
                  onChange={handleChange}
                  value={YourDesignation || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextFieldValidator
                  type="text"
                  name="SupervisorName"
                  label="Name and designation of Supervisor you work under"
                  onChange={handleChange}
                  value={SupervisorName || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />

                <TextareaAutosize style={{ width: "100%", marginBottom: "16px", padding: "10px" }}
                  placeholder="Summary of work Profile (min 250 Words)"
                  name="yourWorkSummary"
                  onChange={handleChange}
                  value={yourWorkSummary || ""}

                />
                {errormsg &&
                  <div style={{ color: 'red', marginBottom: '16px' }}>
                    {errormsg}
                  </div>
                }
                <div style={datePickerStyles}>
                  <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                    <DatePicker
                      label="Tenure To"
                      onChange={(e) => {
                        setCareerForm((pre) => ({
                          ...pre,
                          TenureTo: e.format("YYYY-MM-DD")
                        }));
                      }}
                      maxDate={yesterday}
                    />
                  </LocalizationProvider>
                </div>
              </Grid>
            </Grid>
          </div>
        )}

        {!isFormFiled && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              margin: "40px auto"
            }}
          >
            <Button color="primary" variant="contained" type="submit">
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Next & Continue</Span>
              <Icon>navigate_next</Icon>
            </Button>
          </div>
        )}
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
    </div>
  );
}

export default CareerHighlightform;
