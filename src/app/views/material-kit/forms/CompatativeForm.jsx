import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "moment/locale/de";
import { Autocomplete, Button, Grid, styled } from "@mui/material";
import { useState } from "react";
import { H3, Span } from "app/components/Typography";
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
import { persnoaldetailsupdate, studentData } from "Apis/Persnoldetailsform";
import { useEffect } from "react";
import Popup from "./Popup";
const TextFieldValidator = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px"
}));
const AutoComplete = styled(Autocomplete)(() => ({ width: 300, marginBottom: "16px" }));
const suggestio = [
  {
    label: "GRE"
  },
  {
    label: "GMAT"
  },
  {
    label: "IELTS"
  },
  {
    label: "TOEFL"
  }
];
const yesterday = moment().subtract(1, "day");
function CompatativeForm() {
  const navigation = useNavigate();
  const [commentbox, setCommentBox] = useState(false)
  const [GreExamForm, SetGreExamForm] = useState("");
  const [GmateExamForm, SetGmateExamForm] = useState([]);
  const [IELTSExamForm, SetIELTSExamForm] = useState("");
  const [TOEFLExamForm, SetTOEFLExamForm] = useState("");
  const [typeofexam, setTypeofExam] = useState("");
  const [compatativeExamList, SetCompatativeExamList] = useState([]);
  const [examdate, setExamDate] = useState("");
  const userID = localStorage.getItem("userID");
  console.log("userID", userID);
  const [open, setOpen] = useState(false);
  const { Username, Password, AWA, Quantitative, Verbal, Total } = GreExamForm;
  const {
    GmateUsername,
    GmatePassword,
    GmateAWA,
    GmateIR,
    GmateQuantitative,
    GmateVerbal,
    GmateTotal
  } = GmateExamForm;

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
    if (typeofexam !== "") {
      const copatativedata = [
        ...compatativeExamList,
        {
          GreExamForm: {
            examdate,
            Username,
            Password,
            AWA,
            Quantitative,
            Verbal,
            Total,
            typeofexam
          }
        }
      ]
      try {
        console.log("userIDSS", userID);
        const resp = await persnoaldetailsupdate(
          {
            CompatativeExam: JSON.stringify(copatativedata)
          },
          userID
        );
        console.log("resp", resp);
        if (resp.status === 200) {
          setOpen(false);
          if (userexamType === "Pg work Experince") {
            navigation("/student/material/CareerHighlight");
          } else {
            navigation("/student/material/Recomenderdetails");
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleClose = async () => {
    // setOpen(false);
    try {
      console.log("userIDSS", userID);
      const eramarr = [GreExamForm, GmateExamForm, IELTSExamForm, TOEFLExamForm];
      const resp = await persnoaldetailsupdate(
        {
          CompatativeExam: JSON.stringify(compatativeExamList)
        },
        userID
      );
      console.log("resp", resp);
      if (resp.status === 200) {
        setOpen(false);
        if (userexamType === "Pg work Experince") {
          navigation("/student/material/CareerHighlight");
        } else {
          navigation("/student/material/Recomenderdetails");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (event) => {
    setCommentBox(false)
    if (typeofexam === "GRE") {
      SetGreExamForm({ ...GreExamForm, [event.target.name]: event.target.value });
    }
    if (typeofexam === "GMAT") {
      SetGmateExamForm({ ...GmateExamForm, [event.target.name]: event.target.value });
    }
    if (typeofexam === "IELTS") {
      SetIELTSExamForm({ ...IELTSExamForm, [event.target.name]: event.target.value });
    }
    if (typeofexam === "TOEFL") {
      SetTOEFLExamForm({ ...TOEFLExamForm, [event.target.name]: event.target.value });
    }
  };

  const [donebtn, setdonebtn] = useState(false);

  const HandleAddExams = () => {
    setdonebtn(false);
    if (Username !== undefined) {
      if (typeofexam === "GRE") {
        SetCompatativeExamList([
          ...compatativeExamList,
          {
            GreExamForm: {
              examdate,
              Username,
              Password,
              AWA,
              Quantitative,
              Verbal,
              Total,
              typeofexam
            }
          }
        ]);
        SetGreExamForm({});
      }
    }

    if (GmateUsername !== undefined) {
      if (typeofexam === "GMAT") {
        SetCompatativeExamList([
          ...compatativeExamList,
          {
            GmateExamForm: {
              examdate,
              GmateUsername,
              GmatePassword,
              GmateAWA,
              GmateIR,
              GmateQuantitative,
              GmateVerbal,
              GmateTotal,
              typeofexam
            }
          }
        ]);
        SetGmateExamForm({});
      }
    }

    if (IELTSUsername !== undefined) {
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
        SetIELTSExamForm({});
      }
    }

    if (TOEFLEUsername !== undefined) {
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
        SetTOEFLExamForm({});
      }
    }
  };

  const HandlDoneExams = () => {
    if (Username !== undefined) {
      setdonebtn(true);
      if (typeofexam === "GRE") {
        SetCompatativeExamList([
          ...compatativeExamList,
          {
            GreExamForm: {
              examdate,
              Username,
              Password,
              AWA,
              Quantitative,
              Verbal,
              Total,
              typeofexam
            }
          }
        ]);
        SetGreExamForm({});
      }
    }

    if (GmateUsername !== undefined) {
      setdonebtn(true);
      if (typeofexam === "GMAT") {
        SetCompatativeExamList([
          ...compatativeExamList,
          {
            GmateExamForm: {
              examdate,
              GmateUsername,
              GmatePassword,
              GmateAWA,
              GmateIR,
              GmateQuantitative,
              GmateVerbal,
              GmateTotal,
              typeofexam
            }
          }
        ]);
        SetGmateExamForm({});
      }
    }

    if (IELTSUsername !== undefined) {
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
        SetIELTSExamForm({});
      }
    }

    if (TOEFLEUsername !== undefined) {
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

  const datePickerStyles = {
    width: "100%",
    marginBottom: "16px"
  };
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
      }
    };
    check();
  }, [userID]);

  return (
    <div>
       <div style={{ border:"2px solid #00000080",padding:"20px",marginBottom:"20px"}}>
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
                    <span className="material-symbols-outlined">
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
                      label="Date of examination"
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
                      type="number"
                      name="Total"
                      label="Total"
                      onChange={handleChange}
                      value={item.GreExamForm.Total || ""}
                    />
                  </Grid>
                </Grid>
              </div>
            )}
            {item?.GmateExamForm && (
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
                    <span className="material-symbols-outlined">
                      <Icon>delete</Icon>
                    </span>
                  </Button>
                </div>
                <H3>{item.GmateExamForm.typeofexam}</H3>
                <Grid container spacing={6}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="examdate"
                      label="Date of examination"
                      onChange={handleChange}
                      value={item.GmateExamForm.examdate || ""}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="GmateUsername"
                      label="Username"
                      onChange={handleChange}
                      value={item.GmateExamForm.GmateUsername || ""}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="GmatePassword"
                      label="Password"
                      onChange={handleChange}
                      value={item.GmateExamForm.GmatePassword || ""}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="GmateAWA"
                      label="AWA"
                      onChange={handleChange}
                      value={item.GmateExamForm.GmateAWA || ""}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="GmateIR"
                      label="IR"
                      onChange={handleChange}
                      value={item.GmateExamForm.GmateIR || ""}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="GmateQuantitative"
                      label="Quantitative"
                      onChange={handleChange}
                      value={item.GmateExamForm.GmateQuantitative || ""}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="GmateVerbal"
                      label="Verbal"
                      onChange={handleChange}
                      value={item.GmateExamForm.GmateVerbal || ""}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="number"
                      name="GmateTotal"
                      label="Total"
                      onChange={handleChange}
                      value={item.GmateExamForm.GmateTotal || ""}
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
                    <span className="material-symbols-outlined">
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
                      name="examdate"
                      label="Date of examination"
                      onChange={handleChange}
                      value={item.IELTSExamForm.examdate || ""}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="IELTSUsername"
                      label="Username"
                      onChange={handleChange}
                      value={item.IELTSExamForm.IELTSUsername || ""}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="IELTSPassword"
                      label="Password"
                      onChange={handleChange}
                      value={item.IELTSExamForm.IELTSPassword || ""}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="IELTSReading"
                      label="Reading"
                      onChange={handleChange}
                      value={item.IELTSExamForm.IELTSReading || ""}
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
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="IELTSSpeaking"
                      label="Speaking"
                      onChange={handleChange}
                      value={item.IELTSExamForm.IELTSSpeaking || ""}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="IELTSWriting"
                      label="Writing"
                      onChange={handleChange}
                      value={item.IELTSExamForm.IELTSWriting || ""}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="number"
                      name="IELTSTotal"
                      label="Total"
                      onChange={handleChange}
                      value={item.IELTSExamForm.IELTSTotal || ""}
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
                    <span className="material-symbols-outlined">
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
                      name="examdate"
                      label="Date of examination"
                      onChange={handleChange}
                      value={item.TOEFLExamForm.examdate || ""}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="TOEFLEUsername"
                      label="Username"
                      onChange={handleChange}
                      value={item.TOEFLExamForm.TOEFLEUsername || ""}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="TOEFLEPassword"
                      label="Password"
                      onChange={handleChange}
                      value={item.TOEFLExamForm.TOEFLEPassword || ""}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="TOEFLEReading"
                      label="Reading"
                      onChange={handleChange}
                      value={item.TOEFLExamForm.TOEFLEReading || ""}
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
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="TOEFLESpeaking"
                      label="Speaking"
                      onChange={handleChange}
                      value={item.TOEFLExamForm.TOEFLESpeaking || ""}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="text"
                      name="TOEFLEWriting"
                      label="Writing"
                      onChange={handleChange}
                      value={item.TOEFLExamForm.TOEFLEWriting || ""}
                    />
                    <TextField
                      disabled={true}
                      style={{ width: "100%", marginBottom: "20px" }}
                      type="number"
                      name="TOEFLETotal"
                      label="Total"
                      onChange={handleChange}
                      value={item.TOEFLExamForm.TOEFLETotal || ""}
                    />
                  </Grid>
                </Grid>
              </div>
            )}
          </div>
        );
      })}
      {commentbox && <Popup commentbox={commentbox} setCommentBox={setCommentBox} />}

      <ValidatorForm onSubmit={handleSubmit} onError={() => {
        setCommentBox(true)
      }} >
        <div style={{ display: "flex", alignItems: "center" }}>
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
          <Button style={{ marginLeft: "20px", marginTop: "-60px" }} color="primary" variant="contained" onClick={HandleAddExams}>
            <Icon>add</Icon>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
          </Button>
        </div>
        {!donebtn && (
          <div>
            <Grid></Grid>

            {typeofexam === "GRE" && (
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <div style={datePickerStyles}>
                    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                      <DatePicker
                        label="Date Of Examination"
                        onChange={(e) => {
                          console.log("rwe", e.format("YYYY-MM-DD"));
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
                    name="AWA"
                    label="AWA"
                    onChange={handleChange}
                    value={AWA || ""}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextFieldValidator
                    type="text"
                    name="Quantitative"
                    label="Quantitative"
                    onChange={handleChange}
                    value={Quantitative || ""}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <TextFieldValidator
                    type="text"
                    name="Verbal"
                    label="Verbal"
                    onChange={handleChange}
                    value={Verbal || ""}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <TextFieldValidator
                    type="number"
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

            {typeofexam === "GMAT" && (
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <div style={datePickerStyles}>
                    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                      <DatePicker
                        label="Date Of Examination"
                        onChange={(e) => {
                          console.log("rwe", e.format("YYYY-MM-DD"));
                          setExamDate(e.format("YYYY-MM-DD"));
                        }}
                        maxDate={yesterday}
                      />
                    </LocalizationProvider>
                  </div>
                  <TextFieldValidator
                    type="text"
                    name="GmateUsername"
                    label="Username"
                    onChange={handleChange}
                    value={GmateUsername || ""}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <TextFieldValidator
                    type="text"
                    name="GmatePassword"
                    label="Password"
                    onChange={handleChange}
                    value={GmatePassword || ""}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <TextFieldValidator
                    type="text"
                    name="GmateAWA"
                    label="AWA"
                    onChange={handleChange}
                    value={GmateAWA || ""}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextFieldValidator
                    type="text"
                    name="GmateIR"
                    label="IR"
                    onChange={handleChange}
                    value={GmateIR || ""}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <TextFieldValidator
                    type="text"
                    name="GmateQuantitative"
                    label="Quantitative"
                    onChange={handleChange}
                    value={GmateQuantitative || ""}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <TextFieldValidator
                    type="text"
                    name="GmateVerbal"
                    label="Verbal"
                    onChange={handleChange}
                    value={GmateVerbal || ""}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <TextFieldValidator
                    type="number"
                    name="GmateTotal"
                    label="Total"
                    onChange={handleChange}
                    value={GmateTotal || ""}
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
                    type="number"
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
                          console.log("rwe", e.format("YYYY-MM-DD"));
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
                    type="number"
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

        <div
          style={{ width: "100%", display: "flex", justifyContent: "center", margin: "20px 0px" }}
          >

          {/* {!donebtn && (
            <Button
            
            color="primary"
            variant="contained"
            onClick={HandlDoneExams}
            >
            <Icon>done</Icon>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Save</Span>
            </Button>
            )} */}
        </div>
        <div
          style={{ width: "80%", display: "flex", justifyContent: "center", margin: "40px auto" }}
          >
          <Button color="primary" variant="contained" type="submit">
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Next & Continue</Span>
            <Icon>navigate_next</Icon>
          </Button>
        </div>
      </ValidatorForm>
          </div>

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

export default CompatativeForm;
