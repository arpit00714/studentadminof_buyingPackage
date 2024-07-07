import React, { useState } from "react";
import { SimpleCard } from "app/components";
import { Autocomplete, Button, Grid, Icon, TextField, styled } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import apiUrl from "URLS/ApiUrl";
import { filesupload } from "Apis/filesupload";
import { persnoaldetailsupdate } from "Apis/Persnoldetailsform";
const TextFieldEdit = styled(TextField)(() => ({
  width: "100%",
  marginBottom: "16px"
}));
const TextFieldValidator = styled(TextField)(() => ({
  width: "100%",
  marginBottom: "16px"
}));
function Ugfromedit(props) {
  const formstatus = props.formstatus
  const userID = localStorage.getItem("userID");
  const userData = props.userData;
  const [filedopen, setfiledOpen] = useState(true);
  console.log("userData", userData)
  console.log("userData.length", userData.length);
  const userschooldata = userData[0]?.School;
  const Undergraduation = userData[0]?.Undergraduation;
  const Postgraduation = userData[0]?.postgradution;
  const userSpecialCourse = userData[0]?.specialcourse;
  const usersoftwareused = userData[0]?.softwareused;
  const usersportsActivity = userData[0]?.sportsActivity;
  const usercomputerlanguage = userData[0]?.computerlanguage;
  const userAcadmicassesmint = userData[0]?.Acadmicassesmint;
  const userorganization = userData[0]?.organization;
  const userPresentation = userData[0]?.Presentation;
  const userhonour = userData[0]?.honour;
  const publicationImg = userData[0]?.junoralpublicationing;
  const userpublicationdata = userData[0]?.publication.generalpublicationData;
  const [open, setOpen] = useState(false)
  const [editpage, setEditPage] = useState(false);
  const [SchoolData, setSchoolData] = useState(userschooldata)
  const [UndergraduationData, setUndergraduationData] = useState(Undergraduation)
  const [postgradutionDatra, SetPostGradutionData] = useState(Postgraduation)
  const [specialcourse, SetSpecialCourse] = useState(userSpecialCourse)
  const [softwareused, SetSoftwareused] = useState(usersoftwareused)
  const [sports, Setsports] = useState(usersportsActivity)
  const [computerlang, Setcompoterlangauge] = useState(usercomputerlanguage)
  const [Acadmicassesmint, SetAcadmicassesmint] = useState(userAcadmicassesmint)
  const [presentionData, SetpresentionData] = useState(userPresentation)
  const [PublicationData, SetPublicationData] = useState(userpublicationdata)
  const [publicationImage, setShowingpublicationImage] = useState("")
  const [addedPublicationImage, SetAddedPublicationImage] = useState(publicationImg)
  const [honorsData, SethonorsData] = useState(userhonour)
  const [organizationData, SetorganizationData] = useState(userorganization)
  const [uploadedprovisinoal, setuploadedprovisinoal] = useState("");
  const [sscmarksheet, setSscmarksheet] = useState("");
  const [ninthmarksheet, setNinthmarksheet] = useState("");
  const [eleventhmarksheet, seteleventhhmarksheet] = useState("");
  const [hscmarksheet, setHscmarksheet] = useState("");
  const [AcadmicDetailsData, SetAcademicDetailsData] = useState([]);
  const [undergradutionmarksheet, setundergrmarksheet] = useState("");
  const [postgradutionmarksheet, setstudentpostmarksheet] = useState("");
  const [postgradutionprovisinoal, setstudentpostprovisinoal] = useState("");
  if (props.userData.length === 0) {
    return;
  }
  // console.log("SchoolData", SchoolData)
  console.log("presentionData", presentionData)
  const handleInputChange = (section, field, value, index = null) => {
    switch (section) {
      case "sccschool":
        setSchoolData({ ...SchoolData, [field]: value });
        break;
      case "undergradution":
        if (index !== null) {
          const updatedYearlyCgpa = [...UndergraduationData.yearlycgpa];
          updatedYearlyCgpa[index] = value;
          setUndergraduationData({ ...UndergraduationData, yearlycgpa: updatedYearlyCgpa });
        } else {
          setUndergraduationData({ ...UndergraduationData, [field]: value });
        }
        break;
      case "postgradution":
        if (index !== null) {
          const updatedYearlyCgpa = [...postgradutionDatra.postyearlycgpa];
          updatedYearlyCgpa[index] = value;
          SetPostGradutionData({ ...postgradutionDatra, postyearlycgpa: updatedYearlyCgpa });
        } else {
          SetPostGradutionData({ ...postgradutionDatra, [field]: value });
        }
        break;
      case "specialcourse":
        if (index !== null) {
          const updatedSpecialCourse = [...specialcourse];
          updatedSpecialCourse[index] = value;
          SetSpecialCourse(updatedSpecialCourse);
        }
        break;
      case "software":
        if (index !== null) {
          const updatedSpecialCourse = [...softwareused];
          updatedSpecialCourse[index] = value;
          SetSoftwareused(updatedSpecialCourse);
        }
        break;
      case "sportsactivity":
        if (index !== null) {
          const updatedSpecialCourse = [...sports];
          updatedSpecialCourse[index] = value;
          Setsports(updatedSpecialCourse);
        }
        break;
      case "computerlangknow":
        if (index !== null) {
          const updatedSpecialCourse = [...computerlang];
          updatedSpecialCourse[index] = value;
          Setcompoterlangauge(updatedSpecialCourse);
        }
        break;
      case "assesment":
        if (index !== null) {
          const updatedAcadmicassesmint = [...Acadmicassesmint];
          updatedAcadmicassesmint[index] = {
            ...updatedAcadmicassesmint[index],
            [field]: value
          };
          SetAcadmicassesmint(updatedAcadmicassesmint);
        }
        break;
      case "presentation":
        if (index !== null) {
          const updatedAcadmicassesmint = [...presentionData];
          updatedAcadmicassesmint[index] = {
            ...updatedAcadmicassesmint[index],
            [field]: value
          };
          SetpresentionData(updatedAcadmicassesmint);
        }
        break;
      case "publicationitems":
        if (index !== null) {
          const updatedAcadmicassesmint = [...PublicationData];
          updatedAcadmicassesmint[index] = {
            ...updatedAcadmicassesmint[index],
            [field]: value
          };
          SetPublicationData(updatedAcadmicassesmint);
        }
        break;
      case "honorsachivment":
        if (index !== null) {
          const updatedAcadmicassesmint = [...honorsData];
          updatedAcadmicassesmint[index] = {
            ...updatedAcadmicassesmint[index],
            [field]: value
          };
          SethonorsData(updatedAcadmicassesmint);
        }
        break;
      case "memberorg":
        if (index !== null) {
          const updatedAcadmicassesmint = [...organizationData];
          updatedAcadmicassesmint[index] = {
            ...updatedAcadmicassesmint[index],
            [field]: value
          };
          SetorganizationData(updatedAcadmicassesmint);
        }
        break;
      default:
        break;
    }
  }


  const handlestudentbasicimg = async (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    const fd = new FormData();
    fd.append("student_sscmarksheet", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    SchoolData.studentsscmarksheet = data[0].filename;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSscmarksheet(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("Selected file:", file);
    console.log("File name:", fileName);
  }

  const handlestudentninthimg = async (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    const fd = new FormData();
    fd.append("student_ninthmarksheet", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    SchoolData.ninthmarkrsheet = data[0].filename;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNinthmarksheet(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("Selected file:", file);
    console.log("File name:", fileName);
  }

  const handlestudentEleventhimg = async (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    const fd = new FormData();
    fd.append("student_eleventhmarksheet", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    SchoolData.ninthmarkrsheet = data[0].filename;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        seteleventhhmarksheet(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("Selected file:", file);
    console.log("File name:", fileName);
  }

  const handlestudentHhcimg = async (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    const fd = new FormData();
    fd.append("student_Hhcmarksheet", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    SchoolData.studentHhcmarksheet = data[0].filename;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setHscmarksheet(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("Selected file:", file);
    console.log("File name:", fileName);
  }

  const handlestudentunderprovisinoldegree = async (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    const fd = new FormData();
    fd.append("student_underprovisinoaldegree", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    UndergraduationData.underprovisinoaldegree = data[0].filename;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setuploadedprovisinoal(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("Selected file:", file);
    console.log("File name:", fileName);
  }

  const handlestudentundergramarksheet = async (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    const fd = new FormData();
    fd.append("student_undermarksheet", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    UndergraduationData.studentundermarksheet = data[0].filename;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setundergrmarksheet(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("Selected file:", file);
    console.log("File name:", fileName);
  }


  const handlestudentPostmarksheet = async (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    const fd = new FormData();
    fd.append("student_postmarksheet", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    postgradutionDatra.studentpostmarksheet = data[0].filename;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setstudentpostmarksheet(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("Selected file:", file);
    console.log("File name:", fileName);
  }


  const handlestudentPostProvisnoal = async (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    const fd = new FormData();
    fd.append("student_postprovisinoal", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    SetAddedPublicationImage(data[0].filename)
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setstudentpostprovisinoal(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("Selected file:", file);
    console.log("File name:", fileName);
  }


  const handlestudentPublicationimage = async (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    const fd = new FormData();
    fd.append("student_publicationimg", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    postgradutionDatra.studentpostprovisinoal = data[0].filename;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setShowingpublicationImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("Selected file:", file);
    console.log("File name:", fileName);
  }




  console.log("UndergraduationData", UndergraduationData)
  const handleSave = async () => {
    const newAcademicDetails = {
      School: SchoolData,
      specialcourse: specialcourse,
      softwareused: softwareused,
      sportsActivity: sports,
      computerlanguage: computerlang,
      Acadmicassesmint: Acadmicassesmint,
      Presentation: presentionData,
      publication: PublicationData,
      studentpublicationimg: addedPublicationImage,
      honour: honorsData,
      organization: organizationData
    };

    SetAcademicDetailsData([...AcadmicDetailsData, newAcademicDetails]);

    // Step 2: Update the personal details using the API call
    try {
      const resp = await persnoaldetailsupdate(
        {
          AcademicDetailstatus: "done",
          AcademicDetailform: JSON.stringify([...AcadmicDetailsData, newAcademicDetails])
        },
        userID
      );
      if (resp.status === 200) {
        setOpen(false);
        SetAcademicDetailsData([]);
        // navigation("/student/material/CompatativeExam"); // Uncomment this if navigation is needed
      }
      console.log("resp", resp);
    } catch (err) {
      console.log(err);
    }

    // Step 3: Handle any UI updates (like opening or closing modals)
    setOpen(true);
    console.log("SchoolData", SchoolData);
    console.log("UndergraduationData", UndergraduationData);
  }

  const handleClose = async () => {
    setOpen(false);
  };

  return (
    <div>
      {!formstatus && <div>
        <Button color="primary" variant="contained" onClick={() => setEditPage(!editpage)}>
          {editpage ? "Cancel" : "Edit"}
        </Button>
        {editpage && (
          <Button color="secondary" variant="contained" onClick={handleSave}>
            Save
          </Button>
        )}
      </div>}

      <SimpleCard title="School">
        <Grid></Grid>
        {/* 9th 10th */}
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <h4>9th</h4>

            <TextFieldEdit
              name="ninthexam"
              disabled={!editpage}
              value={SchoolData?.ninthexam || ""}
              onChange={(e) => handleInputChange("sccschool", "ninthexam", e.target.value)}
            />


            <TextFieldEdit disabled={!editpage} type="text" label="Board"
              value={SchoolData?.ninthborad}
              onChange={(e) => handleInputChange("sccschool", "ninthborad", e.target.value)}
            />
            <TextFieldEdit
              disabled={!editpage}
              type="text"
              label="Institute"
              value={SchoolData?.ninthinstitute}
              onChange={(e) => handleInputChange("sccschool", "ninthinstitute", e.target.value)}
            />
            <TextFieldEdit
              disabled={!editpage}
              type="number"
              label="Aggregate Score"
              name="sscaggregtatescore"
              value={SchoolData?.ninthaggregtatescore}
              onChange={(e) => handleInputChange("sccschool", "ninthaggregtatescore", e.target.value)}
            />
            <TextFieldEdit
              disabled={!editpage}
              type="text"
              label="Subject"
              value={SchoolData?.ninthsubject}
              onChange={(e) => handleInputChange("sccschool", "ninthsubject", e.target.value)}
            />
            <TextFieldEdit
              disabled={!editpage}
              type="date"
              label="Year Of Passing"
              value={SchoolData?.ninthyearofpassing}
              onChange={(e) => handleInputChange("sccschool", "ninthyearofpassing", e.target.value)}
            />
            {/* 9th Marksheet */}

            {editpage ? (
              <TextFieldValidator
                type="file"
                name="studentImage"
                onChange={(e) => handlestudentninthimg(e)}
              />
            ) : (
              <img
                src={`${apiUrl}/api/${SchoolData?.ninthmarkrsheet}`}
                alt="dvd"
                style={{ width: "300px", height: "100px", objectFit: "cover" }}
              />
            )}
            {ninthmarksheet && (
              <img src={ninthmarksheet} alt="Student" style={{ maxWidth: "100px", maxHeight: "100px" }} />
            )}

          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <h4>10th</h4>

            <TextFieldEdit
              name="sscexam"
              disabled={!editpage}
              value={SchoolData?.sscexam || ""}
              onChange={(e) => handleInputChange("sccschool", "sscexam", e.target.value)}
            />


            <TextFieldEdit disabled={!editpage} type="text" label="Board"
              value={SchoolData?.sscborad}
              onChange={(e) => handleInputChange("sccschool", "sscborad", e.target.value)}
            />
            <TextFieldEdit
              disabled={!editpage}
              type="text"
              label="Institute"
              value={SchoolData?.sscinstitute}
              onChange={(e) => handleInputChange("sccschool", "sscinstitute", e.target.value)}
            />
            <TextFieldEdit
              disabled={!editpage}
              type="number"
              label="Aggregate Score"
              name="sscaggregtatescore"
              value={SchoolData?.sscaggregtatescore}
              onChange={(e) => handleInputChange("sccschool", "sscaggregtatescore", e.target.value)}
            />
            <TextFieldEdit
              disabled={!editpage}
              type="text"
              label="Subject"
              value={SchoolData?.sscsubject}
              onChange={(e) => handleInputChange("sccschool", "sscsubject", e.target.value)}
            />
            <TextFieldEdit
              disabled={!editpage}
              type="date"
              label="Year Of Passing"
              value={SchoolData?.sscyear}
              onChange={(e) => handleInputChange("sccschool", "sscyear", e.target.value)}
            />
            {/* 9th Marksheet */}

            {editpage ? (
              <TextFieldValidator
                type="file"
                name="studentImage"
                onChange={(e) => handlestudentbasicimg(e)}
              />
            ) : (
              <img
                src={`${apiUrl}/api/${SchoolData?.sscmarkrsheet}`}
                alt="dvd"
                style={{ width: "300px", height: "100px", objectFit: "cover" }}
              />
            )}
            {sscmarksheet && (
              <img src={sscmarksheet} alt="Student" style={{ maxWidth: "100px", maxHeight: "100px" }} />
            )}

          </Grid>
        </Grid>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <h4>11th</h4>

            <TextFieldEdit
              name="eleventhhexam"
              disabled={!editpage}
              value={SchoolData?.eleventhhexam || ""}
              onChange={(e) => handleInputChange("sccschool", "eleventhhexam", e.target.value)}
            />


            <TextFieldEdit disabled={!editpage} type="text" label="Board"
              value={SchoolData?.eleventhhborad}
              onChange={(e) => handleInputChange("sccschool", "eleventhhborad", e.target.value)}
            />
            <TextFieldEdit
              disabled={!editpage}
              type="text"
              label="Institute"
              value={SchoolData?.eleventhhinstitute}
              onChange={(e) => handleInputChange("sccschool", "eleventhhinstitute", e.target.value)}
            />
            <TextFieldEdit
              disabled={!editpage}
              type="number"
              label="Aggregate Score"
              name="sscaggregtatescore"
              value={SchoolData?.eleventhhaggregtatescore}
              onChange={(e) => handleInputChange("sccschool", "eleventhhaggregtatescore", e.target.value)}
            />
            <TextFieldEdit
              disabled={!editpage}
              type="text"
              label="Subject"
              value={SchoolData?.eleventhhsubject}
              onChange={(e) => handleInputChange("sccschool", "eleventhhsubject", e.target.value)}
            />
            <TextFieldEdit
              disabled={!editpage}
              type="date"
              label="Year Of Passing"
              value={SchoolData?.eleventpassingDate}
              onChange={(e) => handleInputChange("sccschool", "eleventpassingDate", e.target.value)}
            />
            {/* 9th Marksheet */}

            {editpage ? (
              <TextFieldValidator
                type="file"
                name="studentImage"
                onChange={(e) => handlestudentEleventhimg(e)}
              />
            ) : (
              <img
                src={`${apiUrl}/api/${SchoolData?.eleventhmarksheet}`}
                alt="dvd"
                style={{ width: "300px", height: "100px", objectFit: "cover" }}
              />
            )}
            {eleventhmarksheet && (
              <img src={eleventhmarksheet} alt="Student" style={{ maxWidth: "100px", maxHeight: "100px" }} />
            )}

          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <h4>12th</h4>
            <TextFieldEdit disabled={!editpage} value={SchoolData?.hscexam}
              onChange={(e) => handleInputChange("sccschool", "hscexam", e.target.value)}
            />
            <TextFieldEdit disabled={!editpage} type="text" label="Board" value={SchoolData?.hscborad}
              onChange={(e) => handleInputChange("sccschool", "hscborad", e.target.value)}
            />
            <TextFieldEdit
              disabled={!editpage}
              type="text"
              label="Institute"
              value={SchoolData?.hscinstitute}
              onChange={(e) => handleInputChange("sccschool", "hscinstitute", e.target.value)}
            />
            <TextFieldEdit
              disabled={!editpage}
              type="text"
              label="Aggregate Score"
              value={SchoolData?.hscaggregtatescore}
              onChange={(e) => handleInputChange("sccschool", "hscaggregtatescore", e.target.value)}
            />
            <TextFieldEdit
              disabled={!editpage}
              type="text"
              label="Subject"
              value={SchoolData?.hscsubject}
              onChange={(e) => handleInputChange("sccschool", "hscsubject", e.target.value)}
            />
            <TextFieldEdit
              disabled={!editpage}
              type="date"
              label="Year Of Passing"
              value={SchoolData?.hscyear}
              onChange={(e) => handleInputChange("sccschool", "hscyear", e.target.value)}
            />


            {editpage ? (
              <TextFieldValidator
                type="file"
                name="studentImage"
                onChange={(e) => handlestudentHhcimg(e)}
              />
            ) : (

              <img
                src={`${apiUrl}/api/${SchoolData?.hhcmarksheet}`}
                alt="dvd"
                style={{ width: "300px", height: "100px", objectFit: "cover" }}
              />
            )}
            {hscmarksheet && (
              <img src={hscmarksheet} alt="Student" style={{ maxWidth: "100px", maxHeight: "100px" }} />
            )}


          </Grid>
        </Grid>
        {/* 11th 12th */}

      </SimpleCard>


      {/* <div style={{ margin: "20px 0px" }}>
        <SimpleCard title="Under Gradution">
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextFieldEdit
                disabled={!editpage}
                type="text"
                name="instituename"
                label="Institute Name"
                value={UndergraduationData?.instituename}
                onChange={(e) => handleInputChange("undergradution", "instituename", e.target.value)}
              />
              <TextFieldEdit
                disabled={!editpage}
                type="text"
                label="Degree"
                value={UndergraduationData?.degree}
                onChange={(e) => handleInputChange("undergradution", "degree", e.target.value)}
              />
              <TextFieldEdit
                disabled={!editpage}
                type="text"
                label="Branch"
                value={UndergraduationData?.branch}
                onChange={(e) => handleInputChange("undergradution", "branch", e.target.value)}
              />
              <TextFieldEdit
                disabled={!editpage}
                type="text"
                label="Provisnoal Degree"
                value={UndergraduationData?.ProvisionalDegree}
                onChange={(e) => handleInputChange("undergradution", "ProvisionalDegree", e.target.value)}
              />
              <TextFieldEdit
                disabled={!editpage}
                type="text"
                label="Back Subject"
                value={UndergraduationData?.backsubjects}
                onChange={(e) => handleInputChange("undergradution", "backsubjects", e.target.value)}
              />
              <TextFieldEdit
                disabled={!editpage}
                type="text"
                label="Number of Back"
                value={UndergraduationData?.numberofback}
                onChange={(e) => handleInputChange("undergradution", "numberofback", e.target.value)}
              />
              <p>Marksheet</p>

              {editpage ? (
                <TextFieldValidator
                  type="file"
                  name="studentImage"
                  onChange={(e) => handlestudentundergramarksheet(e)}
                />
              ) : (

                <img
                  src={`${apiUrl}/api/${UndergraduationData?.studentundermarksheet
                    }`}
                  alt="dvd"
                  style={{ width: "300px", height: "100px", objectFit: "cover" }}
                />
              )}
              {undergradutionmarksheet && (
                <img src={undergradutionmarksheet} alt="Student" style={{ maxWidth: "100px", maxHeight: "100px" }} />
              )}

            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextFieldEdit
                disabled={!editpage}
                type="text"
                label="Cgpa Out Of"
                value={UndergraduationData?.cgpaPercentageoutof}
                onChange={(e) => handleInputChange("undergradution", "cgpaPercentageoutof", e.target.value)}
              />
              <TextFieldEdit
                disabled={!editpage}
                type="text"
                label="Cgpa"
                value={UndergraduationData?.cgpaPercentage}
                onChange={(e) => handleInputChange("undergradution", "cgpaPercentage", e.target.value)}
              />
              {UndergraduationData.yearlycgpa?.map((item, key) => {
                return <TextFieldEdit disabled={!editpage} value={item} label={`${key + 1} year %`}
                  onChange={(e) => handleInputChange("undergradution", "yearlycgpa", e.target.value, key)}
                />;
              })}
              <TextFieldEdit
                disabled={!editpage}
                type="date"
                label="year of Inception"
                value={UndergraduationData?.yearofInception}
                onChange={(e) => handleInputChange("undergradution", "yearofInception", e.target.value)}
              />
              <TextFieldEdit
                disabled={!editpage}
                type="date"
                label="year of Inception"
                value={UndergraduationData?.yearofpassing}
                onChange={(e) => handleInputChange("undergradution", "yearofpassing", e.target.value)}
              />

              <p>Provisional Degree</p>

              {editpage ? (
                <TextFieldValidator
                  type="file"
                  name="studentImage"
                  onChange={(e) => handlestudentunderprovisinoldegree(e)}
                />
              ) : (

                <img
                  src={`${apiUrl}/api/${UndergraduationData?.underprovisinoaldegree

                    }`}
                  alt="dvd"
                  style={{ width: "300px", height: "100px", objectFit: "cover" }}
                />
              )}
              {uploadedprovisinoal && (
                <img src={uploadedprovisinoal} alt="Student" style={{ maxWidth: "100px", maxHeight: "100px" }} />
              )}

            </Grid>
          </Grid>
        </SimpleCard>
      </div>

      <div style={{ margin: "20px 0px" }}>
        <SimpleCard title="Post Gradution">
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextFieldEdit
                disabled={!editpage}
                type="text"
                label="Institute Name"
                value={postgradutionDatra?.postinstituename}
                onChange={(e) => handleInputChange("postgradution", "postinstituename", e.target.value)}
              />
              <TextFieldEdit
                disabled={!editpage}
                type="text"
                label="Degree"
                value={postgradutionDatra?.postdegree}
                onChange={(e) => handleInputChange("postgradution", "postdegree", e.target.value)}
              />
              <TextFieldEdit
                disabled={!editpage}
                type="text"
                label="Branch"
                value={postgradutionDatra?.postbranch}
                onChange={(e) => handleInputChange("postgradution", "postbranch", e.target.value)}
              />
              <TextFieldEdit
                disabled={!editpage}
                type="text"
                label="Provisnoal Degree"
                value={postgradutionDatra?.postProvisionalDegree}
                onChange={(e) => handleInputChange("postgradution", "postProvisionalDegree", e.target.value)}
              />
              <TextFieldEdit
                disabled={!editpage}
                type="text"
                label="Back Subject"
                value={postgradutionDatra?.postbacksubjects}
                onChange={(e) => handleInputChange("postgradution", "postbacksubjects", e.target.value)}
              />
              <TextFieldEdit
                disabled={!editpage}
                type="text"
                label="Number of Back"
                value={postgradutionDatra?.postnumberofback}
                onChange={(e) => handleInputChange("postgradution", "postnumberofback", e.target.value)}
              />
              <p>Marksheet</p>
              {editpage ? (
                <TextFieldValidator
                  type="file"
                  onChange={(e) => handlestudentPostmarksheet(e)}
                />
              ) : (

                <img
                  src={`${apiUrl}/api/${postgradutionDatra?.studentpostmarksheet}`}
                  alt="dvd"
                  style={{ width: "300px", height: "100px", objectFit: "cover" }}
                />
              )}
              {postgradutionmarksheet && (
                <img src={postgradutionmarksheet} alt="Student" style={{ maxWidth: "100px", maxHeight: "100px" }} />
              )}

            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextFieldEdit
                disabled={!editpage}
                type="text"
                label="Cgpa Out Of"
                value={postgradutionDatra?.postcgpaPercentageoutof}
                onChange={(e) => handleInputChange("postgradution", "postcgpaPercentageoutof", e.target.value)}
              />
              <TextFieldEdit
                disabled={!editpage}
                type="text"
                label="Cgpa"
                value={postgradutionDatra?.cgpaPercentage}
              />
              {postgradutionDatra.postyearlycgpa?.map((item, key) => {
                return <TextFieldEdit disabled={!editpage} value={item} label={`${key + 1} year %`}

                  onChange={(e) => handleInputChange("postgradution", "cgpaPercentage", e.target.value, key)}
                />;
              })}
              <TextFieldEdit
                disabled={!editpage}
                type="date"
                label="year of Inception"
                value={postgradutionDatra?.postyearofInception}
                onChange={(e) => handleInputChange("postgradution", "postyearofInception", e.target.value)}
              />
              <TextFieldEdit
                disabled={!editpage}
                type="date"
                label="year of Inception"
                value={postgradutionDatra?.postyearofpassing}
                onChange={(e) => handleInputChange("postgradution", "postyearofpassing", e.target.value)}
              />

              <p>Provisional Degree</p>
              {editpage ? (
                <TextFieldValidator
                  type="file"
                  onChange={(e) => handlestudentPostProvisnoal(e)}
                />
              ) : (

                <img
                  src={`${apiUrl}/api/${postgradutionDatra?.studentpostprovisinoal}`}
                  alt="dvd"
                  style={{ width: "300px", height: "100px", objectFit: "cover" }}
                />
              )}
              {postgradutionprovisinoal && (
                <img src={postgradutionprovisinoal} alt="Student" style={{ maxWidth: "100px", maxHeight: "100px" }} />
              )}

            </Grid>
          </Grid>
        </SimpleCard>
      </div> */}

      <div style={{ margin: "20px 0px" }}>
        <SimpleCard title="special Course">
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              {specialcourse?.map((item, key) => {
                return <TextFieldEdit disabled={!editpage} value={item}
                  onChange={(e) => handleInputChange("specialcourse", "course", e.target.value, key)}
                />;
              })}
            </Grid>
          </Grid>
        </SimpleCard>
      </div>

      <div style={{ margin: "20px 0px" }}>
        <SimpleCard title="SoftWare Used">
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              {softwareused?.map((item, key) => {
                return <TextFieldEdit disabled={!editpage} value={item}
                  onChange={(e) => handleInputChange("software", "course", e.target.value, key)}
                />;
              })}
            </Grid>
          </Grid>
        </SimpleCard>
      </div>

      <div style={{ margin: "20px 0px" }}>
        <SimpleCard title="Sports Activity">
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              {sports.map((item, key) => {
                return <TextFieldEdit disabled={!editpage} value={item}
                  onChange={(e) => handleInputChange("sportsactivity", "course", e.target.value, key)}
                />;
              })}
            </Grid>
          </Grid>
        </SimpleCard>
      </div>

      <div style={{ margin: "20px 0px" }}>
        <SimpleCard title="Computer Langauge Known">
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              {computerlang?.map((item, key) => {
                return <TextFieldEdit disabled={!editpage} value={item}
                  onChange={(e) => handleInputChange("computerlangknow", "course", e.target.value, key)}
                />;
              })}
            </Grid>
          </Grid>
        </SimpleCard>
      </div>

      <div style={{ margin: "20px 0px" }}>
        <SimpleCard title="Acadmic Assesmint">
          {Acadmicassesmint?.map((item, key) => {
            return (
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextFieldEdit
                    disabled={!editpage}
                    label="Academic project"
                    value={item.selectedAcademicproject}
                    onChange={(e) => handleInputChange("assesment", "selectedAcademicproject", e.target.value, key)}
                  />
                  <TextFieldEdit disabled={!editpage} label="Project title" value={item.academicprojecttitle}
                    onChange={(e) => handleInputChange("assesment", "academicprojecttitle", e.target.value, key)}
                  />
                  <TextFieldEdit
                    disabled={!editpage}
                    label="Profesor Designation"
                    value={item.profesorDesignation}
                    onChange={(e) => handleInputChange("assesment", "profesorDesignation", e.target.value, key)}
                  />
                  <TextFieldEdit
                    disabled={!editpage}
                    label="Profesor Department"
                    value={item.profesordepartment}
                    onChange={(e) => handleInputChange("assesment", "profesordepartment", e.target.value, key)}
                  />
                  <TextFieldEdit disabled={!editpage} label="Project Summary" value={item.projectsummary}
                    onChange={(e) => handleInputChange("assesment", "projectsummary", e.target.value, key)}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextFieldEdit
                    disabled={!editpage}
                    label="Student Designation"
                    value={item.studentDesignation}
                    onChange={(e) => handleInputChange("assesment", "studentDesignation", e.target.value, key)}
                  />
                  <TextFieldEdit
                    disabled={!editpage}
                    label="Techinacal Roleand Support"
                    value={item.techinacalroleandsupport}
                    onChange={(e) => handleInputChange("assesment", "techinacalroleandsupport", e.target.value, key)}
                  />
                  <TextFieldEdit
                    type="date"
                    disabled={!editpage}
                    label="Acadmic Project Date To"
                    value={item.acadmicdatepicto}
                    onChange={(e) => handleInputChange("assesment", "acadmicdatepicto", e.target.value, key)}
                  />
                  <TextFieldEdit
                    type="date"
                    disabled={!editpage}
                    label="Acadmic Project Date From"
                    value={item.acadmicdatepicfrom}
                    onChange={(e) => handleInputChange("assesment", "acadmicdatepicfrom", e.target.value, key)}
                  />
                </Grid>
              </Grid>
            );
          })}
        </SimpleCard>
      </div>

      <div style={{ margin: "20px 0px" }}>
        <SimpleCard title="Presentation">
          {presentionData?.map((item, key) => {
            return (
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextFieldEdit
                    disabled={!editpage}
                    type="text"
                    name="Presentationtitle"
                    label="Title"
                    value={item.Presentationtitle || ""}
                    onChange={(e) => handleInputChange("presentation", "Presentationtitle", e.target.value, key)}
                  />
                  <TextFieldEdit
                    type="text"
                    disabled={!editpage}
                    name="Presentationsummary"
                    label="Summary"
                    value={item.Presentationsummary || ""}
                    onChange={(e) => handleInputChange("presentation", "Presentationsummary", e.target.value, key)}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextFieldEdit
                    type="text"
                    disabled={!editpage}
                    name="Competition"
                    label="Competition"
                    value={item.Competition}
                    onChange={(e) => handleInputChange("presentation", "Competition", e.target.value, key)}
                  />
                </Grid>
              </Grid>
            );
          })}
        </SimpleCard>
      </div>

      <div style={{ margin: "20px 0px" }}>
        <SimpleCard title="Journals/Publication">
          {editpage ? (
            <TextFieldValidator
              type="file"
              onChange={(e) => handlestudentPublicationimage(e)}
            />
          ) : (

            <img
              src={`${apiUrl}/api/${publicationImg}`}
              alt="dvd"
              style={{ width: "300px", height: "100px", objectFit: "contain" }}
            />
          )}
          {publicationImage && (
            <img src={publicationImage} alt="Student" style={{ maxWidth: "100px", maxHeight: "100px" }} />
          )}

          {PublicationData?.map((item, key) => {
            return (
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextFieldEdit
                    disabled={!editpage}
                    type="text"
                    label="ISBN Number"
                    value={item.Isbnnumbertitle || ""}
                    onChange={(e) => handleInputChange("publicationitems", "Isbnnumbertitle", e.target.value, key)}
                  />
                  <TextFieldEdit
                    type="text"
                    disabled={!editpage}
                    name="Presentationsummary"
                    label="Summary"
                    value={item.isbnsummary || ""}
                    onChange={(e) => handleInputChange("publicationitems", "isbnsummary", e.target.value, key)}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextFieldEdit
                    type="text"
                    disabled={!editpage}
                    name="Competition"
                    label="Publisher Name"
                    value={item.isbnpublishername}
                    onChange={(e) => handleInputChange("publicationitems", "isbnpublishername", e.target.value, key)}
                  />
                </Grid>
              </Grid>
            );
          })}
        </SimpleCard>
      </div>

      <SimpleCard title="Honours And Achievements">
        {honorsData?.map((item, key) => {
          return (
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextFieldEdit
                  type="text"
                  name="honorname"
                  label="Name"
                  disabled={!editpage}
                  value={item.honorname || ""}
                  onChange={(e) => handleInputChange("honorsachivment", "honorname", e.target.value, key)}
                />
                <TextFieldEdit
                  disabled={!editpage}
                  type="text"
                  name="honorsummery"
                  label="Sumary"
                  value={item.honorsummery || ""}
                  onChange={(e) => handleInputChange("honorsachivment", "honorsummery", e.target.value, key)}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextFieldEdit
                  disabled={!editpage}
                  type="text"
                  name="honoreventname"
                  label="Event Name "
                  value={item.honoreventname || ""}
                  onChange={(e) => handleInputChange("honorsachivment", "honoreventname", e.target.value, key)}
                />
                <TextFieldEdit
                  type="date"
                  disabled={!editpage}
                  name="honoreventname"
                  label="Year"
                  value={item.honoryear || ""}
                  onChange={(e) => handleInputChange("honorsachivment", "honoryear", e.target.value, key)}
                />
              </Grid>
            </Grid>
          );
        })}
      </SimpleCard>
      <div style={{ margin: "20px 0px" }}>
        <SimpleCard title="Member Of Organization">
          {organizationData?.map((item, key) => {
            return (
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextFieldEdit
                    type="text"
                    name="Organizationname"
                    disabled={!editpage}
                    label="Name"
                    value={item.Organizationname || ""}
                    onChange={(e) => handleInputChange("memberorg", "Organizationname", e.target.value, key)}
                  />
                  <TextFieldEdit
                    type="text"
                    disabled={!editpage}
                    name="OrganizationDesignation"
                    label="Designation"
                    value={item.OrganizationDesignation || ""}
                    onChange={(e) => handleInputChange("memberorg", "OrganizationDesignation", e.target.value, key)}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextFieldEdit
                    type="text"
                    disabled={!editpage}
                    name="Organizationsummary"
                    label="Work Summary "
                    value={item.Organizationsummary || ""}
                    onChange={(e) => handleInputChange("memberorg", "Organizationsummary", e.target.value, key)}
                  />
                  <TextFieldEdit
                    type="date"
                    disabled={!editpage}
                    name="Organizationsummary"
                    label="Tenure To"
                    value={item.OrganizationTenureTo || ""}
                    onChange={(e) => handleInputChange("memberorg", "OrganizationTenureTo", e.target.value, key)}
                  />
                  <TextFieldEdit
                    type="date"
                    disabled={!editpage}
                    name="Organizationsummary"
                    label="Tenure From"
                    value={item.OrganizationTenurefrom || ""}
                    onChange={(e) => handleInputChange("memberorg", "OrganizationTenurefrom", e.target.value, key)}
                  />
                </Grid>
              </Grid>
            );
          })}
        </SimpleCard>
      </div>

      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Data Update SucessFully"}</DialogTitle>
        <DialogContent></DialogContent>
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
  )
}

export default Ugfromedit;
