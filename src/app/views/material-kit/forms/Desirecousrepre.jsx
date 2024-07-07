import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { UniversityList } from "Apis/University";
import { useEffect } from "react";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { persnoaldetailsupdate } from "Apis/Persnoldetailsform";
import { useSpring, animated } from '@react-spring/web';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
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
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};




function Desirecousrepre(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    window.location.reload();
  };
  const formstatus = props.formstatus
  const [filedopen, setfiledOpen] = useState(true);
  const [age, setAge] = useState("");
  const showndesirecourese = props.userData;
  const [unList, setUNList] = useState([]);
  const [editpage, setEditPage] = useState(false);
  const [editableData, setEditableData] = useState(showndesirecourese);
  console.log("showndesirecourese", showndesirecourese)
  const handleInputChange = (index, field, value) => {
    const newData = [...editableData];
    newData[index][field] = value;
    setEditableData(newData);
  };

  const userID = localStorage.getItem("userID");
  const handleSElectChange = (event) => {
    setAge(event.target.value);
    console.log("event.target.value", event.target.value);
    const selectedValue = event.target.value;
    // setDesireCourse((prevDesireCourse) => ({
    //   ...prevDesireCourse,
    //   universityName: selectedValue
    // }));
    // desireCourse.UniversityName = event.target.value;
  };
  useEffect(() => {
    const university = async () => {
      const resp = await UniversityList();
      console.log("resp", resp.status);
      if (resp.status === 200) {
        const data = resp.json();
        console.log("univrsituydata", await data);
        const list = await data;
        console.log("list", list)
        setUNList(list);
      }
    };
    university();
  }, []);


  const handleEditSubmit = async () => {
    try {
      const resp = await persnoaldetailsupdate(
        {
          desirecourseform: JSON.stringify(editableData)
        },
        userID
      );
      console.log("resp", resp);
      if (resp.status === 200) {
        handleOpen()
        setEditPage(false)
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      {!formstatus && <div>
        <Button variant="contained" color="primary" onClick={() => {
          setEditPage(!editpage);
        }}>
          Edit
        </Button>
        {editpage && (
          <Button variant="contained" color="secondary" onClick={handleEditSubmit}>
            Submit
          </Button>
        )}
      </div>}

      {editableData.map((item, key) => (
        <div
          key={key}
          style={{
            position: "relative",
            height: "250px",
            marginTop: "10px"
          }}
        >
          <Grid container spacing={6} style={{ marginTop: "10px" }}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

              {/* <Select
                style={{ width: "100%", marginBottom: "16px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleSElectChange}
              >
                {unList.map((item) => {
                  return (
                    item.status === true && (
                      <MenuItem value={item.UniversityName}>{item.UniversityName}</MenuItem>
                    )
                  );
                })}

                <div
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    display: "flex",
                    margin: "10px 0px"
                  }}
                >
                  <button
                    onClick={() => {
                      // setSelectAddNew(true);
                      console.log("Re");
                    }}
                    style={{ width: "80%", border: "none", background: "white", cursor: "pointer" }}
                  >
                    Add New
                  </button>
                </div>
              </Select> */}
              <TextField
                style={{ width: "100%", marginBottom: "16px" }}
                type="text"
                disabled={!editpage}
                name={`universityName-${key}`}
                value={item.universityName || ""}
                onChange={(e) => handleInputChange(key, "universityName", e.target.value)}
              />


              <TextField
                style={{ width: "100%", marginBottom: "16px" }}
                type="text"
                label="course"
                disabled={!editpage}
                name={`course-${key}`}
                value={item.course || ""}
                onChange={(e) => handleInputChange(key, "course", e.target.value)}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                style={{ width: "100%", marginBottom: "16px" }}
                type="text"
                label="Intake"
                disabled={!editpage}
                name={`intake-${key}`}
                value={item.intake || ""}
                onChange={(e) => handleInputChange(key, "intake", e.target.value)}
              />
              <TextField
                style={{ width: "100%", marginBottom: "16px" }}
                type="text"
                label="Weblink"
                disabled={!editpage}
                name={`Weblink-${key}`}
                value={item.Weblink || ""}
                onChange={(e) => handleInputChange(key, "Weblink", e.target.value)}
              />
              <TextField
                label="Year"
                style={{ width: "100%", marginBottom: "16px" }}
                type="text"
                disabled={!editpage}
                name={`courseDate-${key}`}
                value={item.courseDate || ""}
                onChange={(e) => handleInputChange(key, "courseDate", e.target.value)}
              />
            </Grid>
          </Grid>

        </div>
      ))}
      {/* <Button style={{ marginTop: "20px" }} color="primary" variant="contained" onClick={() => {
        handleEditSubmit()
      }}>Submit</Button> */}


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

export default Desirecousrepre;
