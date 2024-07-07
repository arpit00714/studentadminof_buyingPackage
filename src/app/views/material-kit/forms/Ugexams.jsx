import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "moment/locale/de";
import { Autocomplete, Button, Grid, styled } from "@mui/material";
import { H3, Span } from "app/components/Typography";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Fragment } from "react";
// import DeleteIcon from "@mui/icons-material/Delete";
import Icon from "@mui/material/Icon";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useLocation, useNavigate } from "react-router-dom";
import { persnoaldetailsupdate } from "Apis/Persnoldetailsform";
import { SimpleCard } from "app/components";
const TextFieldValidator = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px"
}));
const AutoComplete = styled(Autocomplete)(() => ({ width: 300, marginBottom: "16px" }));
const suggestio = [
  {
    label: "SAT"
  },
  {
    label: "ACT"
  },
  {
    label: "IELTS"
  },
  {
    label: "TOEFL"
  }
];

const datePickerStyles = {
  width: "100%",
  marginBottom: "16px"
};
const yesterday = moment().subtract(1, "day");
function Ugexams(props) {
  const isFormFiled = props.userData;
  const [filedopen, setfiledOpen] = useState(true);

  const navigation = useNavigate();
  const [GreExamForm, SetGreExamForm] = useState("");
  const [ACTExamForm, SetACTExamForm] = useState("");
  const [IELTSExamForm, SetIELTSExamForm] = useState("");
  const [TOEFLExamForm, SetTOEFLExamForm] = useState("");
  const [typeofexam, setTypeofExam] = useState(null);
  const [examdate, setExamDate] = useState("");
  const [compatativeExamList, SetCompatativeExamList] = useState([]);
  const userID = localStorage.getItem("userID");
  console.log("userID", userID);
  const [open, setOpen] = useState(false);
  const { Username, Password, satReading, Writing, Maths, Essay, Total } = GreExamForm;

  const { ACTUsername, ACTPassword, ACTReading, ACTWriting, ACTMaths, ACTEssay, ACTTotal } =
    ACTExamForm;

  const {
    IELTSUsername,
    IELTSPassword,
    IELTSReading,
    IELTListening,
    IELTSSpeaking,
    IELTSWriting,
    IELTSTotal
  } = IELTSExamForm;

  const {
    TOEFLEUsername,
    TOEFLEPassword,
    TOEFLEReading,
    TOEFLEistening,
    TOEFLESpeaking,
    TOEFLEWriting,
    TOEFLETotal
  } = TOEFLExamForm;

  const handleSubmit = async () => {
    // setOpen(true);
    try {
      const examdat = [...compatativeExamList,
      {
        GreExamForm: {
          examdate,
          Username,
          Password,
          satReading,
          Writing,
          Maths,
          Essay,
          Total,
          typeofexam
        }
      }]
      console.log("userIDSS", userID);
      const resp = await persnoaldetailsupdate(
        {
          CompatativeExam: JSON.stringify(examdat)
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
    // try {
    //   const examdat = [...compatativeExamList,
    //   {
    //     GreExamForm: {
    //       examdate,
    //       Username,
    //       Password,
    //       satReading,
    //       Writing,
    //       Maths,
    //       Essay,
    //       Total,
    //       typeofexam
    //     }
    //   }]
    //   HandlDoneExams()
    //   console.log("userIDSS", userID);
    //   const eramarr = [GreExamForm, ACTExamForm, IELTSExamForm, TOEFLExamForm];
    //   const resp = await persnoaldetailsupdate(
    //     {
    //       CompatativeExam: JSON.stringify(compatativeExamList)
    //     },
    //     userID
    //   );
    //   console.log("resp", resp);
    //   if (resp.status === 200) {
    //     setOpen(false);
    //     navigation("/student/material/Recomenderdetails");
    //   }
    // } catch (err) {
    //   console.log(err);
    //   setOpen(false);
    // }
  };

  const handleChange = (event) => {
    if (typeofexam === "SAT") {
      SetGreExamForm({ ...GreExamForm, [event.target.name]: event.target.value });
    }
    if (typeofexam === "ACT") {
      SetACTExamForm({ ...ACTExamForm, [event.target.name]: event.target.value });
    }
    if (typeofexam === "IELTS") {
      SetIELTSExamForm({ ...IELTSExamForm, [event.target.name]: event.target.value });
    }
    if (typeofexam === "TOEFL") {
      SetTOEFLExamForm({ ...TOEFLExamForm, [event.target.name]: event.target.value });
    }
  };

  const HandleAddExams = () => {
    setdonebtn(false);
    if (Username !== "") {
      if (typeofexam === "SAT") {
        SetCompatativeExamList([
          ...compatativeExamList,
          {
            GreExamForm: {
              examdate,
              Username,
              Password,
              satReading,
              Writing,
              Maths,
              Essay,
              Total,
              typeofexam
            }
          }
        ]);
        setTypeofExam(null);
        SetGreExamForm({});
        //   GreExamForm.GreGreDateofexamination = "";
      }
    }
    if (ACTUsername !== "") {
      if (typeofexam === "ACT") {
        SetCompatativeExamList([
          ...compatativeExamList,
          {
            ACTExamForm: {
              examdate,
              ACTUsername,
              ACTPassword,
              ACTReading,
              ACTWriting,
              ACTMaths,
              ACTEssay,
              ACTTotal,
              typeofexam
            }
          }
        ]);
        setTypeofExam(null);
        SetIELTSExamForm({});
      }
    }
    if (IELTSUsername !== "") {
      if (typeofexam === "IELTS") {
        SetCompatativeExamList([
          ...compatativeExamList,
          {
            IELTSExamForm: {
              examdate,
              IELTSUsername,
              IELTSPassword,
              IELTSReading,
              IELTListening,
              IELTSSpeaking,
              IELTSWriting,
              IELTSTotal,
              typeofexam
            }
          }
        ]);
        setTypeofExam(null);
        SetIELTSExamForm({});
      }
    }

    if (TOEFLEUsername !== "") {
      if (typeofexam === "TOEFL") {
        SetCompatativeExamList([
          ...compatativeExamList,
          {
            TOEFLExamForm: {
              examdate,
              TOEFLEUsername,
              TOEFLEPassword,
              TOEFLEReading,
              TOEFLEistening,
              TOEFLESpeaking,
              TOEFLEWriting,
              TOEFLETotal,
              typeofexam
            }
          }
        ]);
        setTypeofExam(null);
        SetTOEFLExamForm({});
      }
    }

    // SetCompatativeExamList([]);
  };

  const [donebtn, setdonebtn] = useState(false);


  const HandlDoneExams = () => {
    if (Username !== "") {
      setdonebtn(true);
      if (typeofexam === "SAT") {
        SetCompatativeExamList([
          ...compatativeExamList,
          {
            GreExamForm: {
              examdate,
              Username,
              Password,
              satReading,
              Writing,
              Maths,
              Essay,
              Total,
              typeofexam
            }
          }
        ]);
        setTypeofExam(null);
        SetGreExamForm({});
        //   GreExamForm.GreGreDateofexamination = "";
      }
    }
    if (ACTUsername !== "") {
      setdonebtn(true);
      if (typeofexam === "ACT") {
        SetCompatativeExamList([
          ...compatativeExamList,
          {
            ACTExamForm: {
              examdate,
              ACTUsername,
              ACTPassword,
              ACTReading,
              ACTWriting,
              ACTMaths,
              ACTEssay,
              ACTTotal,
              typeofexam
            }
          }
        ]);
        setTypeofExam(null);
        SetIELTSExamForm({});
      }
    }
    if (IELTSUsername !== "") {
      if (IELTSUsername !== "") {
        setdonebtn(true);
        if (typeofexam === "IELTS") {
          SetCompatativeExamList([
            ...compatativeExamList,
            {
              IELTSExamForm: {
                examdate,
                IELTSUsername,
                IELTSPassword,
                IELTSReading,
                IELTListening,
                IELTSSpeaking,
                IELTSWriting,
                IELTSTotal,
                typeofexam
              }
            }
          ]);
          setTypeofExam(null);
          SetIELTSExamForm({});
        }
      }
    }

    if (TOEFLEUsername !== "") {
      setdonebtn(true);
      if (typeofexam === "TOEFL") {
        SetCompatativeExamList([
          ...compatativeExamList,
          {
            TOEFLExamForm: {
              examdate,
              TOEFLEUsername,
              TOEFLEPassword,
              TOEFLEReading,
              TOEFLEistening,
              TOEFLESpeaking,
              TOEFLEWriting,
              TOEFLETotal,
              typeofexam
            }
          }
        ]);
        setTypeofExam(null);
        SetTOEFLExamForm({});
      }
    }
  };

  const HandleDeleteExam = (examname, index) => {
    const updatexamlist = [...compatativeExamList];
    updatexamlist.splice(index, 1);
    SetCompatativeExamList(updatexamlist);
    console.log("examname", examname, index);
  };
  console.log("compatativeExamList", compatativeExamList);


  const handleClose = async () => {
    try {
      console.log("userIDSS", userID);
      const eramarr = [GreExamForm, ACTExamForm, IELTSExamForm, TOEFLExamForm];
      const resp = await persnoaldetailsupdate(
        {
          CompatativeExam: JSON.stringify(compatativeExamList)
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
  return (
    <div>
      {compatativeExamList.map((item, key) => {
        return (
          <div key={key}>
            {item?.GreExamForm && (
              <div>
                <div
                  style={{
                    width: "100%",
                    margin: "10px 0px",
                    display: "flex",
                    justifyContent: "end",
                    padding: "10px",
                    cursor: "pointer",
                    alignItems: "center"
                  }}
                >
                  <Button
                    style={{ color: "black" }}
                    onClick={() => {
                      HandleDeleteExam(typeofexam, key);
                    }}
                  >
                    <span class="material-symbols-outlined">
                      <Icon>delete</Icon>
                    </span>
                  </Button>
                </div>
                <H3>{item?.GreExamForm?.typeofexam}</H3>
                <Grid container spacing={6}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="examdate"
                      label="Date of examination"
                      onChange={handleChange}
                      value={item.GreExamForm.examdate || ""}
                    />

                    <TextField
                      disabled={true}
                      type="text"
                      style={{ width: "100%", marginBottom: "20px" }}
                      name="Username"
                      label="Username"
                      onChange={handleChange}
                      value={item.GreExamForm.Username || ""}
                    />
                    <TextField
                      disabled={true}
                      type="text"
                      style={{ width: "100%", marginBottom: "20px" }}
                      name="Password"
                      label="Password"
                      onChange={handleChange}
                      value={item.GreExamForm.Password || ""}
                    />
                    <TextField
                      disabled={true}
                      type="text"
                      name="AWA"
                      style={{ width: "100%", marginBottom: "20px" }}
                      label="AWA"
                      onChange={handleChange}
                      value={item.GreExamForm.AWA || ""}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="Quantitative"
                      label="Quantitative"
                      onChange={handleChange}
                      value={item.GreExamForm.Quantitative || ""}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="Verbal"
                      label="Verbal"
                      onChange={handleChange}
                      value={item.GreExamForm.Verbal || ""}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="Total"
                      label="Total"
                      onChange={handleChange}
                      value={item.GreExamForm.Total || ""}
                    />
                  </Grid>
                </Grid>
              </div>
            )}
            {item?.ACTExamForm && (
              <div>
                <div
                  style={{
                    width: "100%",
                    margin: "10px 0px",
                    display: "flex",
                    justifyContent: "end",
                    padding: "10px",
                    cursor: "pointer",
                    alignItems: "center"
                  }}
                >
                  <Button
                    style={{ color: "black" }}
                    onClick={() => {
                      HandleDeleteExam(typeofexam, key);
                    }}
                  >
                    <span class="material-symbols-outlined">
                      <Icon>delete</Icon>
                    </span>
                  </Button>
                </div>
                <H3>{item.ACTExamForm.typeofexam}</H3>
                <Grid container spacing={6}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="ACTDateofexamination"
                      label="Date of examination"
                      onChange={handleChange}
                      value={item.ACTExamForm.examdate || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="ACTUsername"
                      label="Username"
                      onChange={handleChange}
                      value={item.ACTExamForm.ACTUsername || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="ACTPassword"
                      label="Password"
                      onChange={handleChange}
                      value={item.ACTExamForm.ACTPassword || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="ACTAWA"
                      label="AWA"
                      onChange={handleChange}
                      value={item.ACTExamForm.ACTAWA || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="ACTIR"
                      label="IR"
                      onChange={handleChange}
                      value={item.ACTExamForm.ACTIR || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="ACTQuantitative"
                      label="Quantitative"
                      onChange={handleChange}
                      value={item.ACTExamForm.ACTQuantitative || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="ACTVerbal"
                      label="Verbal"
                      onChange={handleChange}
                      value={item.ACTExamForm.ACTVerbal || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="ACTTotal"
                      label="Total"
                      onChange={handleChange}
                      value={item.ACTExamForm.ACTTotal || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                  </Grid>
                </Grid>
              </div>
            )}
            {item?.IELTSExamForm && (
              <div>
                <div
                  style={{
                    width: "100%",
                    margin: "10px 0px",
                    display: "flex",
                    justifyContent: "end",
                    padding: "10px",
                    cursor: "pointer",
                    alignItems: "center"
                  }}
                >
                  <Button
                    style={{ color: "black" }}
                    onClick={() => {
                      HandleDeleteExam(typeofexam, key);
                    }}
                  >
                    <span class="material-symbols-outlined">
                      <Icon>delete</Icon>
                    </span>
                  </Button>
                </div>
                <H3>{item.IELTSExamForm.typeofexam}</H3>
                <Grid container spacing={6}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="IELTSDateofexamination"
                      label="Date of examination"
                      onChange={handleChange}
                      value={item.IELTSExamForm.examdate || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="IELTSUsername"
                      label="Username"
                      onChange={handleChange}
                      value={item.IELTSExamForm.IELTSUsername || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="IELTSPassword"
                      label="Password"
                      onChange={handleChange}
                      value={item.IELTSExamForm.IELTSPassword || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="IELTSReading"
                      label="Reading"
                      onChange={handleChange}
                      value={item.IELTSExamForm.IELTSReading || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="IELTListening"
                      label="Listening"
                      onChange={handleChange}
                      value={item.IELTSExamForm.IELTListening || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="IELTSSpeaking"
                      label="Speaking"
                      onChange={handleChange}
                      value={item.IELTSExamForm.IELTSSpeaking || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="IELTSWriting"
                      label="Writing"
                      onChange={handleChange}
                      value={item.IELTSExamForm.IELTSWriting || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="IELTSTotal"
                      label="Total"
                      onChange={handleChange}
                      value={item.IELTSExamForm.IELTSTotal || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                  </Grid>
                </Grid>
              </div>
            )}
            {item?.TOEFLExamForm && (
              <div>
                <div
                  style={{
                    width: "100%",
                    margin: "10px 0px",
                    display: "flex",
                    justifyContent: "end",
                    padding: "10px",
                    cursor: "pointer",
                    alignItems: "center"
                  }}
                >
                  <Button
                    style={{ color: "black" }}
                    onClick={() => {
                      HandleDeleteExam(typeofexam, key);
                    }}
                  >
                    <span class="material-symbols-outlined">
                      <Icon>delete</Icon>
                    </span>
                  </Button>
                </div>
                <H3>{item.TOEFLExamForm.typeofexam}</H3>
                <Grid container spacing={6}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="TOEFLEDateofexamination"
                      label="Date of examination"
                      onChange={handleChange}
                      value={item.TOEFLExamForm.examdate || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="TOEFLEUsername"
                      label="Username"
                      onChange={handleChange}
                      value={item.TOEFLExamForm.TOEFLEUsername || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="TOEFLEPassword"
                      label="Password"
                      onChange={handleChange}
                      value={item.TOEFLExamForm.TOEFLEPassword || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="TOEFLEReading"
                      label="Reading"
                      onChange={handleChange}
                      value={item.TOEFLExamForm.TOEFLEReading || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="TOEFLEistening"
                      label="Listening"
                      onChange={handleChange}
                      value={item.TOEFLExamForm.TOEFLEistening || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="TOEFLESpeaking"
                      label="Speaking"
                      onChange={handleChange}
                      value={item.TOEFLExamForm.TOEFLESpeaking || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="TOEFLEWriting"
                      label="Writing"
                      onChange={handleChange}
                      value={item.TOEFLExamForm.TOEFLEWriting || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="TOEFLETotal"
                      label="Total"
                      onChange={handleChange}
                      value={item.TOEFLExamForm.TOEFLETotal || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                  </Grid>
                </Grid>
              </div>
            )}
          </div>
        );
      })}
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <SimpleCard>
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>        <H3>Universities And Courses You Desire</H3>
              <Button style={{ marginLeft: "20px", marginTop: "10px" }} color="primary" variant="contained" onClick={HandleAddExams}>
                <Icon>add</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
              </Button></div>
            {!donebtn && (
              <div>
                <Grid></Grid>
                <Fragment>
                  <AutoComplete
                    options={suggestio}
                    getOptionLabel={(option) => option.label}
                    onChange={(e, val) => {
                      setTypeofExam(val?.label);
                    }}
                    renderInput={(params) => (
                      <TextFieldValidator
                        {...params}
                        label="Type Of Exam"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                </Fragment>
                {typeofexam === "SAT" && (
                  <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <div style={datePickerStyles}>
                        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                          {/* <h3>Date Of Examination</h3> */}
                          <DatePicker
                            label="Date Of Examination"
                            onChange={(e) => {
                              console.log("rwe", e.format("YYYY-MM-DD"));
                              // SetGreExamForm((pre) => ({
                              //   ...pre,
                              //   GreGreDateofexamination: e.format("YYYY-MM-DD")
                              // }));
                              setExamDate(e.format("YYYY-MM-DD"));
                            }}
                            maxDate={yesterday}
                          />
                        </LocalizationProvider>
                      </div>
                      <TextFieldValidator
                        type="text"
                        name="Username"
                        label="Username"
                        onChange={handleChange}
                        value={Username || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                      <TextFieldValidator
                        type="text"
                        name="Password"
                        label="Password"
                        onChange={handleChange}
                        value={Password || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                      <TextFieldValidator
                        type="text"
                        name="satReading"
                        label="Reading "
                        onChange={handleChange}
                        value={satReading || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <TextFieldValidator
                        type="text"
                        name="Writing"
                        label="Writing"
                        onChange={handleChange}
                        value={Writing || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                      <TextFieldValidator
                        type="text"
                        name="Maths"
                        label="Maths"
                        onChange={handleChange}
                        value={Maths || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                      <TextFieldValidator
                        type="text"
                        name="Essay"
                        label="Essay"
                        onChange={handleChange}
                        value={Essay || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                      <TextFieldValidator
                        type="text"
                        name="Total"
                        label="Total"
                        onChange={handleChange}
                        value={Total || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                    </Grid>
                  </Grid>
                )}

                {typeofexam === "ACT" && (
                  <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <div style={datePickerStyles}>
                        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                          <DatePicker
                            label="Date Of Examination"
                            onChange={(e) => {
                              console.log("rwe", e.format("YYYY-MM-DD"));
                              // SetACTExamForm((pre) => ({
                              //   ...pre,
                              //   ACTDateofexamination: e.format("YYYY-MM-DD")
                              // }));
                              setExamDate(e.format("YYYY-MM-DD"));
                            }}
                            maxDate={yesterday}
                          />
                        </LocalizationProvider>
                      </div>
                      <TextFieldValidator
                        type="text"
                        name="ACTUsername"
                        label="Username"
                        onChange={handleChange}
                        value={ACTUsername || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                      <TextFieldValidator
                        type="text"
                        name="ACTPassword"
                        label="Password"
                        onChange={handleChange}
                        value={ACTPassword || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                      <TextFieldValidator
                        type="text"
                        name="ACTReading"
                        label="Reading"
                        onChange={handleChange}
                        value={ACTReading || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <TextFieldValidator
                        type="text"
                        name="ACTWriting"
                        label="Writing"
                        onChange={handleChange}
                        value={ACTWriting || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                      <TextFieldValidator
                        type="text"
                        name="ACTMaths"
                        label="Maths"
                        onChange={handleChange}
                        value={ACTMaths || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                      <TextFieldValidator
                        type="text"
                        name="ACTEssay"
                        label="Essay"
                        onChange={handleChange}
                        value={ACTEssay || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                      <TextFieldValidator
                        type="text"
                        name="ACTTotal"
                        label="Total"
                        onChange={handleChange}
                        value={ACTTotal || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                    </Grid>
                  </Grid>
                )}

                {typeofexam === "IELTS" && (
                  <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <div style={datePickerStyles}>
                        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                          <DatePicker
                            label="Date Of Examination"
                            onChange={(e) => {
                              console.log("rwe", e.format("YYYY-MM-DD"));
                              // SetIELTSExamForm((pre) => ({
                              //   ...pre,
                              //   IELTSDateofexamination: e.format("YYYY-MM-DD")
                              // }));
                              setExamDate(e.format("YYYY-MM-DD"));
                            }}
                            maxDate={yesterday}
                          />
                        </LocalizationProvider>
                      </div>
                      <TextFieldValidator
                        type="text"
                        name="IELTSUsername"
                        label="Username"
                        onChange={handleChange}
                        value={IELTSUsername || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                      <TextFieldValidator
                        type="text"
                        name="IELTSPassword"
                        label="Password"
                        onChange={handleChange}
                        value={IELTSPassword || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                      <TextFieldValidator
                        type="text"
                        name="IELTSReading"
                        label="Reading"
                        onChange={handleChange}
                        value={IELTSReading || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <TextFieldValidator
                        type="text"
                        name="IELTListening"
                        label="Listening"
                        onChange={handleChange}
                        value={IELTListening || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                      <TextFieldValidator
                        type="text"
                        name="IELTSSpeaking"
                        label="Speaking"
                        onChange={handleChange}
                        value={IELTSSpeaking || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                      <TextFieldValidator
                        type="text"
                        name="IELTSWriting"
                        label="Writing"
                        onChange={handleChange}
                        value={IELTSWriting || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                      <TextFieldValidator
                        type="text"
                        name="IELTSTotal"
                        label="Total"
                        onChange={handleChange}
                        value={IELTSTotal || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                    </Grid>
                  </Grid>
                )}

                {typeofexam === "TOEFL" && (
                  <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <div style={datePickerStyles}>
                        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                          <DatePicker
                            label="Date Of Examination"
                            onChange={(e) => {
                              // console.log("rwe", e.format("YYYY-MM-DD"));
                              // SetTOEFLExamForm((pre) => ({
                              //   ...pre,
                              //   TOEFLEDateofexamination: e.format("YYYY-MM-DD")
                              // }));
                              setExamDate(e.format("YYYY-MM-DD"));
                            }}
                            maxDate={yesterday}
                          />
                        </LocalizationProvider>
                      </div>
                      <TextFieldValidator
                        type="text"
                        name="TOEFLEUsername"
                        label="Username"
                        onChange={handleChange}
                        value={TOEFLEUsername || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                      <TextFieldValidator
                        type="text"
                        name="TOEFLEPassword"
                        label="Password"
                        onChange={handleChange}
                        value={TOEFLEPassword || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                      <TextFieldValidator
                        type="text"
                        name="TOEFLEReading"
                        label="Reading"
                        onChange={handleChange}
                        value={TOEFLEReading || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <TextFieldValidator
                        type="text"
                        name="TOEFLEistening"
                        label="Listening"
                        onChange={handleChange}
                        value={TOEFLEistening || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                      <TextFieldValidator
                        type="text"
                        name="TOEFLESpeaking"
                        label="Speaking"
                        onChange={handleChange}
                        value={TOEFLESpeaking || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                      <TextFieldValidator
                        type="text"
                        name="TOEFLEWriting"
                        label="Writing"
                        onChange={handleChange}
                        value={TOEFLEWriting || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                      <TextFieldValidator
                        type="text"
                        name="TOEFLETotal"
                        label="Total"
                        onChange={handleChange}
                        value={TOEFLETotal || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                      />
                    </Grid>
                  </Grid>
                )}
              </div>
            )}

            {/* <div
              style={{ width: "100%", display: "flex", justifyContent: "center", margin: "20px 0px" }}
            >

              {!donebtn && (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={HandlDoneExams}
                >
                  <Icon>done</Icon>
                  <Span sx={{ pl: 1, textTransform: "capitalize" }}>Save</Span>
                </Button>
              )}
            </div> */}

          </div>
        </SimpleCard>
        {!isFormFiled && (
          <div
            style={{ width: "80%", display: "flex", justifyContent: "center", margin: "40px auto" }}
          >
            <Button color="primary" variant="contained" type="submit">
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Next & continue</Span>
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

export default Ugexams;
