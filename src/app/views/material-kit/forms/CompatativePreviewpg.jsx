import React, { useState } from "react";
import { Autocomplete, TextField, Button, Grid, styled } from "@mui/material";
import { H3, Span } from "app/components/Typography";
// import TextField from "@mui/material/TextField";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { persnoaldetailsupdate } from "Apis/Persnoldetailsform";
import Dialog from "@mui/material/Dialog";
import Icon from "@mui/material/Icon";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useLocation, useNavigate } from "react-router-dom";


const TextFieldValidator = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px"
}));

const AutoComplete = styled(Autocomplete)(() => ({ width: 300, marginBottom: "16px" }));

function Compatativepre(props) {
  const formstatus = props.formstatus
  const userID = localStorage.getItem("userID");
  const [open, setOpen] = useState(false)
  const [filedopen, setfiledOpen] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [compatativeExamList, setCompatativeExamList] = useState(props.userData);
  const [typeofexam, setTypeofExam] = useState("");

// ----------------------------------------------------------------
  // const [compatativeExamLists, SetCompatativeExamList] = useState([]);
  const [userexamType, setUserExamType] = useState("");
  const navigation = useNavigate();
  const [commentbox, setCommentBox] = useState(false)
  const [GreExamForm, SetGreExamForm] = useState("");
  const [GmateExamForm, SetGmateExamForm] = useState([]);
  const [IELTSExamForm, SetIELTSExamForm] = useState("");
  const [TOEFLExamForm, SetTOEFLExamForm] = useState("");
  // const [typeofexam, setTypeofExam] = useState("");
  // const [compatativeExamList, SetCompatativeExamList] = useState([]);
  const [examdate, setExamDate] = useState("");
  // const userID = localStorage.getItem("userID");
  console.log("userID", userID);
  // const [open, setOpen] = useState(false);
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

  const handleSubmitt = async () => {
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
  const handleClosee = async () => {
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

  // delete 
  const HandleDeleteExam = (examname, index) => {
    const updatexamlist = [...compatativeExamList];
    updatexamlist.splice(index, 1);
    setCompatativeExamList(updatexamlist);
    console.log("examname", examname, index);
  };
  // 
  const [donebtn, setdonebtn] = useState(false);

  const HandleAddExams = () => {
    console.log('HandleAddExams typeogexam',typeofexam);
    console.log(compatativeExamList)
    setdonebtn(false);
    // if (Username !== undefined) {
      if (typeofexam === "GRE") {
        setCompatativeExamList((p)=>[
          ...p,
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
    // }

    // if (GmateUsername !== undefined) {
      if (typeofexam === "GMAT") {
        setCompatativeExamList([
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
    // }

    // if (IELTSUsername !== undefined) {
      if (typeofexam === "IELTS") {
        setCompatativeExamList([
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
    // }

    // if (TOEFLEUsername !== undefined) {
      if (typeofexam === "TOEFL") {
        setCompatativeExamList([
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
  // };

  // -----------------------------------------


  console.log("props.userData", props.userData)
  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleInputChange = (index, examType, field, value) => {
    const updatedList = [...compatativeExamList];
    updatedList[index][examType][field] = value;
    setCompatativeExamList(updatedList);
  };


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
       
      </div>}
      <br />
      
          <div style={{ border:"2px solid #00000080",padding:"20px",marginBottom:"20px"}}>
          <ValidatorForm onSubmit={handleSubmit} onError={() => {
        setCommentBox(true)
      }} >
       
      
      {compatativeExamList.map((item, index,key) => (
        <div key={index}>
        
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
             { compatativeExamList.length > 1 && <Button
                 style={{ color: "black" }}
                 disabled={!editMode}
                 onClick={() => {
                   HandleDeleteExam(typeofexam, key);
                 }}
               >
                 <span className="material-symbols-outlined">
                   <Icon  disabled={!editMode}>delete</Icon>
                 </span>
               </Button> }
             </div>
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
              { compatativeExamList.length > 1 && <Button
                 style={{ color: "black" }}
                 onClick={() => {
                   HandleDeleteExam(typeofexam, key);
                 }}
               >
                 <span className="material-symbols-outlined">
                   <Icon>delete</Icon>
                 </span>
               </Button> }
             </div>
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
              {compatativeExamList.length > 1 && <Button
                 style={{ color: "black" }}
                 onClick={() => {
                   HandleDeleteExam(typeofexam, key);
                 }}
               >
                 <span className="material-symbols-outlined">
                   <Icon>delete</Icon>
                 </span>
               </Button>}
             </div>
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
              {compatativeExamList.length > 1 && <Button
                 style={{ color: "black" }}
                 onClick={() => {
                   HandleDeleteExam(typeofexam, key);
                 }}
               >
                 <span className="material-symbols-outlined">
                   <Icon>delete</Icon>
                 </span>
               </Button> }
             </div>
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
            </div>
          )}
          <hr/>
           {compatativeExamList.length === index+1 &&  <div style={{ display: "flex", alignItems: "center" }}>
          <AutoComplete
            options={suggestio}
            disabled={!editMode}
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
             <Button style={{ marginLeft: "20px", marginTop: "-40px" }} disabled={!editMode} color="primary" variant="contained" onClick={HandleAddExams}>
            <Icon>add</Icon>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
          </Button>
        </div>}
   
        </div>
      ))}
        </ValidatorForm>
      </div>
       {editMode && (
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Save
          </Button>
        )}
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
