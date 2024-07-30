import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "moment/locale/fr";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  styled
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from "@mui/icons-material/Delete";
import { H3, H4, Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import { persnoaldetails, persnoaldetailsupdate, studentData } from "Apis/Persnoldetailsform";
import { filesupload } from "Apis/filesupload";
import { SimpleCard } from "app/components";
import Popup from "./Popup";
const TextFieldValidator = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px"
}));

const datePickerStyles = {
  width: "100%",
  marginBottom: "16px"
};

const SimpleForm = (props) => {
  console.log("props.userData", props.userData);
  const isFormFiled = props.userData;
  const [filedopen, setfiledOpen] = useState(true);
  const [open, setOpen] = useState(false);

  const navigation = useNavigate();
  const [state, setState] = useState({ date: new Date() });
  const [studentimage, setstudentimage] = useState("");
  const [aadharcardimage, setaadharcardimage] = useState("");
  const [filevalue, setFileValue] = useState("")
  const [birthCertificate, setBIrthcertificate] = useState("");
  const [passportfront, setpassportfront] = useState("");
  const [passportback, setpassportback] = useState("");
  const [visastatus, setvisastatus] = useState("");
  const [countryvisite, setcountryvisite] = useState("");
  const yesterday = moment().subtract(1, "day");
  const [getcountryVisited, SetCountoryVisited] = useState([]);
  const [parentsList, SetParentsList] = useState([]);
  const [SiblingsList, SetSiblingsList] = useState([]);
  const [persnoldetailsSubmitedData, SetPersnoldetailsData] = useState([]);
  const [havesiblng, setHavesiblings] = useState("");
  const [showparentmore, setShowparentaddmore] = useState(true);
  const userID = localStorage.getItem("userID");
  const [commentbox, setCommentBox] = useState(false)
  console.log("userID", userID);

  const [userexamType, setUserExamType] = useState("");
  useEffect(() => {
    const check = async () => {
      const resp = await studentData(userID);
      if (resp.status === 200) {
        const data = await resp.json();
        console.log("data", data);
        const examtype = data.message[0]?.examtype;
        console.log("examtype", examtype);
        setUserExamType(examtype);
        // console.log("useEffectrespdata", data.message[0]?.examtype)
      }
    };
    check();
  }, [userID]);

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [state.password]);

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });

  };

  const handlevisastatus = (event) => {
    setvisastatus(event.target.value);
    console.log("event.target.value", event.target.value);
  };

  const handlecountryvisited = (event) => {
    setcountryvisite(event.target.value);
    console.log("event.target.value", event.target.value);
  };
  const handlesibvlings = (event) => {
    setHavesiblings(event.target.value);
    console.log("event.target.value", event.target.value);
  };
  const {
    address,
    firstName,
    city,
    selectedstate,
    Country,
    pincode,
    basicstudentimage,
    basicstudentimage1,
    basicstuadharimage,
    basicstuadharimage1,
    dateofbirth,
    cityofbirth,
    stateofbirth,
    countyofbirth,
    birthcertificate,
    birthcertificate1,
    PassportNumber,
    placeofissue,
    passportrejectionreason,
    passportfrontimage,
    passportfrontimage1,
    passportbackimage,
    passportbackimage1,
    wherecountyvisited,
    parentsdetails,
    parentrelation,
    emailofparents,
    phonenumberofparents,
    levelofeducation,
    degreename,
    universityname,
    professionofparents,
    Designation,
    nameofsibiling,
    relationwithsibling,
    educationlevelofsibling,
    universityofsibling,
    countryofsibling
  } = state;

  const [visitcountrybtn, setvisitcountryBtn] = useState(true);
  const handleAddvisitedCountry = () => {
    
    setvisitcountryBtn(true);
    if (wherecountyvisited) {
      SetCountoryVisited([
        ...getcountryVisited,
        {
          where: wherecountyvisited,
          dateofexit: state.countyexitdate,
          dateofentry: state.countyentrydate
        }
      ]);
      state.wherecountyvisited = "";
    }
  };

  const handleDonevisitedCountry = () => {
    if (wherecountyvisited !== "") {
      setvisitcountryBtn(false);
      SetCountoryVisited([
        ...getcountryVisited,
        {
          where: wherecountyvisited,
          dateofexit: state.countyexitdate,
          dateofentry: state.countyentrydate
        }
      ]);
      state.wherecountyvisited = "";
    }
  };

  const handleparentsList = (index) => {
    const updateparentslist = [...parentsList];
    updateparentslist.splice(index, 1);
    SetParentsList(updateparentslist);
  };

  const handlesiblingList = (index) => {
    const updateSiblingsList = [...SiblingsList];
    updateSiblingsList.splice(index, 1);
    SetSiblingsList(updateSiblingsList);
  };
  const image_validation = (type) => { 
    if (type == 'image/jpeg' || type == 'image/png') {
      return true;
    } else {
      alert("Please select only jpg,jpeg,png file")
      return false;
    }
  }
  const onselectstudentimage = async (event) => {
    const file = event?.target?.files[0]; // Get the first file selected
    const valid = image_validation(file?.type)
    if (valid) { } else { setstudentimage(""); return; }
    const fd = new FormData();
    fd.append("student_image", file);
    const data = await filesupload(fd);
    // setFileValue("ancd")
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    state.basicstudentimage = data[0].filename;
    setState({ ...state, [event.target.name]: event.target.value });
    const fileName = file.name; // Get the file name
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setstudentimage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("Selected file:", file);
    console.log("File name:", fileName);
  };

  const Selectaadharcardimage = async (event) => {
    const file = event?.target?.files[0]; // Get the first file selected
    const valid = image_validation(file?.type)
    if (valid) { } else { setaadharcardimage(""); return; }
    const fileName = file.name;
    const fd = new FormData();
    fd.append("student_adhar_image", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    state.basicstuadharimage = data[0].filename;
    setState({ ...state, [event.target.name]: event.target.value });
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setaadharcardimage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("Selected file:", file);
    console.log("File name:", fileName);
  };

  const onchangebirthcertificate = async (event) => {
    const file = event?.target?.files[0]; // Get the first file selected
    const valid = image_validation(file?.type)
    if (valid) { } else { setBIrthcertificate(""); return; }
    const fileName = file.name;
    const fd = new FormData();
    fd.append("birth_certificate", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    state.birthcertificate = data[0].filename;
    setState({ ...state, [event.target.name]: event.target.value });
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBIrthcertificate(e.target.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("Selected file:", file);
    console.log("File name:", fileName);
  };

  const onselectpassportfrontpage = async (event) => {
    const file = event?.target?.files[0]; // Get the first file selected
    const valid = image_validation(file?.type)
    if (valid) { } else { setpassportfront(""); return; }
    const fileName = file.name;
    const fd = new FormData();
    fd.append("passport_front_image", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    state.passportfrontimage = data[0].filename;
    setState({ ...state, [event.target.name]: event.target.value });
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setpassportfront(e.target.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("Selected file:", file);
    console.log("File name:", fileName);
  };

  const onselectpassportBackpage = async (event) => {
    const file = event?.target?.files[0]; // Get the first file selected
    const valid = image_validation(file?.type)
    if (valid) { } else { setpassportback(""); return; }
    const fileName = file.name;
    const fd = new FormData();
    fd.append("passport_back_image", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    state.passportbackimage = data[0].filename;
    setState({ ...state, [event.target.name]: event.target.value });
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setpassportback(e.target.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("Selected file:", file);
    console.log("File name:", fileName);
  };

  const handledeletevisitedCountry = (index) => {
    const updatevisitedcountry = [...getcountryVisited];
    updatevisitedcountry.splice(index, 1);
    SetCountoryVisited(updatevisitedcountry);
  };

  const HandleAddParents = () => {
    if (parentsdetails !== "") {
      SetParentsList([
        ...parentsList,
        {
          parentsdetails,
          parentrelation,
          emailofparents,
          phonenumberofparents,
          levelofeducation,
          degreename,
          universityname,
          Designation,
          yearofworking: state.parentsyearofworkingsince,
          yearofpassing: state.parentsyearofpassing,
          professionofparents
        }
      ]);
      state.parentsdetails = "";
      state.parentrelation = "";
      state.emailofparents = "";
      state.phonenumberofparents = "";
      state.levelofeducation = "";
      state.degreename = "";
      state.universityname = "";
      state.Designation = "";
      state.professionofparents = "";
      setShowparentaddmore(false);
    }
  };
  const HandleAddmoreParents = () => {
    // if (parentsdetails) {
      SetParentsList([
        ...parentsList,
        {
          parentsdetails,
          parentrelation,
          emailofparents,
          phonenumberofparents,
          levelofeducation,
          degreename,
          universityname,
          Designation,
          yearofworking: state.parentsyearofworkingsince,
          yearofpassing: state.parentsyearofpassing,
          professionofparents
        }
      ]);
      state.parentsdetails = "";
      state.parentrelation = "";
      state.emailofparents = "";
      state.phonenumberofparents = "";
      state.levelofeducation = "";
      state.degreename = "";
      state.universityname = "";
      state.Designation = "";
      state.professionofparents = "";
    // }
    setShowparentaddmore(true);
  };
  const [showsibdonebtn, setsibdonebtn] = useState(true);
  
  const handleAddSiblings = () => {
    if (nameofsibiling !== "") {
      SetSiblingsList([
        ...SiblingsList,
        {
          nameofsibiling,
          relationwithsibling,
          educationlevelofsibling,
          universityofsibling,
          countryofsibling,
          dateofborthofsibling: state.dobofsibling
        }
      ]);
      state.nameofsibiling = "";
      state.relationwithsibling = "";
      state.educationlevelofsibling = "";
      state.universityofsibling = "";
      state.countryofsibling = "";
      setsibdonebtn(false);
    }
  };
  const handleAddmoreSiblings = () => {
    if (nameofsibiling) {
      SetSiblingsList([
        ...SiblingsList,
        {
          nameofsibiling,
          relationwithsibling,
          educationlevelofsibling,
          universityofsibling,
          countryofsibling,
          dateofborthofsibling: state.dobofsibling
        }
      ]);
      state.nameofsibiling = "";
      state.relationwithsibling = "";
      state.educationlevelofsibling = "";
      state.universityofsibling = "";
      state.countryofsibling = "";
    }
    setsibdonebtn(true);
  };
  const basisdata = {
    firstName,
    address,
    city,
    selectedstate,
    Country,
    pincode,
    basicstudentimage,
    basicstuadharimage
  };
  const birthdata = {
    cityofbirth,
    stateofbirth,
    countyofbirth,
    DateofBIrth: state.DateofBIrth,
    birthcertificate
  };
  const passportdata = {
    PassportNumber,
    placeofissue,
    PassportdateofIssue: state.PassportdateofIssue,
    Passportexpairdate: state.Passportexpairdate,
    passportfrontimage,
    passportbackimage
  };

  const handleSubmit = async (event) => {
    console.log("submitted");
    const visidata = [...getcountryVisited,
    {
      where: wherecountyvisited,
      dateofexit: state.countyexitdate,
      dateofentry: state.countyentrydate
    }]
    const parentlist = [...parentsList, {
      parentsdetails,
      parentrelation,
      emailofparents,
      phonenumberofparents,
      levelofeducation,
      degreename,
      universityname,
      Designation,
      yearofworking: state.parentsyearofworkingsince,
      yearofpassing: state.parentsyearofpassing,
      professionofparents
    }]
    console.log("parentlist", parentlist)
    // setOpen(true);
    const sblingList = [...SiblingsList, {
      nameofsibiling,
      relationwithsibling,
      educationlevelofsibling,
      universityofsibling,
      countryofsibling,
      dateofborthofsibling: state.dobofsibling
    }]
    const visadata = {
      isvisarejected: visastatus,
      rejectionreason: passportrejectionreason,
      isothercountryvisited: countryvisite,
      visitedsumary: visidata,
      visarejectDate: state.visaDateRejection
    };

    const updatedata = [...persnoldetailsSubmitedData, {
      Basic: basisdata,
      BirthDetails: birthdata,
      passportandvisa: passportdata,
      visa: visadata,
      parentsdetails: parentlist,
      havesibling: havesiblng,
      SiblingsList: sblingList
    }]

    console.log("updatedata", updatedata)
    try {
      console.log("userIDSS", userID);
      const resp = await persnoaldetailsupdate(
        {
          persnoldetailsstatus: "done",
          persnoldetailsform: JSON.stringify(updatedata)
        },
        userID
      );
      console.log("resp", resp);
      if (resp.status === 200) {
        setOpen(false);
        SetPersnoldetailsData({});
        if (userexamType === "Ug") {
          navigation("/student/material/UgAcademic");
        } else {
          navigation("/student/material/Academicdetails");
        }
      }
    } catch (err) {
      console.log(err);
    }
    // console.log(event);
  };
  const handleClose = async () => {
    console.log("persnoldetailsSubmitedData", persnoldetailsSubmitedData);
    // setOpen(false);
    try {
      console.log("userIDSS", userID);
      const resp = await persnoaldetailsupdate(
        {
          persnoldetailsstatus: "done",
          persnoldetailsform: JSON.stringify(persnoldetailsSubmitedData)
        },
        userID
      );
      console.log("resp", resp);
      if (resp.status === 200) {
        setOpen(false);
        SetPersnoldetailsData({});
        if (userexamType === "Ug") {
          navigation("/student/material/UgAcademic");
        } else {
          navigation("/student/material/Academicdetails");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {commentbox && <Popup commentbox={commentbox} setCommentBox={setCommentBox} />}
      <SimpleCard title="Personnel Detail">

        <ValidatorForm onSubmit={handleSubmit} onError={() => {
          setCommentBox(true)
        }} instantValidate>
          <div style={{ border:"2px solid #00000080",padding:"20px",marginBottom:"20px"}}>
          <H3>Basic</H3>
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextFieldValidator
                type="text"
                name="firstName"
                label="Name"
                onChange={handleChange}
                value={firstName || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextFieldValidator
                type="text"
                name="address"
                label="Address"
                value={address || ""}
                onChange={handleChange}
                validators={["required"]}
                errorMessages={["this field is required", "address is not valid"]}
              />
              <TextFieldValidator
                type="number"
                name="pincode"
                label="Pincode"
                value={pincode || ""}
                onChange={handleChange}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }} // Add input mode and pattern
                validators={["required", "isNumber"]} // Add a validator for checking if it's a number
                errorMessages={["This field is required", "Must be a valid pincode"]}
                />
                

                <div><div>Student image</div>
                  <div> <input
                    type="file"
                    name="basicstudentimage1"
                    onChange={onselectstudentimage}
                    accept=".jpg, .jpeg, .png"
                    required
                  /></div></div>
              {studentimage && (
                <img src={studentimage} alt="dvd" style={{ maxWidth: "100px", maxHeight: "100px" }} />
              )}
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextFieldValidator
                type="text"
                name="city"
                label="City"
                onChange={handleChange}
                value={city || ""}
                errorMessages={["this field is required"]}
                validators={["required"]}
              />
              <TextFieldValidator
                type="text"
                name="selectedstate"
                label="State"
                onChange={handleChange}
                value={selectedstate || ""}
                errorMessages={["this field is required"]}
                validators={["required"]}
              />
              <TextFieldValidator
                name="Country"
                type="text"
                label="Country"
                value={Country || ""}
                onChange={handleChange}
                validators={["required"]}
                errorMessages={["this field is required"]}
                />
                <div>
                  <div> Aadhar card image</div>
                  <div><input
                    type="file"
                    name="basicstuadharimage1"
                    onChange={Selectaadharcardimage}
                    accept=".jpg, .jpeg, .png"
                    required
                  /></div>
                </div>
                
              {aadharcardimage && (
                <img
                  src={aadharcardimage}
                  alt="dvd"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              )}
            </Grid>
          </Grid>
          </div>
         
          <div style={{ border: "2px solid #00000080", padding: "20px", marginBottom: "20px" }}>
          <H3>Birth Detail</H3>
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              Date of Birth
              <div style={datePickerStyles}>
                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                  <DatePicker
                    onChange={(e) => {
                      console.log("rwe", e.format("YYYY-MM-DD"));
                      setState((pre) => ({
                        ...pre,
                        DateofBIrth: e.format("YYYY-MM-DD")
                      }));
                    }}
                    maxDate={yesterday}
                  />
                </LocalizationProvider>
              </div>
              <TextFieldValidator
                type="text"
                name="cityofbirth"
                label="City of Birth"
                value={cityofbirth || ""}
                onChange={handleChange}
                validators={["required"]}
                errorMessages={["this field is required", "address is not valid"]}
              />
              <TextFieldValidator
                type="type"
                name="stateofbirth"
                label="State of Birth "
                value={stateofbirth || ""}
                onChange={handleChange} // Add input mode and pattern
                validators={["required"]} // Add a validator for checking if it's a number
                errorMessages={["This field is required"]}
              />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextFieldValidator
                type="text"
                name="countyofbirth"
                label="Country of Birth"
                onChange={handleChange}
                value={countyofbirth || ""}
                errorMessages={["this field is required"]}
                validators={["required"]}
                />
                <div><div>Upload Birth certificate</div>
                  <div><input
                    type="file"
                    name="birthcertificate1"
                    onChange={onchangebirthcertificate}
                    accept=".jpg, .jpeg, .png"
                    required
                  /></div></div>
                
              {birthCertificate && (
                <img
                  src={birthCertificate}
                  alt="dvd"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              )}
            </Grid>
          </Grid>
          </div>
         
          <div style={{ border: "2px solid #00000080", padding: "20px", marginBottom: "20px" }}>
          <H3>Passport</H3>
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextFieldValidator
                type="text"
                name="PassportNumber"
                label="Passport Number"
                onChange={handleChange}
                value={PassportNumber || ""}
                errorMessages={["this field is required"]}
                validators={["required"]}
              />
              Date of issue
              <div style={datePickerStyles}>
                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                  <DatePicker
                    onChange={(e) => {
                      console.log("rwe", e.format("YYYY-MM-DD"));
                      setState((pre) => ({
                        ...pre,
                        PassportdateofIssue: e.format("YYYY-MM-DD")
                      }));
                    }}
                  // maxDate={yesterday}
                  />
                </LocalizationProvider>
              </div>
              Date of Expiry
              <div style={datePickerStyles}>
                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                  <DatePicker
                    onChange={(e) => {
                      console.log("rwe", e.format("YYYY-MM-DD"));
                      setState((pre) => ({
                        ...pre,
                        Passportexpairdate: e.format("YYYY-MM-DD")
                      }));
                    }}
                  // maxDate={yesterday}
                  />
                </LocalizationProvider>
              </div>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextFieldValidator
                type="text"
                name="placeofissue"
                label="Place of issue"
                onChange={handleChange}
                value={placeofissue || ""}
                errorMessages={["this field is required"]}
                validators={["required"]}
                />
                <div> <div>Upload front page of Passport</div>
                  <div> <input
                    type="file"
                    name="passportfrontimage1"
                    onChange={onselectpassportfrontpage}
                    accept=".jpg, .jpeg, .png"
                    required
                  /></div></div>
               
              {passportfront && (
                <img
                  src={passportfront}
                  alt="dvd"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
                )}
                <div><div>Upload back page of Passport</div>
                  <div> <input
                    type="file"
                    name="passportbackimage1"
                    onChange={onselectpassportBackpage}
                    accept=".jpg, .jpeg, .png"
                    required
                  /></div></div>
                
              {passportback && (
                <img src={passportback} alt="dvd" style={{ maxWidth: "100px", maxHeight: "100px" }} />
              )}
            </Grid>
          </Grid>
          </div>
          
          <div style={{ border: "2px solid #00000080", padding: "20px", marginBottom: "20px" }}>
          <H3>Visa</H3>
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <div>
                {/* <H4>Have Your Visa got rejected</H4> */}
                <FormLabel component="legend">Have your visa got rejected ? </FormLabel>
                <RadioGroup
                  value={visastatus}
                  name="gender1"
                  className="group"
                  aria-label="Gender"
                  onChange={handlevisastatus}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="yes" />
                  <FormControlLabel value="no" control={<Radio />} label="no" />
                </RadioGroup>
              </div>
              {visastatus === "yes" && (
                <div>
                  <TextFieldValidator
                    type="text"
                    name="passportrejectionreason"
                    label="State reason for rejection"
                    value={passportrejectionreason || ""}
                    onChange={handleChange}
                    validators={["required"]}
                    errorMessages={["this field is required", "address is not valid"]}
                  />
                  <div style={datePickerStyles}>
                    <p>Date OF Rejection</p>
                    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                      <DatePicker
                        onChange={(e) => {
                          setState((pre) => ({
                            ...pre,
                            visaDateRejection: e.format("YYYY-MM-DD")
                          }));
                        }}
                      // maxDate={yesterday}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
              )}
            </Grid>
          </Grid>

          {visastatus === "no" && (
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <FormLabel component="legend">Have you ever been to other country ? </FormLabel>
                <RadioGroup
                  value={countryvisite}
                  name="gender1"
                  className="group"
                  aria-label="Gender"
                  onChange={handlecountryvisited}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="yes" />
                  <FormControlLabel value="no" control={<Radio />} label="no" />
                </RadioGroup>
              </Grid>
            </Grid>
          )}

          {getcountryVisited?.map((item, key) => {
            return (
              <div key={key} style={{ position: "relative", height: "300px" }}>
                {/* <DeleteIcon style={{ position: "absolute", right: "10PX", top: "10px" }} /> */}
                <Grid container spacing={6}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    Country
                    <TextField
                      style={{ width: "100%", marginBottom: "16px" }}
                      type="text"
                      disabled={true}
                      value={item.where}
                      onChange={handleChange}
                      errorMessages={["this field is required", "address is not valid"]}
                    />
                    Date Of Entry
                    <TextField
                      style={{ width: "100%", marginBottom: "16px" }}
                      type="text"
                      disabled={true}
                      value={item.dateofexit}
                      validators={["required"]}
                      errorMessages={["this field is required", "address is not valid"]}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    Date Of Exit
                    <TextField
                      style={{ width: "100%", marginBottom: "16px" }}
                      type="text"
                      disabled={true}
                      value={item.dateofentry}
                      validators={["required"]}
                      errorMessages={["this field is required", "address is not valid"]}
                    />
                    <DeleteIcon
                      onClick={() => {
                        handledeletevisitedCountry(key);
                      }}
                    />
                  </Grid>
                </Grid>
              </div>
            );
          })}

          {countryvisite === "yes" && (
            <>
              <div style={{ display: "flex", alignItems: "center" }}>
                <H3>Country Visited</H3>
                <Button style={{ marginLeft: "20px" }} color="primary" variant="contained" onClick={handleAddvisitedCountry}>
                  <Icon>add</Icon>
                  <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
                </Button>
              </div>
              <Grid container spacing={6} style={{ marginBottom: "16px" }}>
                {visitcountrybtn && (
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextFieldValidator
                      type="text"
                      name="wherecountyvisited"
                      label="Where"
                      value={wherecountyvisited || ""}
                      onChange={handleChange}
                      validators={["required"]}
                      errorMessages={["this field is required", "address is not valid"]}
                    />
                    <div style={datePickerStyles}>
                      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                        <DatePicker
                          label="Date of entry"
                          onChange={(e) => {
                            console.log("rwe", e.format("YYYY-MM-DD"));
                            setState((prevState) => ({
                              ...prevState,
                              countyentrydate: e.format("YYYY-MM-DD")
                            }));
                          }}
                        // maxDate={yesterday}
                        />
                      </LocalizationProvider>
                    </div>
                    <div style={datePickerStyles}>
                      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                        <DatePicker
                          label="Date of exit"
                          onChange={(e) => {
                            setState((prevState) => ({
                              ...prevState,
                              countyexitdate: e.format("YYYY-MM-DD")
                            }));
                          }}
                        // maxDate={yesterday}
                        />
                      </LocalizationProvider>
                    </div>
                  </Grid>
                )}
                <div style={{ width: "100%", justifyContent: "center", display: "flex" }}>

                  {/* {visitcountrybtn && (
                  <Button
                    style={{ marginLeft: "20px" }}
                    color="primary"
                    variant="contained"
                    onClick={handleDonevisitedCountry}
                  >
                    <Icon>done</Icon>
                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>Done</Span>
                  </Button>
                )} */}
                </div>
              </Grid>

            </>
          )}

          </div>
          <div style={{ border: "2px solid #00000080", padding: "20px", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", height: "auto", }}>
            <H3>Parents or Guardian Details</H3>
            <Button
              color="primary"
              variant="contained"
              style={{ marginLeft: "20px" }}
              onClick={HandleAddmoreParents}
            >
              <Icon>add</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
            </Button>
          </div>

          {parentsList?.map((item, key) => {
            return (
              <Grid
                key={key}
                container
                spacing={6}
                style={{
                  marginBottom:100
                }}
              >
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    style={{ width: "100%", marginBottom: "16px" }}
                    disabled={true}
                    label="Name of Guardian"
                    value={item.parentsdetails || ""}
                  />
                  <TextField
                    style={{ width: "100%", marginBottom: "16px" }}
                    disabled={true}
                    label="Relation"
                    value={item.parentrelation || ""}
                    onChange={handleChange}
                  />
                  <TextField
                    style={{ width: "100%", marginBottom: "16px" }}
                    type="email"
                    disabled={true}
                    label="Email address of Guardian"
                    value={item.emailofparents || ""}
                    onChange={handleChange}
                  />
                  <TextField
                    style={{ width: "100%", marginBottom: "16px" }}
                    type="text"
                    disabled={true}
                    label="Phone No. of Guardian"
                    value={item.phonenumberofparents || ""}
                    onChange={handleChange}
                  />
                  <TextField
                    style={{ width: "100%", marginBottom: "16px" }}
                    type="text"
                    disabled={true}
                    label="Designation"
                    value={item.Designation || ""}
                    onChange={handleChange}
                  />
                  <TextField
                    style={{ width: "100%", marginBottom: "16px" }}
                    type="text"
                    disabled={true}
                    label="Level of Education of Guardian"
                    value={item.levelofeducation || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    style={{ width: "100%", marginBottom: "16px" }}
                    type="text"
                    disabled={true}
                    label="Undergraduate Degree Name with specialization"
                    value={item.degreename || ""}
                    onChange={handleChange}
                  />
                  <TextField
                    style={{ width: "100%", marginBottom: "16px" }}
                    type="text"
                    disabled={true}
                    label="Organization/university name "
                    value={item.universityname || ""}
                    onChange={handleChange}
                  />
                  <TextField
                    style={{ width: "100%", marginBottom: "16px" }}
                    type="text"
                    disabled={true}
                    label=" Year of Passing"
                    value={item.yearofpassing || ""}
                    onChange={handleChange}
                  />
                  <TextField
                    style={{ width: "100%", marginBottom: "16px" }}
                    type="text"
                    disabled={true}
                    label="Profession of Guardian"
                    value={item.professionofparents || ""}
                    onChange={handleChange}
                  />
                  <TextField
                    style={{ width: "100%", marginBottom: "16px" }}
                    type="text"
                    disabled={true}
                    label=" Year of working ( since when )"
                    value={item.yearofworking || ""}
                    onChange={handleChange}
                  />
                  <div style={{ cursor: "pointer" }}>
                    <DeleteIcon
                      onClick={() => {
                        handleparentsList(key);
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
            );
          })}
          {showparentmore && (
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextFieldValidator
                  type="text"
                  name="parentsdetails"
                  label="Name of Guardian"
                  value={parentsdetails || ""}
                  onChange={handleChange}
                />
                <TextFieldValidator
                  type="text"
                  name="parentrelation"
                  label="Relation"
                  value={parentrelation || ""}
                  onChange={handleChange}
                />
                <TextFieldValidator
                  type="email"
                  name="emailofparents"
                  label="Email address of Guardian"
                  value={emailofparents || ""}
                  onChange={handleChange}
                />
                <TextFieldValidator
                  type="text"
                  name="phonenumberofparents"
                  label="Phone No. of Guardian"
                  value={phonenumberofparents || ""}
                  onChange={handleChange}
                />
                <TextFieldValidator
                  type="text"
                  name="Designation"
                  label="Designation"
                  value={Designation || ""}
                  onChange={handleChange}
                />
                Year of passing
                <div style={datePickerStyles}>
                  <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                    <DatePicker
                      onChange={(e) => {
                        setState((pre) => ({
                          ...pre,
                          parentsyearofpassing: e.format("YYYY-MM-DD")
                        }));
                        console.log("rwe", e.format("YYYY-MM-DD"));
                      }}
                    // maxDate={yesterday}
                    />
                  </LocalizationProvider>
                </div>
                Year of working ( since when )
                <div style={datePickerStyles}>
                  <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                    <DatePicker
                      onChange={(e) => {
                        setState((pre) => ({
                          ...pre,
                          parentsyearofworkingsince: e.format("YYYY-MM-DD")
                        }));
                        console.log("rwe", e.format("YYYY-MM-DD"));
                      }}
                    // maxDate={yesterday}
                    />
                  </LocalizationProvider>
                </div>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextFieldValidator
                  type="text"
                  name="levelofeducation"
                  label="Level of Education of Guardian"
                  value={levelofeducation || ""}
                  onChange={handleChange}
                />
                <TextFieldValidator
                  type="text"
                  name="degreename"
                  label="Undergraduate Degree Name with specialization"
                  value={degreename || ""}
                  onChange={handleChange}
                />
                <TextFieldValidator
                  type="text"
                  name="universityname"
                  label="Organization/university name "
                  value={universityname || ""}
                  onChange={handleChange}
                />
                <TextFieldValidator
                  type="text"
                  name="professionofparents"
                  label="Profession of Guardian"
                  value={professionofparents || ""}
                  onChange={handleChange}
                />
                
              </Grid>
            </Grid>
          )}

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "20px auto",

            }}
          >
            {/* {showparentmore && (
              <Button
                color="primary"
                variant="contained"
                style={{ marginTop: "20px" }}
                onClick={HandleAddParents}
              >
                <Icon>done</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Save</Span>
              </Button>
            )} */}


            </div>
            </div>

          <div style={{ border: "2px solid #00000080", padding: "20px", marginBottom: "20px" }}>
          <FormLabel component="legend">Do You Have Siblings ?</FormLabel>
          <RadioGroup
            value={havesiblng}
            name="sibling"
            className="group"
            aria-label="Gender"
            onChange={handlesibvlings}
          >
            <FormControlLabel value="yes" control={<Radio />} label="yes" />
            <FormControlLabel value="no" control={<Radio />} label="no" />
          </RadioGroup>

          {havesiblng === "yes" && (
            <div>
              <Grid></Grid>
              <div style={{ display: "flex", alignItems: "center", height: "auto", }}>
                <H3>Sibling</H3>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginLeft: "20px" }}
                  onClick={handleAddmoreSiblings}
                >
                  <Icon>add</Icon>
                  <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
                </Button>
              </div>

              {SiblingsList.map((item, key) => {
                return (
                  <Grid style={{marginBottom:100}} key={key} container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <TextFieldValidator
                        disabled={true}
                        type="text"
                        label="Name of Sibling"
                        value={item.nameofsibiling || ""}
                      />
                      <TextFieldValidator
                        disabled={true}
                        type="text"
                        label="level of Education of Sibling"
                        value={item.educationlevelofsibling || ""}
                      />
                      <TextFieldValidator
                        disabled={true}
                        type="text"
                        label="Organization/university name"
                        value={item.universityofsibling || ""}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <TextFieldValidator
                        disabled={true}
                        type="text"
                        label="Relation"
                        value={item.relationwithsibling || ""}
                      />
                      <TextFieldValidator
                        disabled={true}
                        type="text"
                        label="Date OF Birth Of Sibling"
                        value={item.dateofborthofsibling || ""}
                      />
                      <TextFieldValidator
                        disabled={true}
                        type="text"
                        label="Which country is he /she now "
                        value={item.countryofsibling || ""}
                      />
                      <div style={{ cursor: "pointer" }}>
                        <DeleteIcon
                          onClick={() => {
                            handlesiblingList(key);
                          }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                );
              })}

              {showsibdonebtn && (
                <Grid container spacing={6}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextFieldValidator
                      type="text"
                      name="nameofsibiling"
                      label="Name of Sibling"
                      value={nameofsibiling || ""}
                      onChange={handleChange}
                      validators={["required"]}
                      errorMessages={["this field is required", "address is not valid"]}
                    />
                    <TextFieldValidator
                      type="text"
                      name="educationlevelofsibling"
                      label="level of Education of Sibling"
                      value={educationlevelofsibling || ""}
                      onChange={handleChange}
                      validators={["required"]}
                      errorMessages={["this field is required", "address is not valid"]}
                    />
                    <TextFieldValidator
                      type="text"
                      name="universityofsibling"
                      label="Organization/university name"
                      value={universityofsibling || ""}
                      onChange={handleChange}
                      validators={["required"]}
                      errorMessages={["this field is required", "address is not valid"]}
                    />
                  </Grid>

                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextFieldValidator
                      type="text"
                      name="relationwithsibling"
                      label="Relation"
                      value={relationwithsibling || ""}
                      onChange={handleChange}
                      validators={["required"]}
                      errorMessages={["this field is required", "address is not valid"]}
                    />
                   
                    <TextFieldValidator
                      type="text"
                      name="countryofsibling"
                      label="Which country is he /she now "
                      value={countryofsibling || ""}
                      onChange={handleChange}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                      />
                      Date of Birth
                      <div style={datePickerStyles}>
                        <LocalizationProvider Provider
                          dateAdapter={AdapterMoment} adapterLocale="en"
                          validators={["required"]}
                          errorMessages={["this field is required"]}
                        >
                          <DatePicker
                            onChange={(e) => {
                              console.log("rwe", e.format("YYYY-MM-DD"));
                              setState((pre) => ({
                                ...pre,
                                dobofsibling: e.format("YYYY-MM-DD")
                              }));
                            }}

                          // maxDate={yesterday}
                          />
                        </LocalizationProvider>
                      </div>
                    </Grid>
                    
                </Grid>
              )}

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "20px auto"
                }}
              >
                {/* {showsibdonebtn && (
                  <Button
                    color="primary"
                    variant="contained"
                    style={{ marginTop: "20px" }}
                    onClick={handleAddSiblings}
                  >
                    <Icon>done</Icon>
                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>Save</Span>
                  </Button>
                )} */}

              </div>

              {/* <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px"
              }}
            >
              <Button color="primary" variant="contained" onClick={handleAddSiblings}>
                <Icon>add</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add</Span>
              </Button>
            </div> */}
            </div>
            )}
            </div>
          {!isFormFiled && (
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
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Save & Continue</Span>
                <Icon>navigate_next</Icon>
              </Button>
            </div>
          )}
        </ValidatorForm>
      </SimpleCard>

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
};

export default SimpleForm;
