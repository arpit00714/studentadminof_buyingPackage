// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/lab/DesktopDatePicker";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "moment/locale/de";
import { Autocomplete, Button, Grid, Icon, styled, RadioGroup, FormControlLabel, FormLabel, Radio } from "@mui/material";
import { H3, H4, Span } from "app/components/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { SimpleCard } from "app/components";
import { useState } from "react";
import NavigateNextSharpIcon from "@mui/icons-material/NavigateNextSharp";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Fragment } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { persnoaldetails, persnoaldetailsupdate } from "Apis/Persnoldetailsform";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Popup from "./Popup";
import { filesupload } from "Apis/filesupload";
const AutoComplete = styled(Autocomplete)(() => ({ width: 300, marginBottom: "16px" }));
const suggestio = [
  {
    label: "Academic project"
  },
  {
    label: "Major Project"
  },
  {
    label: "Minor project"
  },
  {
    label: "Industrial project"
  },
  {
    label: "Internship"
  },
  {
    label: "Industrial visit"
  },
  {
    label: "Onsite training"
  },
  {
    label: "Work experience"
  }
];
const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px"
}));

const datePickerStyles = {
  width: "100%", // Adjust width as needed// Center the date picker
  marginBottom: "16px" // Add some top margin
};
function AcademicForm() {
  const navigation = useNavigate();
  const [acadmicform, setAcadmicForm] = useState("");
  const [havesiblng, setHavesiblings] = useState("");
  const [boolpostdegree, setboolpostprovisnoal] = useState("");
  const [commentbox, setCommentBox] = useState(false)
  const [sscmarksheet, setSscmarksheet] = useState("");
  const [hscmarksheet, setHscmarksheet] = useState("");
  const [uploadedsememarksheet, setuploadedsememarksheet] = useState("");
  const [uploadedsemePostmarksheet, setuploadedsemePostmarksheet] = useState("");
  const [Journalscertificate, setJournalscertificate] = useState("");
  const [uploadedprovisinoal, setuploadedprovisinoal] = useState("");
  const [uploadedpostprovisinoal, setuploadedpostprovisinoal] = useState("");
  const [addspecializedcourses, setSpecializedcourses] = useState("");
  const [selectedAcademicproject, setSelectedAcademicproject] = useState("");
  const [cgpaPercentageList, setCgpaPercentageList] = useState([""]);
  const [postcgpaPercentageList, setPostCgpaPercentageList] = useState([""]);
  const [newaddspecializedcourses, setNewaddspecializedcourses] = useState([]);
  const [newsoftwarestatus, setNewsoftwarestatus] = useState([]);
  const [newcomputrlanguageknown, setNewcomputrlanguageknown] = useState([]);
  const [acadmicdatepicto, setAcadmicDatepicto] = useState("");
  const [acadmicdatepicfrom, setAcadmicDatepicfrom] = useState("");
  const [newsportsActivity, setNewsportsActivity] = useState([]);
  const [presentationData, SetPresentationData] = useState([]);
  const [academicprojectdata, setAcadmicprojectData] = useState([]);
  const [generalpublicationData, SetGeneralPublicationData] = useState([]);
  const [honourData, setHonourData] = useState([]);
  const [addsportsactivity, setaddSportsactivity] = useState("");
  const [OrganizationData, setOrganizationData] = useState([]);
  const [spcoursebtn, setspcoursebtn] = useState(true);
  const [AcadmicDetailsData, SetAcademicDetailsData] = useState([]);
  const userID = localStorage.getItem("userID");
  const [addcomputerlangauge, setComputerlangauge] = useState("");
  const [addsoftwareused, setSoftwareused] = useState("");
  console.log("userID", userID);
  const [open, setOpen] = useState(false);
  const addHonours = () => {
    setDoneHonoursBtn(true);
    if (acadmicform.honorname !== undefined) {
      console.log("honorname", honorname);
      console.log("rfdsxz");

      setHonourData([
        ...honourData,
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
    }
  };

  const [DoneHonoursBtn, setDoneHonoursBtn] = useState(true);

  const DoneHonours = () => {
    if (acadmicform.honorname !== undefined) {
      console.log("acadmicform.honorname", acadmicform.honorname);
      console.log("Rfds");
      setDoneHonoursBtn(false);
      setHonourData([
        ...honourData,
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
    }
  };

  const addOrganization = () => {
    setOrganizationBtn(true);
    if (acadmicform.Organizationname !== undefined) {
      setOrganizationData([
        ...OrganizationData,
        {
          Organizationname,
          OrganizationDesignation,
          Organizationsummary,
          OrganizationTenurefrom: acadmicform.OrganizationTenurefrom,
          OrganizationTenureTo: acadmicform.OrganizationTenureTo
        }
      ]);
      acadmicform.Organizationname = undefined;
      acadmicform.OrganizationDesignation = "";
      acadmicform.Organizationsummary = "";
      acadmicform.OrganizationTenurefrom = "";
      acadmicform.OrganizationTenureTo = "";
    }
  };

  const [Organizationbtn, setOrganizationBtn] = useState(true);
  const DoneOrganization = () => {
    if (acadmicform.Organizationname !== undefined) {
      setOrganizationBtn(false);
      setOrganizationData([
        ...OrganizationData,
        {
          Organizationname,
          OrganizationDesignation,
          Organizationsummary,
          OrganizationTenurefrom: acadmicform.OrganizationTenurefrom,
          OrganizationTenureTo: acadmicform.OrganizationTenureTo
        }
      ]);
      acadmicform.Organizationname = undefined;
      acadmicform.OrganizationDesignation = "";
      acadmicform.Organizationsummary = "";
      acadmicform.OrganizationTenurefrom = "";
      acadmicform.OrganizationTenureTo = "";
    }
  };
  const deleteorganization = (index) => {
    const updatedata = [...OrganizationData];
    updatedata.splice(index, 1);
    setOrganizationData(updatedata);
  };
  const DeleteHonorData = (index) => {
    const updatedata = [...honourData];
    updatedata.splice(index, 1);
    setHonourData(updatedata);
  };

  const handleaddgradution = () => {
    setCgpaPercentageList([...cgpaPercentageList, ""]);
  };

  const handleaddPresentation = () => {
    console.log("acadmicform.Presentationtitle", acadmicform.Presentationtitle);
    setPresentationBtn(true);
    if (acadmicform.Presentationtitle !== undefined) {
      console.log("Redszx");

      SetPresentationData([
        ...presentationData,
        {
          Presentationtitle: acadmicform.Presentationtitle,
          Presentationsummary: acadmicform.Presentationsummary,
          Competition: acadmicform.Competition
        }
      ]);
      acadmicform.Presentationtitle = "";
      acadmicform.Presentationsummary = "";
      acadmicform.Competition = "";
    }
  };

  const [PresentationBtn, setPresentationBtn] = useState(true);
  const handleDonePresentation = () => {
    if (acadmicform.Presentationtitle !== undefined) {
      setPresentationBtn(false);
      SetPresentationData([
        ...presentationData,
        {
          Presentationtitle: acadmicform.Presentationtitle,
          Presentationsummary: acadmicform.Presentationsummary,
          Competition: acadmicform.Competition
        }
      ]);
      acadmicform.Presentationtitle = "";
      acadmicform.Presentationsummary = "";
      acadmicform.Competition = "";
    }
  };

  const addGeneralpublication = () => {
    setGeneralBtn(true);
    if (acadmicform.Isbnnumbertitle !== undefined) {
      SetGeneralPublicationData([
        ...generalpublicationData,
        {
          Isbnnumbertitle: acadmicform.Isbnnumbertitle,
          isbnsummary: acadmicform.isbnsummary,
          isbnpublishername: acadmicform.isbnpublishername
        }
      ]);

      acadmicform.Isbnnumbertitle = undefined;
      acadmicform.isbnsummary = "";
      acadmicform.isbnpublishername = "";
    }
  };
  const [generalbtn, setGeneralBtn] = useState(true);
  const DoneGeneralpublication = () => {
    if (acadmicform.Isbnnumbertitle !== undefined) {
      setGeneralBtn(false);
      SetGeneralPublicationData([
        ...generalpublicationData,
        {
          Isbnnumbertitle: acadmicform.Isbnnumbertitle,
          isbnsummary: acadmicform.isbnsummary,
          isbnpublishername: acadmicform.isbnpublishername
        }
      ]);

      acadmicform.Isbnnumbertitle = undefined;
      acadmicform.isbnsummary = "";
      acadmicform.isbnpublishername = "";
    }
  };

  const handlepublicationDelete = (index) => {
    const updatedata = [...generalpublicationData];
    updatedata.splice(index, 1);
    SetGeneralPublicationData(updatedata);
  };

  const HandlepresentationDataDelete = (index) => {
    const updatepresentationData = [...presentationData];
    updatepresentationData.splice(index, 1);
    SetPresentationData(updatepresentationData);
  };
  const handlepostaddgradution = () => {
    setPostCgpaPercentageList([...postcgpaPercentageList, ""]);
  };

  const handleaddspecializedcourses = () => {
    setspcoursebtn(true);
    if (addspecializedcourses !== "") {
      setNewaddspecializedcourses([...newaddspecializedcourses, addspecializedcourses]);
      setSpecializedcourses("");
    }
  };

  const handleDonespecializedcourses = () => {
    if (addspecializedcourses !== "") {
      setspcoursebtn(false);
      setNewaddspecializedcourses([...newaddspecializedcourses, addspecializedcourses]);
      setSpecializedcourses("");
    }
  };

  const handlespecialcoursedelte = (index) => {
    const updatedList = [...newaddspecializedcourses];
    updatedList.splice(index, 1);
    setNewaddspecializedcourses(updatedList);
  };

  const [softwarebtn, setsoftwarebtn] = useState(true);
  const handlesoftwareused = () => {
    setsoftwarebtn(true);
    if (addsoftwareused !== "") {
      setNewsoftwarestatus([...newsoftwarestatus, addsoftwareused]);
      setSoftwareused("");
    }
  };
  const handledonesoftwareused = () => {
    if (addsoftwareused !== "") {
      setsoftwarebtn(false);
      setNewsoftwarestatus([...newsoftwarestatus, addsoftwareused]);
      setSoftwareused("");
    }
  };

  const handlesoftwareuseddelte = (index) => {
    const updatedList = [...newsoftwarestatus];
    updatedList.splice(index, 1);
    setNewsoftwarestatus(updatedList);
  };
  const [computerbtn, setcomputerbtn] = useState(true);

  const handlecomputerlanguageknown = () => {
    setcomputerbtn(true);
    if (addcomputerlangauge !== "") {
      setNewcomputrlanguageknown([...newcomputrlanguageknown, addcomputerlangauge]);
      setComputerlangauge("");
    }
  };

  const handledonecomputerlanguageknown = () => {
    if (addcomputerlangauge !== "") {
      setcomputerbtn(false);
      setNewcomputrlanguageknown([...newcomputrlanguageknown, addcomputerlangauge]);
      setComputerlangauge("");
    }
  };

  const handlecomputerlanguagedelte = (index) => {
    const updatelist = [...newcomputrlanguageknown];
    updatelist.splice(index, 1);
    setNewcomputrlanguageknown(updatelist);
  };

  const [sportsbtn, setsportsbtn] = useState(true);

  const handlesportsactivity = () => {
    setsportsbtn(true);
    if (addsportsactivity !== "") {
      setNewsportsActivity([...newsportsActivity, addsportsactivity]);
      setaddSportsactivity("");
    }
  };

  const handledonesportsactivity = () => {
    if (addsportsactivity !== "") {
      setsportsbtn(false);
      setNewsportsActivity([...newsportsActivity, addsportsactivity]);
      setaddSportsactivity("");
    }
  };
  const handlesportsDelete = (index) => {
    const updatedList = [...newsportsActivity];
    updatedList.splice(index, 1);
    setNewsportsActivity(updatedList);
  };

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
    setAcademicproBtn(true);
    if (
      selectedAcademicproject === "" ||
      acadmicdatepicto === "" ||
      acadmicdatepicfrom === "" ||
      acadmicform.techinacalroleandsupport === "" ||
      acadmicform.studentDesignation === "" ||
      acadmicform.academicprojecttitle === "" ||
      acadmicform.profesorDesignation === "" ||
      acadmicform.profesordepartment === "" ||
      acadmicform.projectsummary === ""
    ) {
    } else {
      const updatedata = [...academicprojectdata, data];
      setAcadmicprojectData(updatedata);
      acadmicform.techinacalroleandsupport = "";
      acadmicform.studentDesignation = "";
      acadmicform.academicprojecttitle = "";
      acadmicform.profesorDesignation = "";
      acadmicform.profesordepartment = "";
      acadmicform.projectsummary = "";
      setAcadmicDatepicto("");
      setAcadmicDatepicfrom("");
      setSelectedAcademicproject("");
    }
  };

  const [academicproBtn, setAcademicproBtn] = useState(true);
  const handleDoneAcademicAssignment = () => {
    if (
      selectedAcademicproject === "" ||
      acadmicdatepicto === "" ||
      acadmicdatepicfrom === "" ||
      acadmicform.techinacalroleandsupport === "" ||
      acadmicform.studentDesignation === "" ||
      acadmicform.academicprojecttitle === "" ||
      acadmicform.profesorDesignation === "" ||
      acadmicform.profesordepartment === "" ||
      acadmicform.projectsummary === ""
    ) {
    } else {
      setAcademicproBtn(false);
      const updatedata = [...academicprojectdata, data];
      setAcadmicprojectData(updatedata);
      acadmicform.techinacalroleandsupport = "";
      acadmicform.studentDesignation = "";
      acadmicform.academicprojecttitle = "";
      acadmicform.profesorDesignation = "";
      acadmicform.profesordepartment = "";
      acadmicform.projectsummary = "";
      setAcadmicDatepicto("");
      setAcadmicDatepicfrom("");
      setSelectedAcademicproject("");
    }
  };

  const HandleAcademicAssDelete = (index) => {
    const updateAcademic = [...academicprojectdata];
    updateAcademic.splice(index, 1);
    setAcadmicprojectData(updateAcademic);
  };

  const {
    sscexam,
    sscborad,
    sscinstitute,
    sscaggregtatescore,
    sscsubject,
    sscyear,
    studentsscmarksheet,
    sscmarksheet1,
    studentHhcmarksheet,
    underprovisinoaldegree1,
    studentpublicationimg1,
    studentundermarksheet1,
    hscmarksheet1,
    hscexam,
    hscborad,
    hscinstitute,
    hscaggregtatescore,
    hscsubject,
    hscyear,
    instituename,
    studentpostprovisinoal1,
    studentpostmarksheet1,
    degree,
    branch,
    yearofInception,
    yearofpassing,
    cgpaPercentage,
    cgpaPercentageoutof,
    ProvisionalDegree,
    studentpostprovisinoal,
    studentundermarksheet,
    numberofback,
    backsubjects,
    postcgpaPercentage,
    postcgpaPercentageoutof,
    postinstituename,
    postdegree,
    postbranch,
    postyearofInception,
    postyearofpassing,
    postProvisionalDegree,
    postnumberofback,
    underprovisinoaldegree,
    studentpublicationimg,
    postbacksubjects,
    studentpostmarksheet,
    studentDesignation,
    academicprojecttitle,
    profesorDesignation,
    profesordepartment,
    projectsummary,
    techinacalroleandsupport,
    Presentationtitle,
    Presentationsummary,
    Competition,
    Isbnnumbertitle,
    isbnsummary,
    isbnpublishername,
    honorname,
    honorsummery,
    honoreventname,
    Organizationname,
    OrganizationDesignation,
    Organizationsummary,
    softwareused,
    computerlanguageknown,
    sportsactivity
  } = acadmicform;

  const handleChange = (event, index) => {
    setCommentBox(false)
    const updatedList = [...cgpaPercentageList];
    updatedList[index] = event.target.value;

    setCgpaPercentageList(updatedList);
    event.persist();
    setAcadmicForm({ ...acadmicform, [event.target.name]: event.target.value });
  };

  const handlepostChange = (event, index) => {
    const updatepostgradution = [...postcgpaPercentageList];
    updatepostgradution[index] = event.target.value;
    setPostCgpaPercentageList(updatepostgradution);
  };

  const onselectsscmarksheet = async (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    const fd = new FormData();
    fd.append("student_sscmarksheet", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    acadmicform.studentsscmarksheet = data[0].filename;
    setAcadmicForm({ ...acadmicform, [event.target.name]: event.target.value });
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSscmarksheet(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("Selected file:", file);
    console.log("File name:", fileName);
  };

  const onuploadedprovisional = async (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    const fd = new FormData();
    fd.append("student_underprovisinoaldegree", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    acadmicform.underprovisinoaldegree = data[0].filename;
    setAcadmicForm({ ...acadmicform, [event.target.name]: event.target.value });
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setuploadedprovisinoal(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("Selected file:", file);
    console.log("File name:", fileName);
  };

  const onselectHscmarksheet = async (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    const fd = new FormData();
    fd.append("student_Hhcmarksheet", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    acadmicform.studentHhcmarksheet = data[0].filename;
    setAcadmicForm({ ...acadmicform, [event.target.name]: event.target.value });
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setHscmarksheet(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("Selected file:", file);
    console.log("File name:", fileName);
  };

  const onuploadsemmarksheet = async (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    const fd = new FormData();
    fd.append("student_undermarksheet", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    acadmicform.studentundermarksheet = data[0].filename;
    setAcadmicForm({ ...acadmicform, [event.target.name]: event.target.value });
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setuploadedsememarksheet(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("Selected file:", file);
    console.log("File name:", fileName);
  };

  const onuploadedpostprovisional = async (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    const fd = new FormData();
    fd.append("student_postprovisinoal", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    acadmicform.studentpostprovisinoal = data[0].filename;
    setAcadmicForm({ ...acadmicform, [event.target.name]: event.target.value });
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setuploadedpostprovisinoal(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("Selected file:", file);
    console.log("File name:", fileName);
  };

  const uploadpostsemestermarksheet = async (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    const fd = new FormData();
    fd.append("student_postmarksheet", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    acadmicform.studentpostmarksheet = data[0].filename;
    setAcadmicForm({ ...acadmicform, [event.target.name]: event.target.value });
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setuploadedsemePostmarksheet(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("Selected file:", file);
    console.log("File name:", fileName);
  };

  const onselectJournalscertificate = async (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    const fd = new FormData();
    fd.append("student_publicationimg", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    acadmicform.studentpublicationimg = data[0].filename;
    setAcadmicForm({ ...acadmicform, [event.target.name]: event.target.value });
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setJournalscertificate(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("Selected file:", file);
    console.log("File name:", fileName);
  };

  const handleunderPercentage = (index) => {
    const updateunderper = [...cgpaPercentageList];
    updateunderper.splice(index, 1);
    setCgpaPercentageList(updateunderper);
  };

  const handlepostPercentage = (index) => {
    const updateunderper = [...postcgpaPercentageList];
    updateunderper.splice(index, 1);
    setPostCgpaPercentageList(updateunderper);
  };



  // const handleSubmit = async () => {
  //   const specialcourse = [...newaddspecializedcourses, addspecializedcourses]
  //   const computrtlang = [...newcomputrlanguageknown, addcomputerlangauge]
  //   const softwareused = [...newsoftwarestatus, addsoftwareused]
  //   const sports = [...newsportsActivity, addsportsactivity]
  //   const updatedataacademic = [...academicprojectdata, data];
  //   const presentdata = [...presentationData,
  //   {
  //     Presentationtitle: acadmicform.Presentationtitle,
  //     Presentationsummary: acadmicform.Presentationsummary,
  //     Competition: acadmicform.Competition
  //   }]
  //   const publication = [...generalpublicationData,
  //   {
  //     Isbnnumbertitle: acadmicform.Isbnnumbertitle,
  //     isbnsummary: acadmicform.isbnsummary,
  //     isbnpublishername: acadmicform.isbnpublishername
  //   }]
  //   const honorsdata = [...honourData,
  //   {
  //     honorname: acadmicform.honorname,
  //     honorsummery: acadmicform.honorsummery,
  //     honoreventname: acadmicform.honoreventname,
  //     honoryear: acadmicform.honoryear
  //   }]
  //   const organizedata = [...OrganizationData,
  //   {
  //     Organizationname,
  //     OrganizationDesignation,
  //     Organizationsummary,
  //     OrganizationTenurefrom: acadmicform.OrganizationTenurefrom,
  //     OrganizationTenureTo: acadmicform.OrganizationTenureTo
  //   }]
  //   SetAcademicDetailsData([
  //     ...AcadmicDetailsData,
  //     {
  //       School: {
  //         sscexam,
  //         sscborad,
  //         sscinstitute,
  //         sscaggregtatescore,
  //         studentsscmarksheet,
  //         sscsubject,
  //         sscyear,
  //         hscexam,
  //         hscborad,
  //         hscinstitute,
  //         studentHhcmarksheet,
  //         hscaggregtatescore,
  //         hscsubject,
  //         hscyear
  //       },
  //       Undergraduation: {
  //         instituename,
  //         studentundermarksheet,
  //         degree,
  //         branch,
  //         underprovisinoaldegree,
  //         yearofInception,
  //         yearofpassing,
  //         cgpaPercentage,
  //         cgpaPercentageoutof,
  //         ProvisionalDegree,
  //         numberofback,
  //         backsubjects,
  //         yearlycgpa: cgpaPercentageList
  //       },
  //       postgradution: {
  //         postinstituename,
  //         postdegree,
  //         studentpostmarksheet,
  //         postbranch,
  //         studentpostprovisinoal,
  //         postcgpaPercentage,
  //         postcgpaPercentageoutof,
  //         postyearofInception,
  //         postyearofpassing,
  //         postProvisionalDegree,
  //         postnumberofback,
  //         postbacksubjects,
  //         postyearlycgpa: postcgpaPercentageList
  //       },
  //       studentpublicationimg: studentpublicationimg,
  //       specialcourse: specialcourse,
  //       softwareused: softwareused,
  //       computerlanguage: computrtlang,
  //       sportsActivity: sports,
  //       Acadmicassesmint: updatedataacademic,
  //       Presentation: presentdata,
  //       publication: publication,
  //       honour: honorsdata,
  //       organization: organizedata
  //     }
  //   ]);

  //   const academiclistdata = [...AcadmicDetailsData,
  //   {
  //     School: {
  //       sscexam,
  //       sscborad,
  //       sscinstitute,
  //       sscaggregtatescore,
  //       studentsscmarksheet,
  //       sscsubject,
  //       sscyear,
  //       hscexam,
  //       hscborad,
  //       hscinstitute,
  //       studentHhcmarksheet,
  //       hscaggregtatescore,
  //       hscsubject,
  //       hscyear
  //     },
  //     Undergraduation: {
  //       instituename,
  //       studentundermarksheet,
  //       degree,
  //       branch,
  //       underprovisinoaldegree,
  //       yearofInception,
  //       yearofpassing,
  //       cgpaPercentage,
  //       cgpaPercentageoutof,
  //       ProvisionalDegree,
  //       numberofback,
  //       backsubjects,
  //       yearlycgpa: cgpaPercentageList
  //     },
  //     postgradution: {
  //       postinstituename,
  //       postdegree,
  //       studentpostmarksheet,
  //       postbranch,
  //       studentpostprovisinoal,
  //       postcgpaPercentage,
  //       postcgpaPercentageoutof,
  //       postyearofInception,
  //       postyearofpassing,
  //       postProvisionalDegree,
  //       postnumberofback,
  //       postbacksubjects,
  //       postyearlycgpa: postcgpaPercentageList
  //     },
  //     studentpublicationimg: studentpublicationimg,
  //     specialcourse: specialcourse,
  //     softwareused: softwareused,
  //     computerlanguage: computrtlang,
  //     sportsActivity: sports,
  //     Acadmicassesmint: updatedataacademic,
  //     Presentation: presentdata,
  //     publication: publication,
  //     honour: honorsdata,
  //     organization: organizedata
  //   }]

  //   console.log("academiclistdata", academiclistdata)
  //   // setOpen(true)
  //   // try {
  //   //   const resp = await persnoaldetailsupdate({
  //   //     AcademicDetailstatus: "done",
  //   //     AcademicDetailform: JSON.stringify(academiclistdata)
  //   //   });
  //   //   console.log("resp", resp);
  //   //   if (resp.status === 200) {
  //   //     setOpen(false);
  //   //     navigation("/student/material/CompatativeExam");
  //   //   }
  //   // } catch (err) {
  //   //   console.log(err);
  //   // }

  // };
  const handleSubmit = async () => {
    const specialcourse = [...newaddspecializedcourses, addspecializedcourses];
    const computrtlang = [...newcomputrlanguageknown, addcomputerlangauge];
    const softwareused = [...newsoftwarestatus, addsoftwareused];
    const sports = [...newsportsActivity, addsportsactivity];
    const updatedataacademic = [...academicprojectdata, data];
    const presentdata = [
      ...presentationData,
      {
        Presentationtitle: acadmicform.Presentationtitle,
        Presentationsummary: acadmicform.Presentationsummary,
        Competition: acadmicform.Competition
      }
    ];
    const publication = [
      ...generalpublicationData,
      {
        Isbnnumbertitle: acadmicform.Isbnnumbertitle,
        isbnsummary: acadmicform.isbnsummary,
        isbnpublishername: acadmicform.isbnpublishername
      }
    ];
    const honorsdata = [
      ...honourData,
      {
        honorname: acadmicform.honorname,
        honorsummery: acadmicform.honorsummery,
        honoreventname: acadmicform.honoreventname,
        honoryear: acadmicform.honoryear
      }
    ];
    const organizedata = [
      ...OrganizationData,
      {
        Organizationname: acadmicform.Organizationname,
        OrganizationDesignation: acadmicform.OrganizationDesignation,
        Organizationsummary: acadmicform.Organizationsummary,
        OrganizationTenurefrom: acadmicform.OrganizationTenurefrom,
        OrganizationTenureTo: acadmicform.OrganizationTenureTo
      }
    ];

    const academiclistdata = [
      ...AcadmicDetailsData,
      {
        School: {
          sscexam,
          sscborad,
          sscinstitute,
          sscaggregtatescore,
          studentsscmarksheet,
          sscsubject,
          sscyear,
          hscexam,
          hscborad,
          hscinstitute,
          studentHhcmarksheet,
          hscaggregtatescore,
          hscsubject,
          hscyear
        },
        Undergraduation: {
          instituename,
          studentundermarksheet,
          degree,
          branch,
          underprovisinoaldegree,
          yearofInception,
          yearofpassing,
          cgpaPercentage,
          cgpaPercentageoutof,
          ProvisionalDegree: havesiblng,
          numberofback,
          backsubjects,
          yearlycgpa: cgpaPercentageList
        },
        postgradution: {
          postinstituename,
          postdegree,
          studentpostmarksheet,
          postbranch,
          studentpostprovisinoal,
          postcgpaPercentage,
          postcgpaPercentageoutof,
          postyearofInception,
          postyearofpassing,
          postProvisionalDegree: boolpostdegree,
          postnumberofback,
          postbacksubjects,
          postyearlycgpa: postcgpaPercentageList
        },
        studentpublicationimg,
        specialcourse,
        softwareused,
        computerlanguage: computrtlang,
        sportsActivity: sports,
        Acadmicassesmint: updatedataacademic,
        Presentation: presentdata,
        publication,
        honour: honorsdata,
        organization: organizedata
      }
    ];

    console.log("academiclistdata", academiclistdata);
    try {
      const resp = await persnoaldetailsupdate(
        {
          AcademicDetailstatus: "done",
          AcademicDetailform: JSON.stringify(academiclistdata)
        },
        userID
      );
      if (resp.status === 200) {
        setOpen(false);
        SetAcademicDetailsData({});
        navigation("/student/material/CompatativeExam");
      }
      console.log("resp", resp);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = async () => {
    if (AcadmicDetailsData) {
      try {
        const resp = await persnoaldetailsupdate(
          {
            AcademicDetailstatus: "done",
            AcademicDetailform: JSON.stringify(AcadmicDetailsData)
          },
          userID
        );
        if (resp.status === 200) {
          setOpen(false);
          SetAcademicDetailsData({});
          navigation("/student/material/CompatativeExam");
        }
        console.log("resp", resp);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handlesibvlings = (event) => {
    setHavesiblings(event.target.value);

    console.log("event.target.value", event.target.value);
  };
  const handlepostdegree = (event) => {
    setboolpostprovisnoal(event.target.value);

    console.log("event.target.value", event.target.value);
  };

  return (
    <div>
      {commentbox && <Popup commentbox={commentbox} setCommentBox={setCommentBox} />}

      <ValidatorForm onSubmit={handleSubmit} onError={() => {
        setCommentBox(true)
      }}>
        <div style={{ border:"2px solid #00000080",padding:"20px",marginBottom:"20px"}}>
        <H3>School</H3>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="sscexam"
              label="EXAMINATION  (SSC-10th)"
              onChange={handleChange}
              value={sscexam || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              type="text"
              name="sscborad"
              label="Board"
              onChange={handleChange}
              value={sscborad || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              type="text"
              name="sscinstitute"
              label="Institute"
              onChange={handleChange}
              value={sscinstitute || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              type="number"
              name="sscaggregtatescore"
              label="Aggregate Score"
              onChange={handleChange}
              value={sscaggregtatescore || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              type="text"
              name="sscsubject"
              label="Subject"
              onChange={handleChange}
              value={sscsubject || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <div style={datePickerStyles}>
              <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                <DatePicker
                  // maxDate={moment()}
                  // disableFuture
                  label="Year"
                  onChange={(e) => {
                    setAcadmicForm((pre) => ({
                      ...pre,
                      sscyear: e.format("YYYY-MM-DD")
                    }));
                  }}
                />
              </LocalizationProvider>
            </div>
            {/* <TextField
              type="text"
              name="sscyear"
              label="Year"
              onChange={handleChange}
              value={sscyear || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            /> */}
            Ssc Marksheet
            <TextField type="file"
              name="sscmarksheet1" value={sscmarksheet1} onChange={onselectsscmarksheet} validators={["required"]}
              errorMessages={["this field is required"]} />
            {sscmarksheet && (
              <img src={sscmarksheet} alt="dvd" style={{ maxWidth: "100px", maxHeight: "100px" }} />
            )}
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="hscexam"
              label="EXAMINATION  ( HSC-12th )"
              onChange={handleChange}
              value={hscexam || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              type="text"
              name="hscborad"
              label="Board"
              onChange={handleChange}
              value={hscborad || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              type="text"
              name="hscinstitute"
              label="Institute"
              onChange={handleChange}
              value={hscinstitute || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              type="number"
              name="hscaggregtatescore"
              label="Aggregate Score"
              onChange={handleChange}
              value={hscaggregtatescore || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              type="text"
              name="hscsubject"
              label="Subject"
              onChange={handleChange}
              value={hscsubject || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <div style={datePickerStyles}>
              <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en" errorMessages={["this field is required"]}
                validators={["required"]}>
                <DatePicker
                  label="Year"
                  // maxDate={moment()}
                  onChange={(e) => {
                    setAcadmicForm((pre) => ({
                      ...pre,
                      hscyear: e.format("YYYY-MM-DD")
                    }));
                  }}

                />
              </LocalizationProvider>
            </div>
            {/* <TextField
              type="text"
              name="hscyear"
              label="Year"
              onChange={handleChange}
              value={hscyear || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
              /> */}
            Hsc Marksheet
            <TextField type="file" name="hscmarksheet1" value={hscmarksheet1} onChange={onselectHscmarksheet} errorMessages={["this field is required"]}
              validators={["required"]} />
            {hscmarksheet && (
              <img src={hscmarksheet} alt="dvd" style={{ maxWidth: "100px", maxHeight: "100px" }} />
            )}
          </Grid>
        </Grid>
        </div>
        
        <Grid></Grid>
        <div style={{ border:"2px solid #00000080",padding:"20px",marginBottom:"20px"}}>

        <H3>Undergraduation </H3>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="instituename"
              label="INSTITUTE NAME "
              onChange={handleChange}
              value={instituename || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              type="text"
              name="degree"
              label="DEGREE"
              onChange={handleChange}
              value={degree || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              type="text"
              name="branch"
              label="BRANCH"
              onChange={handleChange}
              value={branch || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              type="number"
              name="numberofback"
              label="Number of back( If any)"
              onChange={handleChange}
              value={numberofback || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              type="text"
              name="backsubjects"
              label="Back Subjects ( if any)"
              onChange={handleChange}
              value={backsubjects || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              {cgpaPercentageList.map((cgpa, index) => (
                <Grid item xs={12} key={index} style={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    type="number"
                    name={`cgpaPercentage-${index}`}
                    label={`${index + 1}year CGPA/Percentage`}
                    value={cgpa}
                    onChange={(event) => handleChange(event, index)}
                    disabled={index !== cgpaPercentageList.length - 1}
                    fullWidth
                  />
                  {index !== cgpaPercentageList.length - 1 && (
                    <DeleteIcon
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        handleunderPercentage(index);
                      }}
                    />
                  )}
                </Grid>
              ))}
            </Grid>
            <Button onClick={handleaddgradution} color="primary" variant="contained">
              <Icon>add</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
            </Button>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <div style={datePickerStyles}>
              <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                <DatePicker
                  // maxDate={moment()}
                  // disableFuture
                  label="YEAR of Inceptio"
                  onChange={(e) => {
                    setAcadmicForm((pre) => ({
                      ...pre,
                      yearofInception: e.format("YYYY-MM-DD")
                    }));
                  }}
                />
              </LocalizationProvider>
            </div>
            {/* <TextField
              type="text"
              name="yearofInception"
              label="YEAR of Inceptio"
              onChange={handleChange}
              value={yearofInception || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            /> */}

            <div style={datePickerStyles}>
              <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                <DatePicker
                  // maxDate={moment()}
                  // disableFuture
                  label="YEAR of passing "
                  onChange={(e) => {
                    setAcadmicForm((pre) => ({
                      ...pre,
                      yearofpassing: e.format("YYYY-MM-DD")
                    }));
                  }}
                />
              </LocalizationProvider>
            </div>
            {/* <TextField
              type="text"
              name="yearofpassing"
              label="YEAR of passing "
              onChange={handleChange}
              value={yearofpassing || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            /> */}
            <TextField
              type="text"
              name="cgpaPercentage"
              label="CGPA/Percentage"
              onChange={handleChange}
              value={cgpaPercentage || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              type="text"
              name="cgpaPercentageoutof"
              label="CGPA/Percentage Out Of"
              onChange={handleChange}
              value={cgpaPercentageoutof || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <FormLabel component="legend">Do you Have Provsinoal Degree?</FormLabel>
            <RadioGroup
              value={havesiblng}
              name="Provsinoal Degree"
              className="group"
              aria-label="Gender"
              onChange={handlesibvlings}
            >
              <FormControlLabel value="yes" control={<Radio />} label="yes" />
              <FormControlLabel value="no" control={<Radio />} label="no" />
            </RadioGroup>
            {/* <TextField
              type="text"
              name="ProvisionalDegree"
              label="Provisional Degree"
              onChange={handleChange}
              value={ProvisionalDegree || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            /> */}

            {havesiblng === "yes" && <>
              Upload Provisional degree / Degree
              <TextField type="file" name="underprovisinoaldegree1" value={underprovisinoaldegree1} onChange={onuploadedprovisional} errorMessages={["this field is required"]}
                validators={["required"]} />
              {uploadedprovisinoal && (
                <img
                  src={uploadedprovisinoal}
                  alt="dvd"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              )}
            </>}
            upload Semester Marksheets or Yearly Marksheets
            <TextField type="file" name="studentundermarksheet1" value={studentundermarksheet1} onChange={onuploadsemmarksheet} errorMessages={["this field is required"]}
              validators={["required"]} />
            {uploadedsememarksheet && (
              <img
                src={uploadedsememarksheet}
                alt="dvd"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            )}
          </Grid>
        </Grid>
        </div>
   
        <div style={{ border:"2px solid #00000080",padding:"20px",marginBottom:"20px"}}>
        <Grid style={{ marginTop: "20px" }}></Grid>
        <H3>Post graduation</H3>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="postinstituename"
              label="INSTITUTE NAME "
              onChange={handleChange}
              value={postinstituename || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              type="text"
              name="postdegree"
              label="DEGREE"
              onChange={handleChange}
              value={postdegree || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              type="text"
              name="postbranch"
              label="BRANCH"
              onChange={handleChange}
              value={postbranch || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              type="number"
              name="postnumberofback"
              label="Number of back( If any)"
              onChange={handleChange}
              value={postnumberofback || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              type="text"
              name="postbacksubjects"
              label="Back Subjects ( if any)"
              onChange={handleChange}
              value={postbacksubjects || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            {postcgpaPercentageList.map((cgpa, index) => {
              return (
                <Grid item xs={12} key={index} style={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    type="number"
                    name={`cgpaPercentage-${index}`}
                    label={`${index + 1}year CGPA/Percentage`}
                    value={cgpa}
                    onChange={(event) => handlepostChange(event, index)}
                    disabled={index !== postcgpaPercentageList.length - 1}
                    fullWidth
                  />
                  {index !== postcgpaPercentageList.length - 1 && (
                    <DeleteIcon
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        handlepostPercentage(index);
                      }}
                    />
                  )}
                </Grid>
              );
            })}
            <Button onClick={handlepostaddgradution} color="primary" variant="contained">
              <Icon>add</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
            </Button>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <div style={datePickerStyles}>
              <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                <DatePicker
                  // maxDate={moment()}
                  // disableFuture
                  label="YEAR of Inceptio"
                  onChange={(e) => {
                    setAcadmicForm((pre) => ({
                      ...pre,
                      postyearofInception: e.format("YYYY-MM-DD")
                    }));
                  }}
                />
              </LocalizationProvider>
            </div>
            {/* <TextField
              type="text"
              name="postyearofInception"
              label="YEAR of Inceptio"
              onChange={handleChange}
              value={postyearofInception || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            /> */}
            <div style={datePickerStyles}>
              <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                <DatePicker
                  // maxDate={moment()}
                  disableFuture
                  label="YEAR of passing "
                  onChange={(e) => {
                    setAcadmicForm((pre) => ({
                      ...pre,
                      postyearofpassing: e.format("YYYY-MM-DD")
                    }));
                  }}
                />
              </LocalizationProvider>
            </div>
            {/* <TextField
              type="text"
              name="postyearofpassing"
              label="YEAR of passing "
              onChange={handleChange}
              value={postyearofpassing || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            /> */}
            <TextField
              type="text"
              name="postcgpaPercentage"
              label="CGPA/Percentage"
              onChange={handleChange}
              value={postcgpaPercentage || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              type="text"
              name="postcgpaPercentageoutof"
              label="CGPA/Percentage Out Of"
              onChange={handleChange}
              value={postcgpaPercentageoutof || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            {/* <TextField
              type="text"
              name="postProvisionalDegree"
              label="Provisional Degree"
              onChange={handleChange}
              value={postProvisionalDegree || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            /> */}

            <FormLabel component="legend">Do you Have Provsinoal Degree?</FormLabel>
            <RadioGroup
              value={boolpostdegree}
              name="Provsinoal Degree"
              className="group"
              aria-label="Gender"
              onChange={handlepostdegree}
            >
              <FormControlLabel value="yes" control={<Radio />} label="yes" />
              <FormControlLabel value="no" control={<Radio />} label="no" />
            </RadioGroup>
            {boolpostdegree === "yes" &&
              <>
                Upload Provisional degree / Degree
                <TextField type="file" name="studentpostprovisinoal1" value={studentpostprovisinoal1} onChange={onuploadedpostprovisional} errorMessages={["this field is required"]}
                  validators={["required"]} />
                {uploadedpostprovisinoal && (
                  <img
                    src={uploadedpostprovisinoal}
                    alt="dvd"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                )}
              </>
            }
            upload Semester Marksheets or Yearly Marksheets
            <TextField type="file" name="studentpostmarksheet1" value={studentpostmarksheet1} onChange={uploadpostsemestermarksheet} errorMessages={["this field is required"]}
              validators={["required"]} />
            {uploadedsemePostmarksheet && (
              <img
                src={uploadedsemePostmarksheet}
                alt="dvd"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            )}
          </Grid>
        </Grid>
       </div>

       <div style={{ border:"2px solid #00000080",padding:"20px",marginBottom:"20px"}}>
        <Grid style={{ marginTop: "20px" }}></Grid>
        <div style={{ display: "flex", alignItems: "center" }}>
          <H3>Specialized Courses Undertaken</H3>
          {addspecializedcourses !== "" &&
            <Button onClick={handleaddspecializedcourses} style={{ marginLeft: "20px" }} color="primary" variant="contained">
              <Icon>add</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
            </Button>
          }
        </div>

        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            {newaddspecializedcourses.map((item, key) => {
              return (
                <Grid item xs={12} key={key} style={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    key={key}
                    type="text"
                    disabled={true}
                    label={`specialized courses name${key + 1}`}
                    value={item}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <DeleteIcon onClick={handlespecialcoursedelte} />
                </Grid>
              );
            })}

            {spcoursebtn && (
              <TextField
                type="text"
                name="addspecializedcourses"
                label="specialized courses name"
                onChange={(e, val) => {
                  setSpecializedcourses(e.target.value);
                }}
                value={addspecializedcourses || ""}
              />
            )}

            <div>

              {/* {addspecializedcourses !== "" && (
                <Button
                  style={{ marginLeft: "20px" }}
                  onClick={handleDonespecializedcourses}
                  color="primary"
                  variant="contained"
                >
                  <Icon>done</Icon>
                  <Span sx={{ pl: 1, textTransform: "capitalize" }}>Save</Span>
                </Button>
              )} */}
            </div>
          </Grid>
        </Grid>

        <Grid style={{ marginTop: "20px" }}></Grid>
        <div style={{ display: "flex", alignItems: "center" }}>
          <H3>Software Used</H3>
          {addsoftwareused !== "" &&
            <Button onClick={handlesoftwareused} style={{ marginLeft: "20px" }} color="primary" variant="contained">
              <Icon>add</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
            </Button>
          }

        </div>

        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            {newsoftwarestatus.map((item, key) => {
              return (
                <Grid
                  key={key}
                  item
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                  sx={{ mt: 2 }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <TextField
                    type="text"
                    name="item"
                    disabled={true}
                    label={`Software Used${key + 1}`}
                    value={item || ""}
                  />
                  <DeleteIcon
                    onClick={() => {
                      handlesoftwareuseddelte(key);
                    }}
                  />
                </Grid>
              );
            })}
            {softwarebtn && (
              <TextField
                type="text"
                name="addsoftwareused"
                label="Software Used"
                onChange={(e) => {
                  setSoftwareused(e.target.value);
                }}
                value={addsoftwareused || ""}
              />
            )}

            <div>

              {/* {addsoftwareused !== "" && (
                <Button
                  style={{ marginLeft: "20px" }}
                  onClick={handledonesoftwareused}
                  color="primary"
                  variant="contained"
                >
                  {" "}
                  <Icon>done</Icon>
                  <Span sx={{ pl: 1, textTransform: "capitalize" }}>Save</Span>
                </Button>
              )} */}
            </div>
          </Grid>
        </Grid>

        <Grid style={{ marginTop: "20px" }}></Grid>
        <div style={{ display: "flex", alignItems: "center" }}>
          <H3>Computer Language Known</H3>
          {addcomputerlangauge !== "" &&
            <Button style={{ marginLeft: "20px" }} onClick={handlecomputerlanguageknown} color="primary" variant="contained">
              <Icon>add</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
            </Button>
          }

        </div>

        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            {newcomputrlanguageknown.map((item, key) => {
              return (
                <Grid item xs={12} key={key} style={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    key={key}
                    type="text"
                    disabled={true}
                    name="item"
                    label={`Computer Language Known${key + 1}`}
                    value={item || ""}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <DeleteIcon onClick={handlecomputerlanguagedelte} />
                </Grid>
              );
            })}
            {computerbtn && (
              <TextField
                type="text"
                name="addcomputerlangauge"
                label="Computer Language Known"
                onChange={(e) => {
                  setComputerlangauge(e.target.value);
                }}
                value={addcomputerlangauge || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
            )}

            <div>

              {/* {addcomputerlangauge !== "" && (
                <Button
                  style={{ marginLeft: "20px" }}
                  onClick={handledonecomputerlanguageknown}
                  color="primary"
                  variant="contained"
                >
                  <Icon>done</Icon>
                  <Span sx={{ pl: 1, textTransform: "capitalize" }}>Save</Span>
                </Button>
              )} */}
            </div>
          </Grid>
        </Grid>

        <Grid style={{ marginTop: "20px" }}></Grid>
        <div style={{ display: "flex", alignItems: "center" }}>
          <H3>Sport Activity </H3>
          {addsportsactivity !== "" &&
            <Button onClick={handlesportsactivity} color="primary" variant="contained">
              <Icon>add</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
            </Button>
          }

        </div>

        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            {newsportsActivity.map((item, key) => {
              return (
                <Grid item xs={12} key={key} style={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    disabled={true}
                    type="text"
                    name="item"
                    label={`Sport Activity${key + 1}`}
                    value={item || ""}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    />
                  <DeleteIcon
                    onClick={() => {
                      handlesportsDelete(key);
                    }}
                    />
                </Grid>
              );
            })}
            {sportsbtn && (
              <TextField
              type="text"
              name="addsportsactivity"
              label="Sport Activity "
              onChange={(e) => {
                setaddSportsactivity(e.target.value);
              }}
              value={addsportsactivity || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
              />
            )}

            <div>

              {/* {addsportsactivity !== "" && (
                <Button
                style={{ marginLeft: "20px" }}
                onClick={handledonesportsactivity}
                color="primary"
                variant="contained"
                >
                <Icon>done</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Save</Span>
                </Button>
                )} */}
            </div>
          </Grid>
        </Grid>
        </div>

        <div style={{ border:"2px solid #00000080",padding:"20px",marginBottom:"20px"}}>
        <div style={{ margin: "20px 0px" }}>
          <Grid style={{ marginTop: "20px" }}></Grid>
          <div style={{ display: "flex", alignItems: "center" }}>
            <H3>Academic Assignment</H3>
            {selectedAcademicproject &&
              <Button onClick={handleaddAcademicAssignment} style={{ marginLeft: "20px" }} color="primary" variant="contained">
                <Icon>add</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
              </Button>

            }

          </div>


          {academicprojectdata.map((item, key) => {
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
                  <DeleteIcon
                    onClick={() => {
                      HandleAcademicAssDelete(key);
                    }}
                  />
                </div>
                <Grid container spacing={6}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <div>
                      <TextField
                        type="text"
                        name="techinacalroleandsupport"
                        label="Project Type"
                        onChange={handleChange}
                        value={item.selectedAcademicproject || ""}
                        disabled
                      />

                      <TextField
                        type="text"
                        name="techinacalroleandsupport"
                        label="Tenure from"
                        onChange={handleChange}
                        value={item.acadmicdatepicto || ""}
                        disabled
                      />

                      <TextField
                        type="text"
                        name="techinacalroleandsupport"
                        label="Tenure to"
                        onChange={handleChange}
                        value={item.acadmicdatepicfrom || ""}
                        disabled
                      />
                      <TextField
                        type="text"
                        name="techinacalroleandsupport"
                        label="Technical Details With Roles And Responsibilities"
                        onChange={handleChange}
                        value={item.techinacalroleandsupport || ""}
                        disabled
                      />
                    </div>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextField
                      type="text"
                      name="studentDesignation"
                      label="Your Designation"
                      onChange={handleChange}
                      value={item.studentDesignation || ""}
                      disabled
                    />
                    <TextField
                      type="text"
                      name="academicprojecttitle"
                      label="Project Title"
                      onChange={handleChange}
                      value={item.academicprojecttitle || ""}
                      disabled
                    />

                    <TextField
                      type="text"
                      name="profesorDesignation"
                      label="Under The Guidance Of With Designation"
                      onChange={handleChange}
                      value={item.profesorDesignation || ""}
                      disabled
                    />
                    <TextField
                      type="text"
                      name="profesordepartment"
                      label="department name"
                      onChange={handleChange}
                      value={item.profesordepartment || ""}
                      disabled
                    />
                    <TextField
                      type="text"
                      name="projectsummary"
                      label="Summary(at least 6 lines)"
                      // multiLine
                      onChange={handleChange}
                      value={item.projectsummary || ""}
                      disabled
                    />
                  </Grid>
                </Grid>
              </div>
            );
          })}

          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <Fragment>
                <AutoComplete
                  options={suggestio}
                  getOptionLabel={(option) => option.label}
                  onChange={(e, val) => {
                    setSelectedAcademicproject(val?.label);
                    console.log("ee", val?.label);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Type Of Project (Select Any One) "
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                {selectedAcademicproject && (
                  <div>
                    <div style={datePickerStyles}>
                      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                        <DatePicker
                          label="Tenure from"
                          onChange={(e) => {
                            console.log("rwe", e.format("YYYY-MM-DD"));
                            setAcadmicDatepicfrom(e.format("YYYY-MM-DD"));
                          }}
                        />
                      </LocalizationProvider>
                    </div>

                    <div style={datePickerStyles}>
                      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                        <DatePicker
                          label="Tenure to"
                          onChange={(e) => {
                            console.log("rwe", e.format("YYYY-MM-DD"));
                            setAcadmicDatepicto(e.format("YYYY-MM-DD"));
                          }}
                        />
                      </LocalizationProvider>
                    </div>
                    <TextField
                      type="text"
                      name="techinacalroleandsupport"
                      label="Technical Details With Roles And Responsibilities"
                      onChange={handleChange}
                      value={techinacalroleandsupport || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                  </div>
                )}
              </Fragment>
            </Grid>
            {selectedAcademicproject && (
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  type="text"
                  name="studentDesignation"
                  label="Your Designation"
                  onChange={handleChange}
                  value={studentDesignation || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextField
                  type="text"
                  name="academicprojecttitle"
                  label="Project Title"
                  onChange={handleChange}
                  value={academicprojecttitle || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                Under The Guidance Of With
                <TextField
                  type="text"
                  name="profesorDesignation"
                  label="Designation"
                  onChange={handleChange}
                  value={profesorDesignation || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextField
                  type="text"
                  name="profesordepartment"
                  label="department name"
                  onChange={handleChange}
                  value={profesordepartment || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextField
                  type="text"
                  name="projectsummary"
                  label="Summary(at least 6 lines)"
                  // multiLine
                  onChange={handleChange}
                  value={projectsummary || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
            )}
          </Grid>

          {selectedAcademicproject && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                margin: "20px 0px"
              }}
            >

              {/* <Button
                onClick={handleDoneAcademicAssignment}
                color="primary"
                variant="contained"
              >
                <Icon>done</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Save</Span>
              </Button> */}
            </div>
          )}

        </div>
        </div>

        <div style={{ border:"2px solid #00000080",padding:"20px",marginBottom:"20px"}}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <H3>Presentation</H3>
          {Presentationtitle !== "" &&
            <Button onClick={handleaddPresentation} style={{ marginLeft: "20px" }} color="primary" variant="contained">
              <Icon>add</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
            </Button>
          }

        </div>
        <Grid></Grid>
        {presentationData.map((item, key) => {
          return (
            <div key={key} style={{ padding: "0px 15px", borderBottom: "1px solid" }}>
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
                    HandlepresentationDataDelete(key);
                  }}
                />
              </div>
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    disabled={true}
                    type="text"
                    name="Presentationtitle"
                    label="Title"
                    onChange={handleChange}
                    value={item.Presentationtitle || ""}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <TextField
                    type="text"
                    disabled={true}
                    name="Presentationsummary"
                    label="Summary"
                    onChange={handleChange}
                    value={item.Presentationsummary || ""}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    type="text"
                    disabled={true}
                    name="Competition"
                    label="Competition"
                    onChange={handleChange}
                    value={item.Competition || ""}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
              </Grid>
            </div>
          );
        })}

        {PresentationBtn && (
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                type="text"
                name="Presentationtitle"
                label="Title"
                onChange={handleChange}
                value={Presentationtitle || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextField
                type="text"
                name="Presentationsummary"
                label="Summary(at least 6 lines)"
                onChange={handleChange}
                value={Presentationsummary || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                type="text"
                name="Competition"
                label="Competition"
                onChange={handleChange}
                value={Competition || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
            </Grid>
          </Grid>
        )}

        {Presentationtitle !== "" &&
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center", margin: "20px 0px" }}
          >

            {/* <Button
              style={{ marginLeft: "20px" }}
              onClick={handleDonePresentation}
              color="primary"
              variant="contained"
            >
              <Icon>done</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Save</Span>
            </Button> */}
          </div>
        }

       </div>

       <div style={{ border:"2px solid #00000080",padding:"20px",marginBottom:"20px"}}>
        <div style={{ margin: "20px 0px" }}>

          <div style={{ display: "flex", alignItems: "center" }}>
            <H3>Journals/publication</H3>
            {Isbnnumbertitle !== "" &&
              <Button color="primary" variant="contained" style={{ marginLeft: "20px" }} onClick={addGeneralpublication}>
                <Icon>add</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
              </Button>
            }

          </div>

          <Grid></Grid>

          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              Upload the certificate
              <TextField
                type="file"
                name="studentpublicationimg1"
                value={studentpublicationimg1}
                onChange={onselectJournalscertificate}
                errorMessages={["this field is required"]}
                validators={["required"]}
              />
              {Journalscertificate && (
                <img
                  src={Journalscertificate}
                  alt="dvd"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              )}
            </Grid>
          </Grid>
          {generalpublicationData.map((item, key) => {
            return (
              <div key={key} style={{ padding: "0px 15px", borderBottom: "1px solid" }}>
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
                <Grid container spacing={6}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextField
                      type="text"
                      name="Isbnnumbertitle"
                      label="Title With Isbn Number"
                      disabled={true}
                      value={item.Isbnnumbertitle || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextField
                      type="text"
                      name="isbnsummary"
                      label="Summary(At Least 4 Lines)"
                      disabled={true}
                      value={item.isbnsummary || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextField
                      type="text"
                      name="isbnpublishername"
                      label="Publication Name "
                      disabled={true}
                      value={item.isbnpublishername || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                  </Grid>
                </Grid>
              </div>
            );
          })}

          {generalbtn && (
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  type="text"
                  name="Isbnnumbertitle"
                  label="Title With Isbn Number"
                  onChange={handleChange}
                  value={Isbnnumbertitle || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextField
                  type="text"
                  name="isbnsummary"
                  label="Summary(At Least 4 Lines)"
                  onChange={handleChange}
                  value={isbnsummary || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  type="text"
                  name="isbnpublishername"
                  label="Publication Name "
                  onChange={handleChange}
                  value={isbnpublishername || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
            </Grid>
          )}

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              margin: "20px 0px"
            }}
          >

            {/* <Button
              style={{ marginLeft: "20px" }}
              color="primary"
              variant="contained"
              onClick={DoneGeneralpublication}
            >
              <Icon>done</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Save</Span>
            </Button> */}
          </div>

        </div>
        </div>

        <div style={{ border:"2px solid #00000080",padding:"20px",marginBottom:"20px"}}>
        <Grid></Grid>
        <div style={{ display: "flex", alignItems: "center" }}>
          <H3>Honours And Achievements</H3>
          {honorname !== "" &&
            <Button color="primary" variant="contained" style={{ marginLeft: "20px" }} onClick={addHonours}>
              <Icon>add</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
            </Button>
          }

        </div>

        {honourData.map((item, key) => {
          return (
            <div key={key} style={{ padding: "0px 15px", borderBottom: "1px solid" }}>
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
                    DeleteHonorData(key);
                  }}
                />
              </div>
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    type="text"
                    name="honorname"
                    label="Name"
                    onChange={handleChange}
                    disabled={true}
                    value={item.honorname || ""}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <TextField
                    disabled={true}
                    type="text"
                    name="honorsummery"
                    label="Sumary"
                    onChange={handleChange}
                    value={item.honorsummery || ""}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    disabled={true}
                    type="text"
                    name="honoreventname"
                    label="Event Name "
                    onChange={handleChange}
                    value={item.honoreventname || ""}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <TextField
                    type="text"
                    disabled={true}
                    name="honoreventname"
                    label="Year"
                    onChange={handleChange}
                    value={item.honoryear || ""}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
              </Grid>
            </div>
          );
        })}
        {DoneHonoursBtn && (
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                type="text"
                name="honorname"
                label="Name"
                onChange={handleChange}
                value={honorname || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextField
                type="text"
                name="honorsummery"
                label="Sumary"
                onChange={handleChange}
                value={honorsummery || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                type="text"
                name="honoreventname"
                label="Event Name "
                onChange={handleChange}
                value={honoreventname || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              Year
              <div style={datePickerStyles}>
                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                  <DatePicker
                    views={["year"]}
                    label="Year"
                    onChange={(e) => {
                      setAcadmicForm((pre) => ({
                        ...pre,
                        honoryear: e.format("YYYY")
                      }));
                    }}
                    renderInput={(params) => <TextField {...params} />}
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
            margin: "20px 0px"
          }}
        >

          {/* <Button
            style={{ marginLeft: "20px" }}
            color="primary"
            variant="contained"
            onClick={DoneHonours}
          >
            <Icon>done</Icon>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Save</Span>
          </Button> */}
        </div>
        </div>

        <div style={{ border:"2px solid #00000080",padding:"20px",marginBottom:"20px"}}>
        <div style={{ margin: "20px 0px" }}>

          <Grid></Grid>
          <div style={{ display: "flex", alignItems: "center" }}>
            <H3>Member Of Organization </H3>
            {Organizationname !== "" &&
              <Button color="primary" variant="contained" style={{ marginLeft: "20px" }} onClick={addOrganization}>
                <Icon>add</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
              </Button>
            }

          </div>


          {OrganizationData.map((item, key) => {
            return (
              <div key={key} style={{ padding: "0px 15px", borderBottom: "1px solid" }}>
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
                      deleteorganization(key);
                    }}
                  />
                </div>
                <Grid container spacing={6}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextField
                      type="text"
                      name="Organizationname"
                      disabled
                      label="Name"
                      onChange={handleChange}
                      value={item.Organizationname || ""}
                    />
                    <TextField
                      type="text"
                      disabled
                      name="OrganizationDesignation"
                      label="Designation"
                      onChange={handleChange}
                      value={item.OrganizationDesignation || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextField
                      type="text"
                      disabled
                      name="Organizationsummary"
                      label="Work Summary "
                      onChange={handleChange}
                      value={item.Organizationsummary || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextField
                      type="text"
                      disabled
                      name="Organizationsummary"
                      label="Tenure To"
                      onChange={handleChange}
                      value={item.OrganizationTenureTo || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextField
                      type="text"
                      disabled
                      name="Organizationsummary"
                      label="Tenure From"
                      onChange={handleChange}
                      value={item.OrganizationTenurefrom || ""}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                  </Grid>
                </Grid>
              </div>
            );
          })}
          {Organizationbtn && (
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  type="text"
                  name="Organizationname"
                  label="Name"
                  onChange={handleChange}
                  value={Organizationname || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextField
                  type="text"
                  name="OrganizationDesignation"
                  label="Designation"
                  onChange={handleChange}
                  value={OrganizationDesignation || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  type="text"
                  name="Organizationsummary"
                  label="Work Summary "
                  onChange={handleChange}
                  value={Organizationsummary || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />

                <div style={datePickerStyles}>
                  <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                    <DatePicker
                      label="Tenure from"
                      onChange={(e) => {
                        console.log("rwe", e.format("YYYY-MM-DD"));
                        setAcadmicForm((pre) => ({
                          ...pre,
                          OrganizationTenurefrom: e.format("YYYY-MM-DD")
                        }));
                      }}
                    />
                  </LocalizationProvider>
                </div>

                <div style={datePickerStyles}>
                  <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                    <DatePicker
                      label="Tenure to"
                      onChange={(e) => {
                        console.log("rwe", e.format("YYYY-MM-DD"));
                        setAcadmicForm((pre) => ({
                          ...pre,
                          OrganizationTenureTo: e.format("YYYY-MM-DD")
                        }));
                      }}
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
              margin: "20px 0px"
            }}
          >

            {/* <Button
              style={{ marginLeft: "20px" }}
              color="primary"
              variant="contained"
              onClick={DoneOrganization}
            >
              <Icon>done</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Save</Span>
            </Button> */}
          </div>

        </div>
      </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px"
          }}
        >
          <Button color="primary" variant="contained" type="submit">
            <Span sx={{ pl: 3, textTransform: "capitalize" }}>Save & Continue</Span>
            <Icon>navigate_next</Icon>
          </Button>
        </div>
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
    </div>
  );
}

export default AcademicForm;
