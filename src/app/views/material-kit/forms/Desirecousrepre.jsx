import React, { useState } from "react";
import { Button, Grid, TextField, Typography,MenuItem,Icon,styled } from "@mui/material";
import { H3, Span } from 'app/components/Typography';
import { UniversityList } from "Apis/University";
import { useEffect } from "react";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
import { persnoaldetailsupdate } from "Apis/Persnoldetailsform";
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSpring, animated } from '@react-spring/web';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from 'react-router-dom';
import { SimpleCard } from 'app/components';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import zIndex from "@mui/material/styles/zIndex";
import { List } from "echarts";

const TextFieldValidator = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));
const initialDesireCourseState = {
  universityName: '',
  course: '',
  intake: '',
  Weblink: '',
  courseDate: ''
};

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
  const [desireCourselist, setDesireCourseList] = useState([]);
  const [desireCourse, setDesireCourse] = useState(initialDesireCourseState);
  const [showfrom, setShowfrom] = useState(true);
  const [showndesirecoureses, setshowDesireCourse] = useState([]);
  const [selcetAddnew, setSelectAddNew] = useState(false);
  const [intake, Setintake] = useState('');
  const [coursedate, setDesireCourseDate] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    window.location.reload();
  };
  const formstatus = props.formstatus
  const [filedopen, setfiledOpen] = useState(true);
  const [age, setAge] = useState("");
  const showndesirecourese = props?.userData ? props?.userData : []
  const [unList, setUNList] = useState([]);
  const [editpage, setEditPage] = useState(false);
  const [editableData, setEditableData] = useState(showndesirecourese);
  const navigation = useNavigate();
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

   console.log(editableData,"editabledata")
   console.log(desireCourse,"desireCourse")

   const handleSubmit = async () => {
     const desiredata = [...showndesirecourese, desireCourse]

    try {
      const resp = await persnoaldetailsupdate(
        {
          desirecourseform: JSON.stringify(desiredata)
        },
        userID,
      );
      if (resp.status === 200) {
        setOpen(false);
        navigation('/student/material/PersnolQuestion');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    
    setDesireCourse({ ...editableData, [event.target.name]: event.target.value });
  };

  const handleDeleteCourse = (index) => {
    const updatedList = [...editableData];
    updatedList.splice(index, 1);
    setEditableData(updatedList);
    // setEditableData(updatedList);  // Sync `desireCourselist` with updated `showndesirecourese`
    console.log("deletedelaekldkdekldeletedlete")
  };

  const handleAdddesireCourse = () => {
    // if (desireCourse.universityName !== "") {
    //   setShowfrom(!showfrom);
     const updatedata = [...editableData, desireCourse];
     setEditableData(updatedata)
      // setDesireCourse([...desireCourse,desireCourse])
      // setEditableData([...editableData, desireCourse])
      // setSelectAddNew(false);
    // }
    setDesireCourse(initialDesireCourseState);
    return updatedata
    // setDesireCourseList({})
  };

  const handleEditSubmit = async () => {
    console.log(desireCourse.universityName,"desireCourse.universityName")
    // if(desireCourse.universityName)
    //  handleAdddesireCourse();
    try {
      const resp = await persnoaldetailsupdate(
        {
          desirecourseform: JSON.stringify(desireCourse.universityName?handleAdddesireCourse():editableData),
          // desirecourseform: JSON.stringify(update)
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
    <>
    <div>
      {!formstatus && <div>
        <Button variant="contained" color="primary" onClick={() => {
          setEditPage(!editpage);
        }}>
          Edit
        </Button>
      </div>}
     <br />
     
      <div style={{ border:"2px solid #00000080",padding:"20px",marginBottom:"20px"}}>
      {editableData?.map((item, key) => (
        <div key={key} style={{ position: 'relative', height: '350px', marginTop: '10px' }}>
        <div style={{  right: '0px', cursor: 'pointer' }}>
          <DeleteIcon onClick={() => handleDeleteCourse(key)} />
        </div>
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
      </div>
      ))}
      <hr />
       <ValidatorForm onSubmit={handleSubmit} >
        <SimpleCard title="Universities And Courses You Desire">

          <div>
            <Grid></Grid>
            <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0px' }}>
              <H3>Universities</H3>
              <Button onClick={handleAdddesireCourse} disabled={!editpage} color='primary' variant='contained' style={{ marginLeft: '10px' }}>
                <Icon>add</Icon>
                <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Add More</Span>
              </Button>
            </div>

            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                {selcetAddnew === false && (
                  <Select
                    style={{ width: '100%', marginBottom: '16px' }}
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    disabled={!editpage}
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                      setDesireCourse({ ...desireCourse, universityName: e.target.value });
                    }}
                  >
                    {unList.map((item) => item.status && <MenuItem key={item.UniversityName} value={item.UniversityName}>{item.UniversityName}</MenuItem>)}
                    <div style={{ width: '100%', justifyContent: 'center', display: 'flex', margin: '10px 0px' }}>
                      <button
                        onClick={() => setSelectAddNew(true)}
                        style={{ width: '80%', border: 'none', background: 'white', cursor: 'pointer' }}
                      >
                        Add New
                      </button>
                    </div>
                  </Select>
                )}
              
                {selcetAddnew && (
                  <TextFieldValidator
                  disabled={!editpage}
                    type='text'
                    name='universityName'
                    label='Name'
                    onChange={handleChange}
                    value={desireCourse.universityName}
                    validators={['required']}
                    errorMessages={['this field is required']}
                  />
                )}
              
                <TextFieldValidator
                disabled={!editpage}
                  type='text'
                  name='course'
                  label='course'
                  onChange={handleChange}
                  value={desireCourse.course}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <div style={{ width: '100%' }}>
                  <H3>Intake</H3>
                  <Select
                  disabled={!editpage}
                    placeholder='intake'
                    style={{ width: '100%', marginBottom: '16px' }}
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={intake}
                    onChange={(e) => {
                      Setintake(e.target.value);
                      setDesireCourse({ ...desireCourse, intake: e.target.value });
                    }}
                  >
                    <MenuItem value={'Spring'}>Spring</MenuItem>
                    <MenuItem value={'Spring'}>Fall</MenuItem>
                    <MenuItem value={'Winter'}>Winter</MenuItem>
                    <MenuItem value={'Summer'}>Summer</MenuItem>
                  </Select>
                </div>

                <TextFieldValidator
                disabled={!editpage}
                  type='text'
                  name='Weblink'
                  label='Weblink'
                  onChange={handleChange}
                  value={desireCourse.Weblink}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />

                <LocalizationProvider adapterLocale="en" dateAdapter={AdapterMoment}>
                  <DatePicker
                   disabled={!editpage}
                    views={["year"]}
                    label="Year"
                    value={coursedate}
                    onChange={(value) => {
                      setDesireCourseDate(value);
                      setDesireCourse({ ...desireCourse, courseDate: moment(value).format('YYYY') });
                    }}
                    renderInput={(props) => <TextField {...props} label='Course Year' style={{ width: '100%', marginBottom: '16px' }} />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            {/* <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <Button onClick={handleSaveCourse} color='primary' variant='contained' style={{ margin: '30px 0px' }}>
                Save
              </Button>
            </div> */}

          </div>
        </SimpleCard>
      {/* <Button style={{ marginTop: "20px" }} color="primary" variant="contained" onClick={() => {
        handleEditSubmit()
      }}>Submit</Button> */}
      <br />
      {editpage && (
          <Button variant="contained" color="secondary" onClick={handleEditSubmit}>
            Save
          </Button>
        )}
        </ValidatorForm>
        </div>


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
</>
  );
}

export default Desirecousrepre;
