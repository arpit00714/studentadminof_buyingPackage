import React, { useState } from "react";
import { SimpleCard } from "app/components";
import {
  Autocomplete,
  Button,
  Grid,
  Icon,
  TextField,
  styled,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import apiUrl from "URLS/ApiUrl";
import { H3, H4, Span } from "app/components/Typography";
import { filesupload } from "Apis/filesupload";
import { persnoaldetailsupdate } from "Apis/Persnoldetailsform";
import { PaddingRounded } from "@mui/icons-material";
const TextFieldEdit = styled(TextField)(() => ({
  width: "100%",
  marginBottom: "16px",
}));
const TextFieldValidator = styled(TextField)(() => ({
  width: "100%",
  marginBottom: "16px",
}));
function Acadmeicfromedit(props) {
  const formstatus = props.formstatus;
  const userID = localStorage.getItem("userID");
  const userData = props.userData;
  const [filedopen, setfiledOpen] = useState(true);
  console.log("userData", userData);
  console.log("userData.length", userData.length);
  const userschooldata = userData[0]?.School;
  const UndergraduationData = userData[0]?.Undergraduation;
  const Postgraduation = userData[0]?.postgradution;
  const userSpecialCourse = userData[0]?.specialcourse;
  const usersoftwareused = userData[0]?.softwareused;
  const usersportsActivity = userData[0]?.sportsActivity;
  const usercomputerlanguage = userData[0]?.computerlanguage;
  const userAcadmicassesmint = userData[0]?.Acadmicassesmint;
  const userorganization = userData[0]?.organization;
  const userPresentation = userData[0]?.Presentation;
  const userhonour = userData[0]?.honour;
  const publicationImg = userData[0]?.studentpublicationimg;
  const userpublicationdata = userData[0]?.publication;
  const [open, setOpen] = useState(false);
  const [editpage, setEditPage] = useState(false);
  const [SchoolData, setSchoolData] = useState(userschooldata);
  console.log(UndergraduationData?.cgpaPercentage,"UndergraduationData?.cgpaPercentage")
  const [cgpaPercentageList, setCgpaPercentageList] = useState(
    UndergraduationData?.yearlycgpa
  );
  const [postcgpaPercentageList, setPostCgpaPercentageList] = useState(
    Postgraduation?.postyearlycgpa
  );
  const [spcoursebtn, setspcoursebtn] = useState(false);
  const [postgradutionDatra, SetPostGradutionData] = useState(Postgraduation);
  const [specialcourse, SetSpecialCourse] = useState(userSpecialCourse);
  const [newaddspecializedcourses, setNewaddspecializedcourses] = useState(
    specialcourse
  );
  const [addspecializedcourses, setSpecializedcourses] = useState("");
  const [softwareused, SetSoftwareused] = useState(usersoftwareused);
  const [sports, Setsports] = useState(usersportsActivity);
  const [computerlang, Setcompoterlangauge] = useState(usercomputerlanguage);
  const [selectedAcademicproject, setSelectedAcademicproject] = useState("");
  const [Acadmicassesmint, SetAcadmicassesmint] =
    useState(userAcadmicassesmint);
  const [acadmicform, setAcadmicForm] = useState({});
  const [academicprojectdata, setAcadmicprojectData] = useState([]);
  const [academicproBtn, setAcademicproBtn] = useState(true);
  const [acadmicdatepicto, setAcadmicDatepicto] = useState("");
  const [acadmicdatepicfrom, setAcadmicDatepicfrom] = useState("");
  const [presentionData, SetpresentionData] = useState(userPresentation);
  const [PublicationData, SetPublicationData] = useState(userpublicationdata);
  const [publicationImage, setShowingpublicationImage] = useState("");
  const [addedPublicationImage, SetAddedPublicationImage] =
  useState(publicationImg);
  const [honorsData, SethonorsData] = useState(userhonour);
  const [organizationData, SetorganizationData] = useState(userorganization);
  const [uploadedprovisinoal, setuploadedprovisinoal] = useState("");
  const [sscmarksheet, setSscmarksheet] = useState("");
  const [hscmarksheet, setHscmarksheet] = useState("");
  const [AcadmicDetailsData, SetAcademicDetailsData] = useState([]);
  const [undergradutionmarksheet, setundergrmarksheet] = useState("");
  const [postgradutionmarksheet, setstudentpostmarksheet] = useState("");
  const [postgradutionprovisinoal, setstudentpostprovisinoal] = useState("");
  if (props.userData.length === 0) {
    return;
  }
  
  const handleaddgradution = () => {
    setCgpaPercentageList([...cgpaPercentageList, ""]);
  };

  const handleunderPercentage = (index) => {
    const updateunderper = [...cgpaPercentageList];
    updateunderper.splice(index, 1);
    setCgpaPercentageList(updateunderper);
  };

  const updatePercentageList = (value, index) => {
    const updatedList = [...cgpaPercentageList];
    updatedList[index] = value;
    setCgpaPercentageList(updatedList);
  };

// Postgraduation
const handlepostaddgradution = () => {
    setPostCgpaPercentageList([...postcgpaPercentageList, ""]);
  };
  const handlepostChange = (value, index) => {
    const updatepostgradution = [...postcgpaPercentageList];
    updatepostgradution[index] = value;
    setPostCgpaPercentageList(updatepostgradution);
  };
  const handlepostPercentage = (index) => {
    const updateunderper = [...postcgpaPercentageList];
    updateunderper.splice(index, 1);
    setPostCgpaPercentageList(updateunderper);
  };
// 

// addspecialcourse
const handleaddspecializedcourses = () => {
    SetSpecialCourse([...specialcourse, ""]);
  };

  const handleSplCrsChange = (value, index) => {
    // const updateSplCrs = [...newaddspecializedcourses];
    const updateSplCrs = [...specialcourse];
    updateSplCrs[index] = value;
    SetSpecialCourse(updateSplCrs);
    setSpecializedcourses("");
  };

  const handlespecialcoursedelte = (key) => {
    const updatedList = [...specialcourse];
    updatedList.splice(key, 1);
    SetSpecialCourse(updatedList);
  };
//  

// softwareuse
const handleadSoftwareUse = () => {
  SetSoftwareused([...softwareused, ""]);
}

const handleSoftwareUsedelte = (key) => {
  const updatedsftuse = [...softwareused];
  updatedsftuse.splice(key, 1);
  SetSoftwareused(updatedsftuse);
};

const handlesftchange = (value, index) => {
  const updatesftuse = [...softwareused];
  updatesftuse[index] = value;
  SetSoftwareused(updatesftuse);
};

// sportactivity
const handleadSportActivity = () => {
  Setsports([...sports, ""])
}

const handlesportschange = (value, index) => {
  const updatesports = [...sports];
  updatesports[index] = value;
  Setsports(updatesports);
};

const handlesportsdelete = (key) => {
  const updatedsportuse = [...sports];
  updatedsportuse.splice(key, 1);
  Setsports(updatedsportuse);
};

// Computer Language
const handledComputerLang = () => {
  Setcompoterlangauge([...computerlang, ""])
}

const handleComputerLangchange = (value, index) => {
  const updatecomputerLang = [...computerlang];
  updatecomputerLang[index] = value;
  Setcompoterlangauge(updatecomputerLang);
};

const handleComputerdelete = (key) => {
  const updatedcompLang = [...computerlang];
  updatedcompLang.splice(key, 1);
  Setcompoterlangauge(updatedcompLang);
};

// AcedmicDetail
let data = {
  selectedAcademicproject: selectedAcademicproject,
  acadmicdatepicto: acadmicdatepicto,
  acadmicdatepicfrom: acadmicdatepicfrom,
  techinacalroleandsupport: acadmicform.techinacalroleandsupport,
  studentDesignation: acadmicform.studentDesignation,
  academicprojecttitle: acadmicform.academicprojecttitle,
  profesorDesignation: acadmicform.profesorDesignation,
  profesordepartment: acadmicform.profesordepartment,
  projectsummary: acadmicform.projectsummary
};
const handleaddAcademicAssignment = () => {
  console.log(Acadmicassesmint,"Acadmicassesmint")
  setAcademicproBtn(true);

    const updatedata = [...Acadmicassesmint, data];
    SetAcadmicassesmint(updatedata);
    acadmicform.selectedAcademicproject = "";
    acadmicform.techinacalroleandsupport = "";
    acadmicform.studentDesignation = "";
    acadmicform.academicprojecttitle = "";
    acadmicform.profesorDesignation = "";
    acadmicform.profesordepartment = "";
    acadmicform.projectsummary = "";
    setAcadmicDatepicto("");
    setAcadmicDatepicfrom("");
    setSelectedAcademicproject("");
  // }
};

const HandleAcademicAssDelete = (index) => {
  const updateAcademic = [...Acadmicassesmint];
  updateAcademic.splice(index, 1);
  SetAcadmicassesmint(updateAcademic);
};

//  presentation

const handleaddPresentation = () => {
    SetpresentionData([
      ...presentionData,
      {
        Presentationtitle: acadmicform.Presentationtitle,
        Presentationsummary: acadmicform.Presentationsummary,
        Competition: acadmicform.Competition
      }
    ]);
    acadmicform.Presentationtitle = "";
    acadmicform.Presentationsummary = "";
    acadmicform.Competition = "";
};

const HandlepresentationDataDelete = (index) => {
  const updatepresentationData = [...presentionData];
  updatepresentationData.splice(index, 1);
  SetpresentionData(updatepresentationData);
};
//

// publication
const addGeneralpublication = () => {
    console.log(PublicationData,"publicationdata")
    SetPublicationData([
      ...PublicationData,
      {
        // Isbnnumberimg : addedPublicationImage.Isbnnumberimg,
        Isbnnumbertitle: acadmicform.Isbnnumbertitle,
        isbnsummary: acadmicform.isbnsummary,
        isbnpublishername: acadmicform.isbnpublishername
      }
    ]);
    // acadmicdatepicfrom.Isbnnumberimg = "";
    acadmicform.Isbnnumbertitle = undefined;
    acadmicform.isbnsummary = "";
    acadmicform.isbnpublishername = "";
};
const handlepublicationDelete = (index) => {
  const updatedata = [...PublicationData];
  updatedata.splice(index, 1);
  SetPublicationData(updatedata);
};


// addhonors
const addHonours = () => {
    SethonorsData([
      ...honorsData,
      {
        honorname: acadmicform.honorname,
        honorsummery: acadmicform.honorsummery,
        honoreventname: acadmicform.honoreventname,
        honoryear: acadmicform.honoryear
      }
    ]);
    acadmicform.honorname = undefined;
    acadmicform.honorsummery = "";
    acadmicform.honoreventname = "";
    acadmicform.honoryear = "";
};

const DeleteHonorData = (index) => {
  const updatedata = [...honorsData];
  updatedata.splice(index, 1);
  SethonorsData(updatedata);
};

// Orginazation
const addOrganization = () => {
  console.log(organizationData,"organizationData")
     SetorganizationData([
      ...organizationData,
      {
        // Organizationname: acadmicform.Organizationname,
        OrganizationDesignation: acadmicform.OrganizationDesignation,
        Organizationsummary: acadmicform.Organizationsummary,
        OrganizationTenurefrom: acadmicform.OrganizationTenurefrom,
        OrganizationTenureTo: acadmicform.OrganizationTenureTo
      }
    ]);
    acadmicform.Organizationname = undefined;
    acadmicform.OrganizationDesignation = "";
    acadmicform.Organizationsummary = "";
    acadmicform.OrganizationTenurefrom = "";
    acadmicform.OrganizationTenureTo = "";
};

const deleteorganization = (index) => {
  const updatedata = [...organizationData];
  updatedata.splice(index, 1);
  SetorganizationData(updatedata);
};

// 


const handleInputChange = (section, field, value, index = null) => {
    switch (section) {
      case "sccschool":
        setSchoolData({ ...SchoolData, [field]: value });
        break;
      //   case "undergradution":
      //     if (index !== null) {
      //       const updatedYearlyCgpa = [...UndergraduationData.yearlycgpa];
      //       updatedYearlyCgpa[index] = value;
      //       setUndergraduationData({
      //         ...UndergraduationData,
      //         yearlycgpa: updatedYearlyCgpa,
      //       });
      //     } else {
      //       setUndergraduationData({ ...UndergraduationData, [field]: value });
      //     }
      //     break;
      case "postgradution":
        if (index !== null) {
          const updatedYearlyCgpa = [...postgradutionDatra.postyearlycgpa];
          updatedYearlyCgpa[index] = value;
          SetPostGradutionData({
            ...postgradutionDatra,
            postyearlycgpa: updatedYearlyCgpa,
          });
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
            [field]: value,
          };
          SetAcadmicassesmint(updatedAcadmicassesmint);
        }
        break;
      case "presentation":
        if (index !== null) {
          const updatedAcadmicassesmint = [...presentionData];
          updatedAcadmicassesmint[index] = {
            ...updatedAcadmicassesmint[index],
            [field]: value,
          };
          SetpresentionData(updatedAcadmicassesmint);
        }
        break;
      case "publicationitems":
        if (index !== null) {
          const updatedAcadmicassesmint = [...PublicationData];
          updatedAcadmicassesmint[index] = {
            ...updatedAcadmicassesmint[index],
            [field]: value,
          };
          SetPublicationData(updatedAcadmicassesmint);
        }
        break;
      case "honorsachivment":
        if (index !== null) {
          const updatedAcadmicassesmint = [...honorsData];
          updatedAcadmicassesmint[index] = {
            ...updatedAcadmicassesmint[index],
            [field]: value,
          };
          SethonorsData(updatedAcadmicassesmint);
        }
        break;
      case "memberorg":
        if (index !== null) {
          const updatedAcadmicassesmint = [...organizationData];
          updatedAcadmicassesmint[index] = {
            ...updatedAcadmicassesmint[index],
            [field]: value,
          };
          SetorganizationData(updatedAcadmicassesmint);
        }
        break;
      default:
        break;
    }
  };

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
    // console.log("Selected file:", file);
    // console.log("File name:", fileName);
  };

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
    // console.log("Selected file:", file);
    // console.log("File name:", fileName);
  };

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
    // console.log("Selected file:", file);
    // console.log("File name:", fileName);
  };

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
  };

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
  };

  console.log();

  const handlestudentPostProvisnoal = async (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    const fd = new FormData();
    fd.append("student_postprovisinoal", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    SetAddedPublicationImage(data[0].filename);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setstudentpostprovisinoal(reader.result);
      };
      reader.readAsDataURL(file);
    }
    // console.log("Selected file:", file);
    // console.log("File name:", fileName);
  };

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
    // console.log("Selected file:", file);
    // console.log("File name:", fileName);
  };

  const handleSave = async () => {
    UndergraduationData.yearlycgpa = cgpaPercentageList;
    Postgraduation.postyearlycgpa = postcgpaPercentageList;
    const newAcademicDetails = {
      School: SchoolData,
      Undergraduation: UndergraduationData,
      postgradution: postgradutionDatra,
      specialcourse: specialcourse,
      softwareused: softwareused,
      sportsActivity: sports,
      computerlanguage: computerlang,
      Acadmicassesmint: Acadmicassesmint,
      Presentation: presentionData,
      publication: PublicationData,
      studentpublicationimg: addedPublicationImage,
      honour: honorsData,
      organization: organizationData,
    };
    console.log(newAcademicDetails,"newacedmincsldasld;,")
    SetAcademicDetailsData([...AcadmicDetailsData, newAcademicDetails]);

    // Step 2: Update the personal details using the API call
    try {
      const resp = await persnoaldetailsupdate(
        {
          AcademicDetailstatus: "done",
          AcademicDetailform: JSON.stringify([
            ...AcadmicDetailsData,
            newAcademicDetails,
          ]),
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
  };

  const handleClose = async () => {
    setOpen(false);
    window.location.reload();
  };

  return (
    <div>
      {!formstatus && (
        <div>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setEditPage(!editpage)}
          >
            {editpage ? "Cancel" : "Edit"}
          </Button>
        </div>
      )}
      <br />
      <div
        style={{
          border: "2px solid #00000080",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <SimpleCard title="School">
          <Grid></Grid>
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <h4>10th</h4>

              <TextFieldEdit
                name="sscexam"
                disabled={!editpage}
                value={SchoolData?.sscexam || ""}
                onChange={(e) =>
                  handleInputChange("sccschool", "sscexam", e.target.value)
                }
              />

              <TextFieldEdit
                disabled={!editpage}
                type="text"
                label="Board"
                value={SchoolData?.sscborad}
                onChange={(e) =>
                  handleInputChange("sccschool", "sscborad", e.target.value)
                }
              />
              <TextFieldEdit
                disabled={!editpage}
                type="text"
                label="Institute"
                value={SchoolData?.sscinstitute}
                onChange={(e) =>
                  handleInputChange("sccschool", "sscinstitute", e.target.value)
                }
              />
              <TextFieldEdit
                disabled={!editpage}
                type="number"
                label="Aggregate Score"
                name="sscaggregtatescore"
                value={SchoolData?.sscaggregtatescore}
                onChange={(e) =>
                  handleInputChange(
                    "sccschool",
                    "sscaggregtatescore",
                    e.target.value
                  )
                }
              />
              <TextFieldEdit
                disabled={!editpage}
                type="text"
                label="Subject"
                value={SchoolData?.sscsubject}
                onChange={(e) =>
                  handleInputChange("sccschool", "sscsubject", e.target.value)
                }
              />
              <TextFieldEdit
                disabled={!editpage}
                type="date"
                label="Year Of Passing"
                value={SchoolData?.sscyear}
                onChange={(e) =>
                  handleInputChange("sccschool", "sscyear", e.target.value)
                }
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
                  src={`${apiUrl}/api/${SchoolData?.studentsscmarksheet}`}
                  alt="dvd"
                  style={{
                    width: "300px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              )}
              {sscmarksheet && (
                <img
                  src={sscmarksheet}
                  alt="Student"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              )}
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <h4>12th</h4>
              <TextFieldEdit
                disabled={!editpage}
                value={SchoolData?.hscexam}
                onChange={(e) =>
                  handleInputChange("sccschool", "hscexam", e.target.value)
                }
              />
              <TextFieldEdit
                disabled={!editpage}
                type="text"
                label="Board"
                value={SchoolData?.hscborad}
                onChange={(e) =>
                  handleInputChange("sccschool", "hscborad", e.target.value)
                }
              />
              <TextFieldEdit
                disabled={!editpage}
                type="text"
                label="Institute"
                value={SchoolData?.hscinstitute}
                onChange={(e) =>
                  handleInputChange("sccschool", "hscinstitute", e.target.value)
                }
              />
              <TextFieldEdit
                disabled={!editpage}
                type="text"
                label="Aggregate Score"
                value={SchoolData?.hscaggregtatescore}
                onChange={(e) =>
                  handleInputChange(
                    "sccschool",
                    "hscaggregtatescore",
                    e.target.value
                  )
                }
              />
              <TextFieldEdit
                disabled={!editpage}
                type="text"
                label="Subject"
                value={SchoolData?.hscsubject}
                onChange={(e) =>
                  handleInputChange("sccschool", "hscsubject", e.target.value)
                }
              />
              <TextFieldEdit
                disabled={!editpage}
                type="date"
                label="Year Of Passing"
                value={SchoolData?.hscyear}
                onChange={(e) =>
                  handleInputChange("sccschool", "hscyear", e.target.value)
                }
              />

              {editpage ? (
                <TextFieldValidator
                  type="file"
                  name="studentImage"
                  onChange={(e) => handlestudentHhcimg(e)}
                />
              ) : (
                <img
                  src={`${apiUrl}/api/${SchoolData?.studentHhcmarksheet}`}
                  alt="dvd"
                  style={{
                    width: "300px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              )}
              {hscmarksheet && (
                <img
                  src={hscmarksheet}
                  alt="Student"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              )}
            </Grid>
          </Grid>
          {/* 11th 12th */}
        </SimpleCard>
      </div>

      <div
        style={{
          border: "2px solid #00000080",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <div style={{ margin: "20px 0px" }}>
          <SimpleCard title="Under Gradution">
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextFieldEdit
                  disabled={!editpage}
                  type="text"
                  name="instituename"
                  label="Institute Name"
                  value={UndergraduationData?.instituename}
                  onChange={(e) =>
                    handleInputChange(
                      "undergradution",
                      "instituename",
                      e.target.value
                    )
                  }
                />
                <TextFieldEdit
                  disabled={!editpage}
                  type="text"
                  label="Degree"
                  value={UndergraduationData?.degree}
                  onChange={(e) =>
                    handleInputChange(
                      "undergradution",
                      "degree",
                      e.target.value
                    )
                  }
                />
                <TextFieldEdit
                  disabled={!editpage}
                  type="text"
                  label="Branch"
                  value={UndergraduationData?.branch}
                  onChange={(e) =>
                    handleInputChange(
                      "undergradution",
                      "branch",
                      e.target.value
                    )
                  }
                />
                <TextFieldEdit
                  disabled={!editpage}
                  type="text"
                  label="Provisnoal Degree"
                  value={UndergraduationData?.ProvisionalDegree}
                  onChange={(e) =>
                    handleInputChange(
                      "undergradution",
                      "ProvisionalDegree",
                      e.target.value
                    )
                  }
                />
                <TextFieldEdit
                  disabled={!editpage}
                  type="text"
                  label="Back Subject"
                  value={UndergraduationData?.backsubjects}
                  onChange={(e) =>
                    handleInputChange(
                      "undergradution",
                      "backsubjects",
                      e.target.value
                    )
                  }
                />
                <TextFieldEdit
                  disabled={!editpage}
                  type="text"
                  label="Number of Back"
                  value={UndergraduationData?.numberofback}
                  onChange={(e) =>
                    handleInputChange(
                      "undergradution",
                      "numberofback",
                      e.target.value
                    )
                  }
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
                    src={`${apiUrl}/api/${UndergraduationData?.studentundermarksheet}`}
                    alt="dvd"
                    style={{
                      width: "300px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                )}
                {undergradutionmarksheet && (
                  <img
                    src={undergradutionmarksheet}
                    alt="Student"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                )}
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextFieldEdit
                  disabled={!editpage}
                  type="text"
                  label="Cgpa Out Of"
                  value={UndergraduationData?.cgpaPercentageoutof}
                  onChange={(e) =>
                    handleInputChange(
                      "undergradution",
                      "cgpaPercentageoutof",
                      e.target.value
                    )
                  }
                />
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  
                  {cgpaPercentageList.map((cgpa, index) => (
                    
                    <Grid
                      item
                      xs={12}
                      key={index}
                      style={{ display: "flex", alignItems: "center" }}
                    > 
                      <TextFieldEdit
                        disabled={!editpage}
                        type="text"
                        label={`${index + 1}year CGPA/Percentage`}
                        value={cgpa}
                        onChange={(e) =>
                          //   handleInputChange(
                          //     "undergradution",
                          //     "cgpaPercentage",
                          //     e.target.value,
                          //     index
                          //   )
                          updatePercentageList(e.target.value, index)
                        }
                      />
                      {index !== cgpaPercentageList.length - 1 && (
                        <DeleteIcon
                          disabled={!editpage}
                          style={{ marginLeft: "10px" }}
                          onClick={() => {
                            handleunderPercentage(index);
                          }}
                        />
                      )}
                    </Grid>
                  ))}
                </Grid>
                <Button
                  disabled={!editpage}
                  onClick={handleaddgradution}
                  color="primary"
                  variant="contained"
                >
                  <Icon>add</Icon>
                  <Span sx={{ pl: 1, textTransform: "capitalize" }}>
                    Add More
                  </Span>
                </Button>
                {/* {UndergraduationData.yearlycgpa?.map((item, key) => {
                                return <TextFieldEdit disabled={!editpage} value={item} label={${key + 1} year %}
                                    onChange={(e) => handleInputChange("undergradution", "yearlycgpa", e.target.value, key)}
                                />;
                            })} */}
                <br /> <br />
                <TextFieldEdit
                  disabled={!editpage}
                  type="date"
                  label="year of Inception"
                  value={UndergraduationData?.yearofInception}
                  onChange={(e) =>
                    handleInputChange(
                      "undergradution",
                      "yearofInception",
                      e.target.value
                    )
                  }
                />
                <TextFieldEdit
                  disabled={!editpage}
                  type="date"
                  label="year of Inception"
                  value={UndergraduationData?.yearofpassing}
                  onChange={(e) =>
                    handleInputChange(
                      "undergradution",
                      "yearofpassing",
                      e.target.value
                    )
                  }
                />
                {UndergraduationData?.underprovisinoaldegree && (
                  <div>
                    <p>Provisional Degree</p>

                    {editpage ? (
                      <TextFieldValidator
                        type="file"
                        name="studentImage"
                        onChange={(e) => handlestudentunderprovisinoldegree(e)}
                      />
                    ) : (
                      <img
                        src={`${apiUrl}/api/${UndergraduationData?.underprovisinoaldegree}`}
                        alt="dvd"
                        style={{
                          width: "300px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                    {uploadedprovisinoal && (
                      <img
                        src={uploadedprovisinoal}
                        alt="Student"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    )}
                  </div>
                )}
              </Grid>
            </Grid>
          </SimpleCard>
        </div>
      </div>

      <div
        style={{
          border: "2px solid #00000080",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <div style={{ margin: "20px 0px" }}>
          <SimpleCard title="Post Gradution">
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextFieldEdit
                  disabled={!editpage}
                  type="text"
                  label="Institute Name"
                  value={postgradutionDatra?.postinstituename}
                  onChange={(e) =>
                    handleInputChange(
                      "postgradution",
                      "postinstituename",
                      e.target.value
                    )
                  }
                />
                <TextFieldEdit
                  disabled={!editpage}
                  type="text"
                  label="Degree"
                  value={postgradutionDatra?.postdegree}
                  onChange={(e) =>
                    handleInputChange(
                      "postgradution",
                      "postdegree",
                      e.target.value
                    )
                  }
                />
                <TextFieldEdit
                  disabled={!editpage}
                  type="text"
                  label="Branch"
                  value={postgradutionDatra?.postbranch}
                  onChange={(e) =>
                    handleInputChange(
                      "postgradution",
                      "postbranch",
                      e.target.value
                    )
                  }
                />
                <TextFieldEdit
                  disabled={!editpage}
                  type="text"
                  label="Provisnoal Degree"
                  value={postgradutionDatra?.postProvisionalDegree}
                  onChange={(e) =>
                    handleInputChange(
                      "postgradution",
                      "postProvisionalDegree",
                      e.target.value
                    )
                  }
                />
                <TextFieldEdit
                  disabled={!editpage}
                  type="text"
                  label="Back Subject"
                  value={postgradutionDatra?.postbacksubjects}
                  onChange={(e) =>
                    handleInputChange(
                      "postgradution",
                      "postbacksubjects",
                      e.target.value
                    )
                  }
                />
                <TextFieldEdit
                  disabled={!editpage}
                  type="text"
                  label="Number of Back"
                  value={postgradutionDatra?.postnumberofback}
                  onChange={(e) =>
                    handleInputChange(
                      "postgradution",
                      "postnumberofback",
                      e.target.value
                    )
                  }
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
                    style={{
                      width: "300px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                )}
                {postgradutionmarksheet && (
                  <img
                    src={postgradutionmarksheet}
                    alt="Student"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                )}
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextFieldEdit
                  disabled={!editpage}
                  type="text"
                  label="Cgpa Out Of"
                  value={postgradutionDatra?.postcgpaPercentageoutof}
                  onChange={(e) =>
                    handleInputChange(
                      "postgradution",
                      "postcgpaPercentageoutof",
                      e.target.value
                    )
                  }
                />

                 {postcgpaPercentageList.map((cgpa, index) => {
                  return (
                    <Grid item xs={12} key={index} style={{ display: "flex", alignItems: "center" }}>
                <TextFieldEdit
                  disabled={!editpage}
                  type="text"
                  label={`${index + 1}year CGPA/Percentage`}
                  value={cgpa}
                  onChange={(e) => handlepostChange(e.target.value, index)}
                />
                 {index !== postcgpaPercentageList.length - 1 && (
                    <DeleteIcon
                      disabled={!editpage}
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        handlepostPercentage(index);
                      }}
                    />
                  )}
                </Grid>
              );
            })}
           
                 <Button onClick={handlepostaddgradution}  disabled={!editpage} color="primary" variant="contained">
              <Icon>add</Icon>
              <Span  sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
            </Button>
            <br /> <br />
                {/* {postgradutionDatra.postyearlycgpa?.map((item, key) => {
                                return <TextFieldEdit disabled={!editpage} value={item} label={${key + 1} year %}

                                    onChange={(e) => handleInputChange("postgradution", "cgpaPercentage", e.target.value, key)}
                                />;
                            })} */}
                <TextFieldEdit
                  disabled={!editpage}
                  type="date"
                  label="year of Inception"
                  value={postgradutionDatra?.postyearofInception}
                  onChange={(e) =>
                    handleInputChange(
                      "postgradution",
                      "postyearofInception",
                      e.target.value
                    )
                  }
                />
                <TextFieldEdit
                  disabled={!editpage}
                  type="date"
                  label="year of Inception"
                  value={postgradutionDatra?.postyearofpassing}
                  onChange={(e) =>
                    handleInputChange(
                      "postgradution",
                      "postyearofpassing",
                      e.target.value
                    )
                  }
                />

                {postgradutionDatra?.studentpostprovisinoal && (
                  <div>
                    {" "}
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
                        style={{
                          width: "300px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                    {postgradutionprovisinoal && (
                      <img
                        src={postgradutionprovisinoal}
                        alt="Student"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    )}
                  </div>
                )}
              </Grid>
            </Grid>
          </SimpleCard>
        </div>
      </div>

      <div
        style={{
          border: "2px solid #00000080",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <div style={{ margin: "20px 0px" }}>
          <SimpleCard title="special Course">
          {/* {addspecializedcourses !== "" && */}
            <Button onClick={handleaddspecializedcourses} disabled={!editpage} style={{ marginLeft: "20px" }} color="primary" variant="contained">
              <Icon>add</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
            </Button>
        
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                {specialcourse?.map((item, key) => {
                  return (
                    <>
                    <TextFieldEdit
                      disabled={!editpage}
                      value={item}
                    //   label={`specialized courses name${key + 1}`}
                      onChange={(e) =>
                        handleSplCrsChange(
                          e.target.value,
                          key
                        )
                    }
                    />
                    {key !== specialcourse.length - 1 && (
                    <DeleteIcon style={{cursor: 'pointer',position: 'absolute',zIndex: '100px'}} disabled={!editpage} onClick={() => {handlespecialcoursedelte(key)}} />
                )}
                    </>
                );
            })}
              </Grid>
            </Grid>
          </SimpleCard>
        </div>
      </div>


      <div
        style={{
          border: "2px solid #00000080",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <div style={{ margin: "20px 0px" }}>
          <SimpleCard title="SoftWare Used">
          <Button onClick={handleadSoftwareUse} disabled={!editpage} style={{ marginLeft: "20px" }} color="primary" variant="contained">
              <Icon>add</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
            </Button>
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                {softwareused?.map((item, key) => {
                  return (
                    <>
                    <TextFieldEdit
                      disabled={!editpage}
                      value={item}
                      onChange={(e) =>
                        handlesftchange(
                          e.target.value,
                          key
                        )
                      }
                    />
                    {key !== softwareused.length - 1 && (
                      <DeleteIcon style={{cursor: 'pointer',position: 'absolute',zIndex: '100px'}} disabled={!editpage} onClick={() => {handleSoftwareUsedelte(key)}} />
                  )}
                  </>
                  );
                })}
              </Grid>
            </Grid>
          </SimpleCard>
        </div>
      </div>

      <div
        style={{
          border: "2px solid #00000080",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <div style={{ margin: "20px 0px" }}>
          <SimpleCard title="Sports Activity">
          <Button onClick={handleadSportActivity} disabled={!editpage} style={{ marginLeft: "20px" }} color="primary" variant="contained">
              <Icon>add</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
            </Button>

            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                {sports.map((item, key) => {
                  return (
                    <>
                    <TextFieldEdit
                      disabled={!editpage}
                      value={item}
                      onChange={(e) =>
                        handlesportschange(
                          e.target.value,
                          key
                        )
                      }
                    />
                    {key !== sports.length - 1 && (
                      <DeleteIcon style={{cursor: 'pointer',position: 'absolute',zIndex: '100px'}} disabled={!editpage} onClick={() => {handlesportsdelete(key)}} />
                  )}
                  </>
                  );
                })}
              </Grid>
            </Grid>
          </SimpleCard>
        </div>
      </div>


      <div
        style={{
          border: "2px solid #00000080",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <div style={{ margin: "20px 0px" }}>
          <SimpleCard title="Computer Langauge Known">
          <Button onClick={handledComputerLang} disabled={!editpage} style={{ marginLeft: "20px" }} color="primary" variant="contained">
              <Icon>add</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
            </Button>
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                {computerlang?.map((item, key) => {
                  return (
                    <>
                    <TextFieldEdit
                      disabled={!editpage}
                      value={item}
                      onChange={(e) =>
                        handleComputerLangchange(
                          e.target.value,
                          key
                        )
                      }
                    />
                    {key !== computerlang.length - 1 && (
                      <DeleteIcon style={{cursor: 'pointer',position: 'absolute',zIndex: '100px'}} disabled={!editpage} onClick={() => {handleComputerdelete(key)}} />
                  )}
                  </>
                  );
                })}
              </Grid>
            </Grid>
          </SimpleCard>
        </div>
      </div>

      <div
        style={{
          border: "2px solid #00000080",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <div style={{ margin: "20px 0px" }}>
          <SimpleCard title="Acadmic Assesmint">
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* {selectedAcademicproject && */}
              <Button onClick={handleaddAcademicAssignment} disabled={!editpage} style={{ marginLeft: "20px" }} color="primary" variant="contained">
                <Icon>add</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
              </Button>

          </div>
            {Acadmicassesmint?.map((item, key) => {
              return (
                <div key={key} style={{ padding: "0px 15px", borderBottom: "1px solid" }}>
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
                   {key !== Acadmicassesmint.length - 1 && (
                  <DeleteIcon
                    onClick={() => {
                      HandleAcademicAssDelete(key);
                    }}
                  />
                   )}
                </div>
                <Grid container spacing={6}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextFieldEdit
                      disabled={!editpage}
                      label="Academic project"
                      value={item.selectedAcademicproject }
                      onChange={(e) =>
                        handleInputChange(
                          "assesment",
                          "selectedAcademicproject",
                          e.target.value,
                          key
                        )
                      }
                    />
                    <TextFieldEdit
                      disabled={!editpage}
                      label="Project title"
                      value={item.academicprojecttitle}
                      onChange={(e) =>
                        handleInputChange(
                          "assesment",
                          "academicprojecttitle",
                          e.target.value,
                          key
                        )
                      }
                    />
                    <TextFieldEdit
                      disabled={!editpage}
                      label="Profesor Designation"
                      value={item.profesorDesignation}
                      onChange={(e) =>
                        handleInputChange(
                          "assesment",
                          "profesorDesignation",
                          e.target.value,
                          key
                        )
                      }
                    />
                    <TextFieldEdit
                      disabled={!editpage}
                      label="Profesor Department"
                      value={item.profesordepartment}
                      onChange={(e) =>
                        handleInputChange(
                          "assesment",
                          "profesordepartment",
                          e.target.value,
                          key
                        )
                      }
                    />
                    <TextFieldEdit
                      disabled={!editpage}
                      label="Project Summary"
                      value={item.projectsummary}
                      onChange={(e) =>
                        handleInputChange(
                          "assesment",
                          "projectsummary",
                          e.target.value,
                          key
                        )
                      }
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextFieldEdit
                      disabled={!editpage}
                      label="Student Designation"
                      value={item.studentDesignation}
                      onChange={(e) =>
                        handleInputChange(
                          "assesment",
                          "studentDesignation",
                          e.target.value,
                          key
                        )
                      }
                    />
                    <TextFieldEdit
                      disabled={!editpage}
                      label="Techinacal Roleand Support"
                      value={item.techinacalroleandsupport}
                      onChange={(e) =>
                        handleInputChange(
                          "assesment",
                          "techinacalroleandsupport",
                          e.target.value,
                          key
                        )
                      }
                    />
                    <TextFieldEdit
                      type="date"
                      disabled={!editpage}
                      label="Acadmic Project Date To"
                      value={item.acadmicdatepicto}
                      onChange={(e) =>
                        handleInputChange(
                          "assesment",
                          "acadmicdatepicto",
                          e.target.value,
                          key
                        )
                      }
                    />
                    <TextFieldEdit
                      type="date"
                      disabled={!editpage}
                      label="Acadmic Project Date From"
                      value={item.acadmicdatepicfrom}
                      onChange={(e) =>
                        handleInputChange(
                          "assesment",
                          "acadmicdatepicfrom",
                          e.target.value,
                          key
                        )
                      }
                    />
                  </Grid>
                </Grid>
            </div>
              );
            })}
          </SimpleCard>
        </div>
      </div>

      <div
        style={{
          border: "2px solid #00000080",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <div style={{ margin: "20px 0px" }}>
          <SimpleCard title="Presentation">
          <div style={{ display: "flex", alignItems: "center" }}>
          {/* {Presentationtitle !== "" && */}
            <Button onClick={handleaddPresentation} disabled={!editpage} style={{ marginLeft: "20px" }} color="primary" variant="contained">
              <Icon>add</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
            </Button>
        </div>

            {presentionData?.map((item, key) => {
              return (
                <>
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
                 {key !== presentionData.length - 1 && (
                <DeleteIcon
                  onClick={() => {
                    HandlepresentationDataDelete(key);
                  }}
                  />
                )}
              </div>
                <Grid container spacing={6}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextFieldEdit
                      disabled={!editpage}
                      type="text"
                      name="Presentationtitle"
                      label="Title"
                      value={item.Presentationtitle || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "presentation",
                          "Presentationtitle",
                          e.target.value,
                          key
                        )
                      }
                    />
                    <TextFieldEdit
                      type="text"
                      disabled={!editpage}
                      name="Presentationsummary"
                      label="Summary"
                      value={item.Presentationsummary || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "presentation",
                          "Presentationsummary",
                          e.target.value,
                          key
                        )
                      }
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextFieldEdit
                      type="text"
                      disabled={!editpage}
                      name="Competition"
                      label="Competition"
                      value={item.Competition}
                      onChange={(e) =>
                        handleInputChange(
                          "presentation",
                          "Competition",
                          e.target.value,
                          key
                        )
                      }
                    />
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
                  <DeleteIcon
                    onClick={() => {
                      handlepublicationDelete(key);
                    }}
                  />
                </div>
                  </Grid>
                </Grid>
              </>
              );
            })}
          </SimpleCard>
        </div>
      </div>

      <div
        style={{
          border: "2px solid #00000080",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <div style={{ margin: "20px 0px" }}>
          <SimpleCard title="Journals/Publication">
          <div style={{ display: "flex", alignItems: "center" }}>
              <Button color="primary" variant="contained" style={{ marginLeft: "20px" }} disabled = {!editpage} onClick={addGeneralpublication}>
                <Icon>add</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
              </Button>
          </div>
          <br /> <br />
            {editpage ? (
              <TextFieldValidator
                type="file"
                onChange={(e) => handlestudentPublicationimage(e)}
              />
            ) : (
              <img
                src={`${apiUrl}/api/${publicationImg}`}
                alt="dvd"
                style={{ width: "300px", height: "100px", objectFit: "cover" }}
              />
            )}
            {publicationImage && (
              <img
                src={publicationImage}
                alt="Student"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
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
                      onChange={(e) =>
                        handleInputChange(
                          "publicationitems",
                          "Isbnnumbertitle",
                          e.target.value,
                          key
                        )
                      }
                    />
                    <TextFieldEdit
                      type="text"
                      disabled={!editpage}
                      name="Presentationsummary"
                      label="Summary"
                      value={item.isbnsummary || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "publicationitems",
                          "isbnsummary",
                          e.target.value,
                          key
                        )
                      }
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextFieldEdit
                      type="text"
                      disabled={!editpage}
                      name="Competition"
                      label="Publisher Name"
                      value={item.isbnpublishername}
                      onChange={(e) =>
                        handleInputChange(
                          "publicationitems",
                          "isbnpublishername",
                          e.target.value,
                          key
                        )
                      }
                    />
                  </Grid>
                </Grid>
              );
            })}
          </SimpleCard>
        </div>
      </div>

      <div
        style={{
          border: "2px solid #00000080",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <SimpleCard title="Honours And Achievements">
        <div style={{ display: "flex", alignItems: "center" }}>
         
            <Button color="primary" variant="contained" style={{ marginLeft: "20px" }} disabled={!editpage} onClick={addHonours}>
              <Icon>add</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
            </Button>
        </div>

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
                    onChange={(e) =>
                      handleInputChange(
                        "honorsachivment",
                        "honorname",
                        e.target.value,
                        key
                      )
                    }
                  />
                  <TextFieldEdit
                    disabled={!editpage}
                    type="text"
                    name="honorsummery"
                    label="Sumary"
                    value={item.honorsummery || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "honorsachivment",
                        "honorsummery",
                        e.target.value,
                        key
                      )
                    }
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextFieldEdit
                    disabled={!editpage}
                    type="text"
                    name="honoreventname"
                    label="Event Name "
                    value={item.honoreventname || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "honorsachivment",
                        "honoreventname",
                        e.target.value,
                        key
                      )
                    }
                  />
                  <TextFieldEdit
                    type="date"
                    disabled={!editpage}
                    name="honoreventname"
                    label="Year"
                    value={item.honoryear || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "honorsachivment",
                        "honoryear",
                        e.target.value,
                        key
                      )
                    }
                  />
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
                {key !== honorsData.length - 1 && (
                <DeleteIcon
                  onClick={() => {
                    DeleteHonorData(key);
                  }}
                  />
                )}
              </div>
                </Grid>
              </Grid>
            );
          })}
        </SimpleCard>
      </div>

      <div
        style={{
          border: "2px solid #00000080",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <div style={{ margin: "20px 0px" }}>
          <SimpleCard title="Member Of Organization">
          <div style={{ display: "flex", alignItems: "center" }}>
              <Button color="primary" variant="contained" style={{ marginLeft: "20px" }} disabled={!editpage} onClick={addOrganization}>
                <Icon>add</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
              </Button>
          </div>

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
                      onChange={(e) =>
                        handleInputChange(
                          "memberorg",
                          "Organizationname",
                          e.target.value,
                          key
                        )
                      }
                    />
                    <TextFieldEdit
                      type="text"
                      disabled={!editpage}
                      name="OrganizationDesignation"
                      label="Designation"
                      value={item.OrganizationDesignation || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "memberorg",
                          "OrganizationDesignation",
                          e.target.value,
                          key
                        )
                      }
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextFieldEdit
                      type="text"
                      disabled={!editpage}
                      name="Organizationsummary"
                      label="Work Summary "
                      value={item.Organizationsummary || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "memberorg",
                          "Organizationsummary",
                          e.target.value,
                          key
                        )
                      }
                    />
                    <TextFieldEdit
                      type="date"
                      disabled={!editpage}
                      name="Organizationsummary"
                      label="Tenure To"
                      value={item.OrganizationTenureTo || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "memberorg",
                          "OrganizationTenureTo",
                          e.target.value,
                          key
                        )
                      }
                    />
                    <TextFieldEdit
                      type="date"
                      disabled={!editpage}
                      name="Organizationsummary"
                      label="Tenure From"
                      value={item.OrganizationTenurefrom || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "memberorg",
                          "OrganizationTenurefrom",
                          e.target.value,
                          key
                        )
                      }
                    />
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
                   {key !== honorsData.length - 1 && (
                  <DeleteIcon
                    onClick={() => {
                      deleteorganization(key);
                    }}
                  />
                   )}
                </div>
                  </Grid>
                </Grid>
              );
            })}
          </SimpleCard>
        </div>
      </div>
      {editpage && (
        <Button color="secondary" variant="contained" onClick={handleSave}>
          Save
        </Button>
      )}
      {/* <Dialog
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
            </Dialog> */}

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
    </div>
  );
}

export default Acadmeicfromedit;