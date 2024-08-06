import React, { useState, useEffect } from 'react';
import { Select, MenuItem, Button, Grid, Icon, styled, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { H3, Span } from 'app/components/Typography';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import DeleteIcon from '@mui/icons-material/Delete';
import { persnoaldetailsupdate } from 'Apis/Persnoldetailsform';
import { useNavigate } from 'react-router-dom';
import { UniversityList } from 'Apis/University';
import moment from 'moment';
import Popup from './Popup';
import { SimpleCard } from 'app/components';

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
function DesireCourseform(props) {
  const [age, setAge] = useState('');
  const [intake, Setintake] = useState('');
  const [coursedate, setDesireCourseDate] = useState(null);
  const [selcetAddnew, setSelectAddNew] = useState(false);
  const isFormFiled = props.userData;
  const [filedopen, setfiledOpen] = useState(true);
  const [commentbox, setCommentBox] = useState(false);
  const [desireCourse, setDesireCourse] = useState(initialDesireCourseState);

  const [showndesirecourese, setshowDesireCourse] = useState([]);
  const [unList, setUNList] = useState([]);
  const [open, setOpen] = useState(false);
  const [desireCourselist, setDesireCourseList] = useState([]);
  const [showfrom, setShowfrom] = useState(true);
  const navigation = useNavigate();
  const userID = localStorage.getItem('userID');

  const handleChange = (event) => {
    setCommentBox(false);
    setDesireCourse({ ...desireCourse, [event.target.name]: event.target.value });
  };
  console.log("desireCourselist", desireCourselist)
  const handleAdddesireCourse = () => {
    if (desireCourse.universityName !== "") {
      setShowfrom(!showfrom);
      setshowDesireCourse([...showndesirecourese, desireCourse]);
      setDesireCourseList([...desireCourselist, desireCourse])
      setSelectAddNew(false);
    }
    setDesireCourse(initialDesireCourseState);
    // setDesireCourseList({})
  };

  const handleSaveCourse = () => {
    if (desireCourse.universityName !== '') {
      setshowDesireCourse([...showndesirecourese, desireCourse]);
      setDesireCourseList([...desireCourselist, desireCourse]);  // Update this to add the saved courses to `desireCourselist`
      setDesireCourse({
        universityName: '',
        course: '',
        intake: '',
        Weblink: '',
        courseDate: ''
      });
      Setintake('');
      setAge('');
      setDesireCourseDate(null);
      setShowfrom(false);
    }
  };

  const handleDeleteCourse = (index) => {
    const updatedList = [...showndesirecourese];
    updatedList.splice(index, 1);
    setshowDesireCourse(updatedList);
    setDesireCourseList(updatedList);  // Sync `desireCourselist` with updated `showndesirecourese`
  };

  const handleSubmit = async () => {
    const desiredata = [...desireCourselist, desireCourse]
    try {
      const resp = await persnoaldetailsupdate(
        {
          desirecourseform: JSON.stringify(desiredata)
        },
        userID
      );
      if (resp.status === 200) {
        setOpen(false);
        navigation('/student/material/PersnolQuestion');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = async () => {
    try {
      const resp = await persnoaldetailsupdate(
        {
          desirecourseform: JSON.stringify(desireCourselist)
        },
        userID
      );
      if (resp.status === 200) {
        setOpen(false);
        navigation('/student/material/PersnolQuestion');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const university = async () => {
      const resp = await UniversityList();
      if (resp.status === 200) {
        const data = await resp.json();
        setUNList(data);
      }
    };
    university();
  }, []);

  return (
    <div>
     <div style={{ border:"2px solid #00000080",padding:"20px",marginBottom:"20px"}}>
      {showndesirecourese.map((item, key) => (
        <div key={key} style={{ position: 'relative', height: '350px', marginTop: '10px' }}>
          <div style={{ position: 'absolute', right: '0px', cursor: 'pointer' }}>
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
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                label='University Name'
                style={{ width: '100%', marginBottom: '16px' }}
                type='text'
                disabled={true}
                value={item.universityName}
              />
              <TextField
                label='Course'
                style={{ width: '100%', marginBottom: '16px' }}
                type='text'
                disabled={true}
                value={item.course}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                label='Intake'
                style={{ width: '100%', marginBottom: '16px' }}
                type='text'
                disabled={true}
                value={item.intake}
              />
              <TextField
                label='Course Year'
                style={{ width: '100%', marginBottom: '16px' }}
                type='text'
                disabled={true}
                value={item.courseDate}
              />
              <TextField
                label='Weblink'
                style={{ width: '100%', marginBottom: '16px' }}
                type='text'
                disabled={true}
                value={item.Weblink}
              />
            </Grid>
          </Grid>
        </div>
        </div>
      ))}
      {commentbox && <Popup commentbox={commentbox} setCommentBox={setCommentBox} />}

      <ValidatorForm onSubmit={handleSubmit} onError={() => setCommentBox(true)}>
        <SimpleCard title="Universities And Courses You Desire">

          <div>
            <Grid></Grid>
            <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0px' }}>
              <H3>Universities</H3>
              <Button onClick={handleAdddesireCourse} color='primary' variant='contained' style={{ marginLeft: '10px' }}>
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

        <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "20px 0px" }}>
          <Button color='primary' variant='contained' type='submit'>
            Next  & Continue
          </Button>
        </div>
      </ValidatorForm>
        </div>

      <Dialog open={open} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Confirm</DialogTitle>
        <DialogContent>
          <h3>Did you review all the details? </h3>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleClose} color='primary'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default DesireCourseform;
