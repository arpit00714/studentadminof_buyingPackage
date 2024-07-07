import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "moment/locale/de";
import { Autocomplete, Button, Grid, Icon, styled } from "@mui/material";
import { H3, Span } from "app/components/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import NavigateNextSharpIcon from "@mui/icons-material/NavigateNextSharp";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Fragment } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { persnoaldetails, persnoaldetailsupdate, studentData } from "Apis/Persnoldetailsform";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { SimpleCard } from "app/components";
import { filesupload } from "Apis/filesupload";
import { useEffect } from "react";
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
  width: "100%",
  marginBottom: "16px"
};
function UgAcadamicform(props) {
  const isFormFiled = props.userData;
  const [filedopen, setfiledOpen] = useState(true);
  const navigation = useNavigate();
  const [acadmicform, setAcadmicForm] = useState({ date: new Date() });
  const [sscmarksheet, setSscmarksheet] = useState("");
  const [ninthmarksheet, setninthmarksheet] = useState("");
  const [eleventhmaksheet, seteleventmarksheet] = useState("");
  const [hscmarksheet, setHscmarksheet] = useState("");
  const [Journalscertificate, setJournalscertificate] = useState("");
  const [addspecializedcourses, setSpecializedcourses] = useState("");
  const [addsoftwareused, setSoftwareused] = useState("");
  const [addcomputerlangauge, setComputerlangauge] = useState("");
  const [addsportsactivity, setaddSportsactivity] = useState("");
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
  const [OrganizationData, setOrganizationData] = useState([]);
  const [AcadmicDetailsData, SetAcademicDetailsData] = useState([]);
  const userID = localStorage.getItem("userID");
  console.log("userID", userID);
  const [open, setOpen] = useState(false);
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
        // console.log("useEffectrespdata", data.message[0]?.examtype)
      }
    };
    check();
  }, [userID]);

  console.log("userexamType", userexamType);
  const {
    ninthexam,
    ninthborad,
    ninthinstitute,
    ninthmarksheet1,
    hscmarksheet1,
    eleventhmaksheet1,
    Journalscertificate1,
    sscmarksheet1,
    ninthaggregtatescore,
    ninthsubject,
    ninthmarkrsheet,
    eleventhhexam,
    eleventhhborad,
    eleventhhinstitute,
    eleventhhaggregtatescore,
    eleventhhsubject,
    eleventhmarksheet,
    sscexam,
    sscborad,
    sscinstitute,
    sscaggregtatescore,
    sscsubject,
    sscyear,
    sscmarkrsheet,
    hscexam,
    hscborad,
    hscinstitute,
    hscaggregtatescore,
    hscsubject,
    hhcmarksheet,
    hscyear,
    instituename,
    degree,
    branch,
    yearofInception,
    yearofpassing,
    cgpaPercentage,
    cgpaPercentageoutof,
    ProvisionalDegree,
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
    postbacksubjects,
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
    junoralpublicationing,
    honorsummery,
    honoreventname,
    Organizationname,
    OrganizationDesignation,
    Organizationsummary,
    softwareused,
    computerlanguageknown,
    sportsactivity
  } = acadmicform;

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

  // const handleaddgradution = () => {
  //   setCgpaPercentageList([...cgpaPercentageList, ""]);
  // };

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

  const handleaddspecializedcourses = () => {
    setspcoursebtn(true);
    if (addspecializedcourses !== "") {
      setNewaddspecializedcourses([...newaddspecializedcourses, addspecializedcourses]);
      setSpecializedcourses("");
    }
  };

  const [spcoursebtn, setspcoursebtn] = useState(true);
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

  console.log("newsportsActivity", newsportsActivity);
  const handlesportsDelete = (index) => {
    const updatedList = [...newsportsActivity];
    updatedList.splice(index, 1);
    setNewsportsActivity(updatedList);
  };

  // // academicprojectdata
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
  // academicprojectdata

  const handleChange = (event, index) => {
    const updatedList = [...cgpaPercentageList];
    updatedList[index] = event.target.value;

    setCgpaPercentageList(updatedList);
    event.persist();
    setAcadmicForm({ ...acadmicform, [event.target.name]: event.target.value });
  };
  // ninthmarkrsheet
  const onselectninthmarksheet = async (event) => {
    const file = event.target.files[0];
    const fd = new FormData();
    fd.append("student_ninthmarksheet", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    acadmicform.ninthmarkrsheet = data[0].filename;
    setAcadmicForm({ ...acadmicform, [event.target.name]: event.target.value });
    const fileName = file.name;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setninthmarksheet(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("Selected file:", file);
    console.log("File name:", fileName);
  };
  // 10th marksheet
  const onselectsscmarksheet = async (event) => {
    const file = event.target.files[0];
    const fd = new FormData();
    fd.append("student_sscmarksheet", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    acadmicform.sscmarkrsheet = data[0].filename;
    setAcadmicForm({ ...acadmicform, [event.target.name]: event.target.value });
    const fileName = file.name;
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
  // 11th marksheet
  const onselecteleventhcmarksheet = async (event) => {
    const file = event.target.files[0];
    const fd = new FormData();
    fd.append("student_eleventhmarksheet", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    acadmicform.eleventhmarksheet = data[0].filename;
    setAcadmicForm({ ...acadmicform, [event.target.name]: event.target.value });
    const fileName = file.name;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        seteleventmarksheet(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("Selected file:", file);
    console.log("File name:", fileName);
  };
  // 12th marksheet
  const onselectHscmarksheet = async (event) => {
    const file = event.target.files[0];
    const fd = new FormData();
    fd.append("student_hhcmarksheet", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    acadmicform.hhcmarksheet = data[0].filename;
    setAcadmicForm({ ...acadmicform, [event.target.name]: event.target.value });
    const fileName = file.name; // Get the file name
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

  const onselectJournalscertificate = async (event) => {
    const file = event.target.files[0];
    const fd = new FormData();
    fd.append("student_junrol_certificate", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    acadmicform.junoralpublicationing = data[0].filename;
    setAcadmicForm({ ...acadmicform, [event.target.name]: event.target.value });
    const fileName = file.name;
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
          ninthexam,
          ninthborad,
          ninthinstitute,
          ninthaggregtatescore,
          ninthsubject,
          ninthmarkrsheet,
          ninthyearofpassing: acadmicform.classninthyearofpassing,
          sscexam,
          sscborad,
          sscinstitute,
          sscaggregtatescore,
          sscsubject,
          sscmarkrsheet,
          sscyear: acadmicform.classtenthyearofpassing,
          eleventhhexam,
          eleventhhborad,
          eleventhhinstitute,
          eleventhhaggregtatescore,
          eleventhhsubject,
          eleventhmarksheet,
          eleventpassingDate: acadmicform.classeleventhyearofpassing,
          hscexam,
          hscborad,
          hscinstitute,
          hscsubject,
          hscaggregtatescore,
          hhcyearofpassing: acadmicform.Hhcyearofpassing,
          hhcmarksheet,
          hscyear
        },
        Undergraduation: {
          instituename,
          degree,
          branch,
          yearofInception,
          yearofpassing,
          cgpaPercentage,
          cgpaPercentageoutof,
          postcgpaPercentage,
          postcgpaPercentageoutof,
          ProvisionalDegree,
          numberofback,
          backsubjects,
          yearlycgpa: cgpaPercentageList
        },
        postgradution: {
          postinstituename,
          postdegree,
          postbranch,
          postcgpaPercentage,
          postcgpaPercentageoutof,
          postyearofInception,
          postyearofpassing,
          postProvisionalDegree,
          postnumberofback,
          postbacksubjects,
          postyearlycgpa: postcgpaPercentageList
        },
        specialcourse: specialcourse,
        softwareused: softwareused,
        computerlanguage: computrtlang,
        sportsActivity: sports,
        Acadmicassesmint: updatedataacademic,
        Presentation: presentdata,
        // publication: {
        //   generalpublicationData
        // },
        // junoralpublicationing: junoralpublicationing,
        publication,
        honour: honorsdata,
        organization: organizedata
      }
    ]
    SetAcademicDetailsData([
      ...AcadmicDetailsData,
      {
        School: {
          ninthexam,
          ninthborad,
          ninthinstitute,
          ninthaggregtatescore,
          ninthsubject,
          ninthmarkrsheet,
          ninthyearofpassing: acadmicform.classninthyearofpassing,
          sscexam,
          sscborad,
          sscinstitute,
          sscaggregtatescore,
          sscsubject,
          sscmarkrsheet,
          sscyear: acadmicform.classtenthyearofpassing,
          eleventhhexam,
          eleventhhborad,
          eleventhhinstitute,
          eleventhhaggregtatescore,
          eleventhhsubject,
          eleventhmarksheet,
          eleventpassingDate: acadmicform.classeleventhyearofpassing,
          hscexam,
          hscborad,
          hscinstitute,
          hscsubject,
          hscaggregtatescore,
          hhcyearofpassing: acadmicform.Hhcyearofpassing,
          hhcmarksheet,
          hscyear
        },
        Undergraduation: {
          instituename,
          degree,
          branch,
          yearofInception,
          yearofpassing,
          cgpaPercentage,
          cgpaPercentageoutof,
          postcgpaPercentage,
          postcgpaPercentageoutof,
          ProvisionalDegree,
          numberofback,
          backsubjects,
          yearlycgpa: cgpaPercentageList
        },
        postgradution: {
          postinstituename,
          postdegree,
          postbranch,
          postcgpaPercentage,
          postcgpaPercentageoutof,
          postyearofInception,
          postyearofpassing,
          postProvisionalDegree,
          postnumberofback,
          postbacksubjects,
          postyearlycgpa: postcgpaPercentageList
        },
        specialcourse: newaddspecializedcourses,
        softwareused: newsoftwarestatus,
        computerlanguage: newcomputrlanguageknown,
        sportsActivity: newsportsActivity,
        Acadmicassesmint: academicprojectdata,
        Presentation: presentationData,
        publication: {
          generalpublicationData
        },
        junoralpublicationing: junoralpublicationing,
        honour: honourData,
        organization: OrganizationData
      }
    ]);
    if (AcadmicDetailsData) {
      setOpen(true);
    }
    // if (AcadmicDetailsData) {
    //   try {
    //     const resp = await persnoaldetailsupdate(
    //       {
    //         AcademicDetailstatus: "done",
    //         AcademicDetailform: JSON.stringify(AcadmicDetailsData)
    //       },
    //       1
    //     );
    //     console.log("resp", resp);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  };

  console.log("AcadmicDetailsData", AcadmicDetailsData);
  const handleClose = async () => {
    // if (userexamType === "Ug") {
    //   navigation("/student/material/Exams");
    // } else {
    //   navigation("/student/material/compatativeExam");
    // }
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
          console.log("userexamType", userexamType);
          if (userexamType === "Ug") {
            navigation("/student/material/Exams");
          } else {
            navigation("/student/material/CompatativeExam");
          }
        }
        console.log("resp", resp);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <SimpleCard title="School">
          <Grid></Grid>
          {/* <H3>School</H3> */}
          {/* 9th*/}
          <Grid container spacing={6}>
            {/* 9th */}
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <h4>9th</h4>
              <TextField
                type="text"
                name="ninthexam"
                label="EXAMINATION  (9th)"
                onChange={handleChange}
                value={ninthexam || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextField
                type="text"
                name="ninthborad"
                label="Board"
                onChange={handleChange}
                value={ninthborad || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextField
                type="text"
                name="ninthinstitute"
                label="Institute"
                onChange={handleChange}
                value={ninthinstitute || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextField
                type="number"
                name="ninthaggregtatescore"
                label="Aggregate Score"
                onChange={handleChange}
                value={ninthaggregtatescore || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextField
                type="text"
                name="ninthsubject"
                label="Subject"
                onChange={handleChange}
                value={ninthsubject || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <div style={datePickerStyles}>
                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                  <DatePicker
                    //   views={["year"]}
                    label="Year Of Passing"
                    maxDate={moment()} // Set the maxDate to the current date
                    //   minDate={moment().subtract(100, "years")}
                    onChange={(e) => {
                      setAcadmicForm((pre) => ({
                        ...pre,
                        classninthyearofpassing: e.format("YYYY-MM-DD")
                      }));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
              9th Marksheet
              <TextField type="file" onChange={onselectninthmarksheet} name="ninthmarksheet1" value={ninthmarksheet1} validators={["required"]}
                errorMessages={["this field is required"]} />
              {ninthmarksheet && (
                <img
                  src={ninthmarksheet}
                  alt="dvd"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              )}
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <h4>10th</h4>
              <TextField
                type="text"
                name="sscexam"
                label="EXAMINATION  ( HSC-12th )"
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
                    //   views={["year"]}
                    label="Year Of Passing"
                    maxDate={moment()} // Set the maxDate to the current date
                    //   minDate={moment().subtract(100, "years")}
                    onChange={(e) => {
                      setAcadmicForm((pre) => ({
                        ...pre,
                        classtenthyearofpassing: e.format("YYYY-MM-DD")
                      }));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
              Ssc Marksheet
              <TextField type="file" name="sscmarksheet1" onChange={onselectsscmarksheet} value={sscmarksheet1} validators={["required"]}
                errorMessages={["this field is required"]} />
              {sscmarksheet && (
                <img
                  src={sscmarksheet}
                  alt="dvd"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              )}
            </Grid>
          </Grid>
          <Grid></Grid>
          {/* 11th 12th */}
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <h4>11th</h4>
              <TextField
                type="text"
                name="eleventhhexam"
                label="EXAMINATION  (11th)"
                onChange={handleChange}
                value={eleventhhexam || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextField
                type="text"
                name="eleventhhborad"
                label="Board"
                onChange={handleChange}
                value={eleventhhborad || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextField
                type="text"
                name="eleventhhinstitute"
                label="Institute"
                onChange={handleChange}
                value={eleventhhinstitute || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextField
                type="number"
                name="eleventhhaggregtatescore"
                label="Aggregate Score"
                onChange={handleChange}
                value={eleventhhaggregtatescore || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextField
                type="text"
                name="eleventhhsubject"
                label="Subject"
                onChange={handleChange}
                value={eleventhhsubject || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <div style={datePickerStyles}>
                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                  <DatePicker
                    //   views={["year"]}
                    label="Year Of Passing"
                    maxDate={moment()} // Set the maxDate to the current date
                    //   minDate={moment().subtract(100, "years")}
                    onChange={(e) => {
                      setAcadmicForm((pre) => ({
                        ...pre,
                        classeleventhyearofpassing: e.format("YYYY-MM-DD")
                      }));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
              11th Marksheet
              <TextField type="file" name="eleventhmaksheet1" onChange={onselecteleventhcmarksheet} value={eleventhmaksheet1} validators={["required"]}
                errorMessages={["this field is required"]} />
              {eleventhmaksheet && (
                <img
                  src={eleventhmaksheet}
                  alt="dvd"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              )}
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <h4>12th</h4>
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
                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en">
                  <DatePicker
                    //   views={["year"]}
                    label="Year Of Passing"
                    maxDate={moment()} // Set the maxDate to the current date
                    //   minDate={moment().subtract(100, "years")}
                    onChange={(e) => {
                      setAcadmicForm((pre) => ({
                        ...pre,
                        Hhcyearofpassing: e.format("YYYY-MM-DD")
                      }));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
              Hsc Marksheet
              <TextField type="file" name="hscmarksheet1" onChange={onselectHscmarksheet} value={hscmarksheet1} validators={["required"]}
                errorMessages={["this field is required"]} />
              {hscmarksheet && (
                <img
                  src={hscmarksheet}
                  alt="dvd"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              )}
            </Grid>
          </Grid>
          <Grid></Grid>
        </SimpleCard>

        {/* <div style={{ margin: "20px 0px" }}>
          <SimpleCard title="Undergraduation">
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
                  type="text"
                  name="numberofback"
                  label="Number of back( If any)"
                  onChange={handleChange}
                  value={numberofback || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                upload Semester Marksheets or Yearly Marksheets
                <TextField type="file" name="student Image" onChange={onuploadsemmarksheet} />
                {uploadedsememarksheet && (
                  <img
                    src={uploadedsememarksheet}
                    alt="dvd"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                )}
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  {cgpaPercentageList.map((cgpa, index) => (
                    <Grid
                      item
                      xs={12}
                      key={index}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <TextField
                        type="text"
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
                <TextField
                  type="text"
                  name="yearofInception"
                  label="YEAR of Inceptio"
                  onChange={handleChange}
                  value={yearofInception || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextField
                  type="text"
                  name="yearofpassing"
                  label="YEAR of passing "
                  onChange={handleChange}
                  value={yearofpassing || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
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
                <TextField
                  type="text"
                  name="ProvisionalDegree"
                  label="Provisional Degree"
                  onChange={handleChange}
                  value={ProvisionalDegree || ""}
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
                Upload Provisional degree / Degree
                <TextField type="file" name="student Image" onChange={onuploadedprovisional} />
                {uploadedprovisinoal && (
                  <img
                    src={uploadedprovisinoal}
                    alt="dvd"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                )}
              </Grid>
            </Grid>
          </SimpleCard>
        </div>

        <SimpleCard title="Post graduation">
          <Grid style={{ marginTop: "20px" }}></Grid>
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
                type="text"
                name="postnumberofback"
                label="Number of back( If any)"
                onChange={handleChange}
                value={postnumberofback || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              upload Semester Marksheets or Yearly Marksheets
              <TextField type="file" name="student Image" onChange={uploadpostsemestermarksheet} />
              {uploadedsemePostmarksheet && (
                <img
                  src={uploadedsemePostmarksheet}
                  alt="dvd"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              )}
              {postcgpaPercentageList.map((cgpa, index) => {
                return (
                  <Grid item xs={12} key={index} style={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      type="text"
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
              <TextField
                type="text"
                name="postyearofInception"
                label="YEAR of Inceptio"
                onChange={handleChange}
                value={postyearofInception || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextField
                type="text"
                name="postyearofpassing"
                label="YEAR of passing "
                onChange={handleChange}
                value={postyearofpassing || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
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
              <TextField
                type="text"
                name="postProvisionalDegree"
                label="Provisional Degree"
                onChange={handleChange}
                value={postProvisionalDegree || ""}
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
              Upload Provisional degree / Degree
              <TextField type="file" name="student Image" onChange={onuploadedpostprovisional} />
              {uploadedpostprovisinoal && (
                <img
                  src={uploadedpostprovisinoal}
                  alt="dvd"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              )}
            </Grid>
          </Grid>
        </SimpleCard> */}

        <Grid style={{ marginTop: "20px" }}></Grid>

        <div style={{ display: "flex" }}>
          <H3>Specialized Courses Undertaken</H3>
          <Button style={{ marginLeft: "20px" }} color="primary" variant="contained" onClick={handleaddspecializedcourses}>
            <Icon>add</Icon>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
          </Button>
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
              {/* <Button onClick={handleaddspecializedcourses} color="primary" variant="contained">
                <Icon>add</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
              </Button> */}
              {/* {addspecializedcourses !== "" && (
                <Button
                  style={{ marginLeft: "20px" }}
                  onClick={handleDonespecializedcourses}
                  color="primary"
                  variant="contained"
                >
                  <Icon>done</Icon>
                  <Span sx={{ pl: 1, textTransform: "capitalize" }}>Done</Span>
                </Button>
              )} */}
            </div>
          </Grid>
        </Grid>

        <Grid style={{ marginTop: "20px" }}></Grid>

        <div style={{ display: "flex" }}>
          <H3>Software Used</H3>
          <Button style={{ marginLeft: "20px" }} color="primary" variant="contained" onClick={handlesoftwareused}>
            <Icon>add</Icon>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
          </Button>
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
              {/* <Button onClick={handlesoftwareused} color="primary" variant="contained">
                <Icon>add</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
              </Button> */}
              {/* {addsoftwareused !== "" && (
                <Button
                  style={{ marginLeft: "20px" }}
                  onClick={handledonesoftwareused}
                  color="primary"
                  variant="contained"
                >
                  {" "}
                  <Icon>done</Icon>
                  <Span sx={{ pl: 1, textTransform: "capitalize" }}>Done</Span>
                </Button>
              )} */}
            </div>
          </Grid>
        </Grid>

        <Grid style={{ marginTop: "20px" }}></Grid>

        <div style={{ display: "flex" }}>
          <H3>Computer Language Known</H3>
          <Button style={{ marginLeft: "20px" }} color="primary" variant="contained" onClick={handlecomputerlanguageknown}>
            <Icon>add</Icon>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
          </Button>
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
              {/* <Button onClick={handlecomputerlanguageknown} color="primary" variant="contained">
                <Icon>add</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
              </Button> */}
              {/* {addcomputerlangauge !== "" && (
                <Button
                  style={{ marginLeft: "20px" }}
                  onClick={handledonecomputerlanguageknown}
                  color="primary"
                  variant="contained"
                >
                  <Icon>done</Icon>
                  <Span sx={{ pl: 1, textTransform: "capitalize" }}>Done</Span>
                </Button>
              )} */}
            </div>
          </Grid>
        </Grid>

        <Grid style={{ marginTop: "20px" }}></Grid>
        <div style={{ display: "flex" }}>
          <H3>Sport Activity </H3>
          <Button style={{ marginLeft: "20px" }} color="primary" variant="contained" onClick={handlesportsactivity}>
            <Icon>add</Icon>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
          </Button>
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
              {/* <Button onClick={handlesportsactivity} color="primary" variant="contained">
                <Icon>add</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
              </Button> */}
              {/* {addsportsactivity !== "" && (
                <Button
                  style={{ marginLeft: "20px" }}
                  onClick={handledonesportsactivity}
                  color="primary"
                  variant="contained"
                >
                  <Icon>done</Icon>
                  <Span sx={{ pl: 1, textTransform: "capitalize" }}>Done</Span>
                </Button>
              )} */}
            </div>
          </Grid>
        </Grid>

        <div style={{ margin: "20px 0px" }}>
          <SimpleCard >
            <div style={{ display: "flex" }}>
              <H3>Academic Assignment</H3>
              <Button style={{ marginLeft: "20px" }} color="primary" variant="contained" onClick={handleDoneAcademicAssignment}>
                <Icon>add</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
              </Button>
            </div>
            <Grid style={{ marginTop: "20px" }}></Grid>
            {/* <H3>Academic Assignment</H3> */}

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
                {/* <Button onClick={handleaddAcademicAssignment} color="primary" variant="contained">
                  <Icon>add</Icon>
                  <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
                </Button> */}
                {/* <Button
                  style={{ marginLeft: "20px" }}
                  onClick={handleDoneAcademicAssignment}
                  color="primary"
                  variant="contained"
                >
                  <Icon>done</Icon>
                  <Span sx={{ pl: 1, textTransform: "capitalize" }}>Done</Span>
                </Button> */}
              </div>
            )}
          </SimpleCard>
        </div>

        <SimpleCard >
          <div style={{ display: "flex" }}>
            <H3>Presentation</H3>
            <Button style={{ marginLeft: "20px" }} color="primary" variant="contained" onClick={handleaddPresentation}>
              <Icon>add</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
            </Button>
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

          <div
            style={{ width: "100%", display: "flex", justifyContent: "center", margin: "20px 0px" }}
          >
            {/* <Button onClick={handleaddPresentation} color="primary" variant="contained">
              <Icon>add</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
            </Button> */}
            {/* <Button
              style={{ marginLeft: "20px" }}
              onClick={handleDonePresentation}
              color="primary"
              variant="contained"
            >
              <Icon>done</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Done</Span>
            </Button> */}
          </div>
        </SimpleCard>

        <div style={{ margin: "20px 0px" }}>
          <SimpleCard >
            <div style={{ display: "flex" }}>
              <H3>Journals/publication</H3>
              <Button style={{ marginLeft: "20px" }} color="primary" variant="contained" onClick={addGeneralpublication}>
                <Icon>add</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
              </Button>
            </div>
            <Grid></Grid>

            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                Upload the certificate
                <TextField
                  type="file"
                  name="Journalscertificate1"
                  value={Journalscertificate1}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  onChange={onselectJournalscertificate}
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
              {/* <Button color="primary" variant="contained" onClick={addGeneralpublication}>
                <Icon>add</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
              </Button> */}
              {/* <Button
                style={{ marginLeft: "20px" }}
                color="primary"
                variant="contained"
                onClick={DoneGeneralpublication}
              >
                <Icon>done</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Done</Span>
              </Button> */}
            </div>
          </SimpleCard>
        </div>

        <SimpleCard >
          <div style={{ display: "flex" }}>
            <H3>Honours And Achievements</H3>
            <Button style={{ marginLeft: "20px" }} color="primary" variant="contained" onClick={addHonours}>
              <Icon>add</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
            </Button>
          </div>
          <Grid></Grid>
          {/* <H3>Honours And Achievements</H3> */}
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
            {/* <Button color="primary" variant="contained" onClick={addHonours}>
              <Icon>add</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
            </Button> */}
            {/* <Button
              style={{ marginLeft: "20px" }}
              color="primary"
              variant="contained"
              onClick={DoneHonours}
            >
              <Icon>done</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Done</Span>
            </Button> */}
          </div>
        </SimpleCard>

        <div style={{ margin: "20px 0px" }}>
          <SimpleCard >
            <div style={{ display: "flex" }}>
              <H3>Member Of Organization</H3>
              <Button style={{ marginLeft: "20px" }} color="primary" variant="contained" onClick={addOrganization}>
                <Icon>add</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
              </Button>
            </div>

            <Grid></Grid>
            {/* <H3>Member Of Organization </H3> */}

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
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Done</Span>
              </Button> */}
            </div>
          </SimpleCard>
        </div>
        {!isFormFiled && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "20px"
            }}
          >
            <Button color="primary" variant="contained" type="submit">
              <Span sx={{ pl: 3, textTransform: "capitalize" }}>Next & Continue</Span>
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
        <DialogTitle id="alert-dialog-title">{"Submited!! You Can Edit It Any Time"}</DialogTitle>
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
export default UgAcadamicform;
