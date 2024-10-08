import React from "react";
import { TextField, Typography } from "@mui/material";
import { SimpleCard } from "app/components";
import { Autocomplete, Button, Grid, Icon, styled } from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { H3, Span } from "app/components/Typography";
import { useState } from "react";
import { persnoaldetailsupdate } from "Apis/Persnoldetailsform";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Recomendedform from "./Recomendedform";
import DeleteIcon from "@mui/icons-material/Delete";

const AutoComplete = styled(Autocomplete)(() => ({
  width: 300,
  marginBottom: "16px",
}));
const suggestio = [
  {
    label: "Professional",
  },
  {
    label: "Academic",
  },
];
const TextFieldvalidator = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Recemonderpre(props) {
  const recomenderlists = props?.userData ? props?.userData : [];
  const [recemenderform, setRecemenderform] = useState({});
  // const [recomenderlist, setRecomenderlist] = useState([]);
  const [commentbox, setCommentBox] = useState(false);
  const navigation = useNavigate();
  const [errormsg, setErrormsg] = useState("");
  const [filedopen, setfiledOpen] = useState(true);
  const formstatus = props.formstatus;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };
  const [editpage, setEditPage] = useState(false);
  const userID = localStorage.getItem("userID");
  const [editableData, setEditableData] = useState(recomenderlists);
  // const [Recemendorbtn, setRecemendorbtn] = useState(true);
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
    CompleteDescriptionofworkwithrecemomder,
  } = recemenderform;
  console.log(editableData, "editabledata");
  if (props?.userData?.length === 0) {
    return;
  }
  // console.log("recommed", Recomendedform)
  const obj = {
    CompleteDescriptionofworkwithrecemomder: "",
    DepartmentofRecommender: "",
    Designationofrecommender: "",
    Mobilenumberofrecommender: "",
    Nameofrecommender: "",
    Phonenoofrecommende: "",
    Qualificationofrecommender: "",
    Tenureoflinkage: "NA",
    cameincontactwithrecommender: "NA",
    emailofrecommender: "NA",
    typeofrecemonder: "Professional",
  };
  const obj1 = {
    CompleteDescriptionofworkwithrecemomder: "",
    DepartmentofRecommender: "NA",
    Designationofrecommender: "NA",
    Mobilenumberofrecommender: "23332323",
    Nameofrecommender: "NA",
    Phonenoofrecommende: "23332323",
    Qualificationofrecommender: "NA",
    Tenureoflinkage: "NA",
    cameincontactwithrecommender: "NA",
    emailofrecommender: "NA",
    typeofrecemonder: "Academic",
  };
  // add
  const handleaddrecomendation = () => {
    // if (typeofrecemonder) {
    // if (validate()) {
    setErrormsg("");
    // setRecemendorbtn(true);
    if (recemenderform.typeofrecemonder === "Academic"){
      setEditableData([...editableData, obj1]);
    }else{
      setEditableData([...editableData, obj])
    }
    
    // setRecemenderform({});
    // }
    // }
  };

  const HandledeleterecomenderDetails = (index) => {
    const updatedata = [...editableData];
    updatedata.splice(index, 1);
    setEditableData(updatedata);
  };
  // ------------------

  // const validate = () => {
  //   const validate = CompleteDescriptionofworkwithrecemomder?.trim().split(/\s+/).length >= 250
  //   if (validate) {
  //     setErrormsg("")
  //     return true
  //   }
  //   else {
  //     setErrormsg("Please Enter Min 250 Character")
  //     return false
  //   }
  // }

  //
  // ------------------------
  const handleSubmit = async () => {
    // if (validate()) {
    const recemonderdataa = [...recomenderlists, recemenderform];
    console.log("fd");
    try {
      const resp = await persnoaldetailsupdate(
        {
          recemonderform: JSON.stringify(recemonderdataa),
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
    // }
  };
  //

  const handleInputChange = (index, field, value) => {
    const newData = [...editableData];
    newData[index][field] = value;
    setEditableData(newData);
  };
  const handleEditSubmit = async () => {
    console.log("editableData", editableData);
    try {
      const resp = await persnoaldetailsupdate(
        {
          recemonderform: JSON.stringify(editableData),
        },
        userID
      );
      console.log("resp", resp);
      if (resp.status === 200) {
        handleOpen();
        setEditPage(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {!formstatus && (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setEditPage(!editpage);
            }}
          >
            Edit
          </Button>
        </div>
      )}
     
      {editableData?.map((item, key) => {
        return(
          <div
            // key={key}
            style={{ padding: "15px 15px", borderBottom: "1px solid" }}
          >
            <ValidatorForm
              onSubmit={handleSubmit}
              onError={() => {
                setCommentBox(true);
              }}
            >
              <div
                style={{
                  border: "2px solid #00000080",
                  padding: "20px",
                  marginBottom: "20px",
                }}
              >
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
                      label="Name Of Recommender:"
                      name={`Nameofrecommender-${key}`}
                      disabled={!editpage}
                      value={item.Nameofrecommender || ""}
                      onChange={(e) =>
                        handleInputChange(
                          key,
                          "Nameofrecommender",
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      style={{ width: "100%", marginTop: "15px" }}
                      type="text"
                      label="Qualification Of Recommender:"
                      name={`Qualificationofrecommender-${key}`}
                      disabled={!editpage}
                      value={item.Qualificationofrecommender || ""}
                      onChange={(e) =>
                        handleInputChange(
                          key,
                          "Qualificationofrecommender",
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      type="text"
                      style={{ width: "100%", marginTop: "15px" }}
                      label="Designation Of Recommender:"
                      name={`Designationofrecommender-${key}`}
                      disabled={!editpage}
                      value={item.Designationofrecommender || ""}
                      onChange={(e) =>
                        handleInputChange(
                          key,
                          "Designationofrecommender",
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      style={{ width: "100%", marginTop: "15px" }}
                      type="text"
                      label="Phone No Of Recommender:"
                      name={`Phonenoofrecommende-${key}`}
                      disabled={!editpage}
                      value={item.Phonenoofrecommende || ""}
                      onChange={(e) =>
                        handleInputChange(
                          key,
                          "Phonenoofrecommende",
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      style={{ width: "100%", marginTop: "15px" }}
                      type="text"
                      name={`DepartmentofRecommender-${key}`}
                      disabled={!editpage}
                      value={item.DepartmentofRecommender || ""}
                      onChange={(e) =>
                        handleInputChange(
                          key,
                          "DepartmentofRecommender",
                          e.target.value
                        )
                      }
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextField
                      style={{ width: "100%", marginTop: "15px" }}
                      type="text"
                      label="Mobile Of Recommender:"
                      name={`Mobilenumberofrecommender-${key}`}
                      disabled={!editpage}
                      value={item.Mobilenumberofrecommender || ""}
                      onChange={(e) =>
                        handleInputChange(
                          key,
                          "Mobilenumberofrecommender",
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      style={{ width: "100%", marginTop: "15px" }}
                      type="text"
                      name={`cameincontactwithrecommender-${key}`}
                      disabled={!editpage}
                      value={item.cameincontactwithrecommender || ""}
                      onChange={(e) =>
                        handleInputChange(
                          key,
                          "cameincontactwithrecommender",
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      style={{ width: "100%", marginTop: "15px" }}
                      type="text"
                      label="Email Of Recommender:"
                      name={`emailofrecommender-${key}`}
                      disabled={!editpage}
                      value={item.emailofrecommender || ""}
                      onChange={(e) =>
                        handleInputChange(
                          key,
                          "emailofrecommender",
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      style={{ width: "100%", marginTop: "15px" }}
                      type="text"
                      label="Tenure Of Linkage:"
                      name={`Tenureoflinkage-${key}`}
                      disabled={!editpage}
                      value={item.Tenureoflinkage || ""}
                      onChange={(e) =>
                        handleInputChange(
                          key,
                          "Tenureoflinkage",
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      style={{ width: "100%", marginTop: "15px" }}
                      type="text"
                      label="Complete Description Of Work With Him/her"
                      name={`CompleteDescriptionofworkwithrecemomder-${key}`}
                      disabled={!editpage}
                      value={item.CompleteDescriptionofworkwithrecemomder || ""}
                      onChange={(e) =>
                        handleInputChange(
                          key,
                          "CompleteDescriptionofworkwithrecemomder",
                          e.target.value
                        )
                      }
                    />
                  </Grid>
                </Grid>
                
              </div>
              
              {editableData.length === key+1 && <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px 0px",
                  
                }}
               
              >

                <AutoComplete
                  options={suggestio}
                  getOptionLabel={(option) => option.label}
                  onChange={(e, val) => {
                    setRecemenderform({
                      ...recemenderform,
                      typeofrecemonder: val?.label,
                    });
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
                 disabled={!editpage}
                  onClick={handleaddrecomendation}
                  color="primary"
                  variant="contained"
                  style={{ marginLeft: "20px", marginTop: "-50px" }}
                >
                  <Icon>add</Icon>
                  <Span sx={{ pl: 1, textTransform: "capitalize" }}>
                    Add More
                  </Span>
                </Button>
              </div>}
            </ValidatorForm>
           
            {editpage && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleEditSubmit}
              >
                Save
              </Button>
            )}
          </div>
        );
      })}

      {formstatus && (
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
    </div>
  );
}

export default Recemonderpre;
