import React, { useState } from "react";
import { H3,Span } from "app/components/Typography";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField, Button, Grid, styled, DialogTitle } from "@mui/material";
import apiUrl from "URLS/ApiUrl";
import { filesupload } from "Apis/filesupload";
import { persnoaldetailsupdate } from "Apis/Persnoldetailsform";
import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  Icon,
  Radio,
  RadioGroup,
} from "@mui/material";
const TextFieldValidator = styled(TextField)(() => ({
  width: "100%",
  marginBottom: "16px"
}));

function Persnoldetailspre(props) {
  const initialData = props.userData[0];
  const [parentsList, SetParentsList] = useState([]);
  const [state, setState] = useState({ date: new Date() });
  const countryvisitData = {
    visa: {
      isvisarejected: 'no',
      isothercountryvisited: 'yes',
      visitedsumary: [
        { where: '', dateofentry: '', dateofexit: '' }
      ]
    }
  };
  console.log("rejectionreason", initialData.visa.rejectionreason)
  console.log("visarejectDate", initialData.visa.visarejectDate)
  console.log("visitedsumary", initialData.visa.visitedsumary)
  console.log("isvisarejected", initialData.visa.isvisarejected)
  const isFormFiled = props.formstatus;
  const formstatus = props.formstatus
  const [filedopen, setfiledOpen] = useState(true);
  const Basic = initialData?.Basic || {};
  const BirthDetails = initialData?.BirthDetails || {};
  const passportandvisa = initialData?.passportandvisa || {}
  console.log("passportandvisa", passportandvisa)
  const visa = initialData?.visa || {};
  const parentsdetails = initialData?.parentsdetails || {};
  const havesibling = initialData?.havesibling || {};
  const SiblingsList = initialData?.SiblingsList || [];
  console.log("visa", visa)
  const [open, setOpen] = useState(false);
  const [rejectreason, setRejectedreason] = useState(initialData.visa.rejectionreason)
  const [rejectreasondate, rejectedreasondate] = useState(initialData.visa.visarejectDate)
  const [editpage, setEditPage] = useState(false);
  const [basicData, setBasicData] = useState(Basic);
  const [birthDetails, setBirthDetails] = useState(BirthDetails);
  const [passportVisa, setPassportVisa] = useState(passportandvisa);
  const [studentupdateData, setStudentUpdateData] = useState([])
  const [parentsDetails, setParentsDetails] = useState(parentsdetails);
  const [siblingsList, setSiblingsList] = useState(SiblingsList);
  const [countryvisitdata, setCountryvisitData] = useState(initialData.visa.visitedsumary);
  const [studentImage, setStudentImage] = useState("");
  const [passfront, setpassfront] = useState("")
  const [passback, setpassback] = useState("")
  const userID = localStorage.getItem("userID");
  const [studentImageAdhar, setStudentImageAdhar] = useState("");
  const [studentbirthcertificate, StudentbirthCertificate] = useState("");
  const [userVisa, SetUserVisa] = useState(visa)
  // add
  const [showparentmore, setShowparentaddmore] = useState(true);
  // 
  const {
    address,
    firstName,
    city,
    selectedstate,
    Country,
    pincode,
    basicstudentimage,
    basicstudentimage1,
    basicstuadharimage,
    basicstuadharimage1,
    dateofbirth,
    cityofbirth,
    stateofbirth,
    countyofbirth,
    birthcertificate,
    birthcertificate1,
    PassportNumber,
    placeofissue,
    passportrejectionreason,
    passportfrontimage,
    passportfrontimage1,
    passportbackimage,
    passportbackimage1,
    wherecountyvisited,
    parentrelation,
    emailofparents,
    phonenumberofparents,
    levelofeducation,
    degreename,
    universityname,
    professionofparents,
    Designation,
    nameofsibiling,
    relationwithsibling,
    educationlevelofsibling,
    universityofsibling,
    countryofsibling
  } = state;


  const handleparentsList = (index) => {
    const updateparentslist = [...parentsList];
    updateparentslist.splice(index, 1);
    SetParentsList(updateparentslist);
  };
  // 

  console.log("countryvisitdata", countryvisitdata)
  if (props.userData.length === 0) {
    return null;
  }

  console.log("parentsDetails", parentsDetails)
  const handleInputChange = (section, index, field, value) => {
    switch (section) {
      case "basic":
        setBasicData({ ...basicData, [field]: value });
        break;
      case "birth":
        setBirthDetails({ ...birthDetails, [field]: value });
        break;
      case "passportVisa":
        setPassportVisa({ ...passportVisa, [field]: value });
        break;
      case "parents":
        setParentsDetails(prevParentsDetails => {
          const updatedParentsDetails = [...prevParentsDetails]; // Create a copy of the array
          const updatedItem = { ...updatedParentsDetails[index], [field]: value }; // Update the specific object
          updatedParentsDetails[index] = updatedItem; // Update the array with the modified object
          return updatedParentsDetails;
        });
        break;
      case "siblings":
        setSiblingsList(prevParentsDetails => {
          const updatedParentsDetails = [...prevParentsDetails]; // Create a copy of the array
          const updatedItem = { ...updatedParentsDetails[index], [field]: value }; // Update the specific object
          updatedParentsDetails[index] = updatedItem; // Update the array with the modified object
          return updatedParentsDetails;
        });
        break;
      case "countryvisit":
        setCountryvisitData(countrylist => {
          const updatedParentsDetails = [...countrylist]; // Create a copy of the array
          const updatedItem = { ...updatedParentsDetails[index], [field]: value }; // Update the specific object
          updatedParentsDetails[index] = updatedItem; // Update the array with the modified object
          return updatedParentsDetails;
        });
        break;
      case "dateofreject":
        rejectedreasondate(value);
        break;
      case "rejectreason":
        setRejectedreason(value);
        break;
      default:
        break;
    }
  };
  console.log("countryvisitdata", countryvisitdata)
   
  // addmore form
  const HandleAddParents = () => {
    if (parentsdetails !== "") {
      SetParentsList([
        ...parentsList,
        {
          parentsdetails,
          parentrelation,
          emailofparents,
          phonenumberofparents,
          levelofeducation,
          degreename,
          universityname,
          Designation,
          yearofworking: state.parentsyearofworkingsince,
          yearofpassing: state.parentsyearofpassing,
          professionofparents
        }
      ]);
      state.parentsdetails = "";
      state.parentrelation = "";
      state.emailofparents = "";
      state.phonenumberofparents = "";
      state.levelofeducation = "";
      state.degreename = "";
      state.universityname = "";
      state.Designation = "";
      state.professionofparents = "";
      setShowparentaddmore(false);
    }
  };

  const HandleAddmoreParents = () => {
    if (parentsdetails) {
      SetParentsList([
        ...parentsList,
        {
          parentsdetails,
          parentrelation,
          emailofparents,
          phonenumberofparents,
          levelofeducation,
          degreename,
          universityname,
          Designation,
          yearofworking: state.parentsyearofworkingsince,
          yearofpassing: state.parentsyearofpassing,
          professionofparents
        }
      ]);
      state.parentsdetails = "";
      state.parentrelation = "";
      state.emailofparents = "";
      state.phonenumberofparents = "";
      state.levelofeducation = "";
      state.degreename = "";
      state.universityname = "";
      state.Designation = "";
      state.professionofparents = "";
    }
    setShowparentaddmore(true);
  };
  // 
  const handlestudentbasicimg = async (event) => {
    const file = event.target.files[0]; // Get the first file selected
    const fd = new FormData();
    fd.append("student_image", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    basicData.basicstudentimage = data[0].filename;
    const fileName = file.name; // Get the file name
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setStudentImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }


  const handlestudentAdharImage = async (event) => {
    const file = event.target.files[0]; // Get the first file selected
    const fd = new FormData();
    fd.append("student_adhar_image", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    basicData.basicstuadharimage = data[0].filename;
    const fileName = file.name; // Get the file name
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setStudentImageAdhar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }


  const handlebirthcertificate = async (event) => {
    const file = event.target.files[0]; // Get the first file selected
    const fd = new FormData();
    fd.append("birthcertificate", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    birthDetails.birthcertificate = data[0].filename;
    const fileName = file.name; // Get the file name
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        StudentbirthCertificate(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }


  const handlePassportfront = async (event) => {
    const file = event.target.files[0]; // Get the first file selected
    const fd = new FormData();
    fd.append("passportfrontimage", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    passportVisa.passportfrontimage = data[0].filename;
    const fileName = file.name; // Get the file name
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setpassfront(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }


  const handlePassportBack = async (event) => {
    const file = event.target.files[0]; // Get the first file selected
    const fd = new FormData();
    fd.append("passportbackimage", file);
    const data = await filesupload(fd);
    console.log("data", data);
    console.log("data[0].filename", data[0].filename);
    passportVisa.passportbackimage = data[0].filename;
    const fileName = file.name; // Get the file name
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setpassback(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
  console.log("rejectreasondate", rejectreasondate)

  const handleFileChange = async (section, field, event) => {
    const file = event.target.files[0];
    if (file) {
      const fd = new FormData();
      fd.append("file", file);
      const data = await filesupload(fd);
      const filename = data[0].filename;

      switch (section) {
        case "basic":
          setBasicData({ ...basicData, [field]: filename });
          break;
        case "basicstuadharimage":
          setBasicData({ ...basicData, [field]: filename });
          break;
        case "passportVisa":
          setPassportVisa({ ...passportVisa, [field]: filename });
          break;
        case "parents":
          setParentsDetails((prevParentsDetails) => ({
            ...prevParentsDetails,
            [field]: event
          }));
          // setParentsDetails({ ...parentsDetails, [field]: filename });
          break;
        case "siblings":
          const updatedSiblings = siblingsList.map((sibling, index) =>
            index === field.index ? { ...sibling, [field.key]: filename } : sibling
          );
          setSiblingsList((prevParentsDetails) => ({
            ...prevParentsDetails,
            [field]: event
          }));
          break;
        default:
          break;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (section === "basic") setStudentImage(reader.result);
        // if (section === "basicstuadharimage") setStudentImageAdhar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Add save logic here
    setOpen(true)
    setStudentUpdateData([
      ...studentupdateData,
      {
        Basic: basicData,
        BirthDetails: birthDetails,
        passportandvisa: passportVisa,
        visa: {
          ...initialData.visa,
          visitedsumary: countryvisitdata,
          visarejectDate: rejectreasondate,
          rejectionreason: rejectreason
        },
        parentsdetails: parentsDetails,
        SiblingsList: SiblingsList,
      }
    ]);
  };

  const handleClose = async () => {
    console.log("persnoldetailsSubmitedData", studentupdateData);
    // setOpen(false);
    try {
      console.log("userIDSS", userID);
      const resp = await persnoaldetailsupdate(
        {
          persnoldetailsform: JSON.stringify(studentupdateData)
        },
        userID
      );
      console.log("resp", resp);
      if (resp.status === 200) {
        setOpen(false);
        window.location.reload();
        // SetPersnoldetailsData({});
        // if (userexamType === "Ug") {
        //   navigation("/student/material/UgAcademic");
        // } else {
        //   navigation("/student/material/Academicdetails");
        // }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {!formstatus && <div>
        <Button color="primary" variant="contained" onClick={() => setEditPage(!editpage)}>
          {editpage ? "Cancel" : "Edit"}
        </Button>
        </div>}
        
      <br />
        <div style={{ border:"2px solid #00000080",padding:"20px",marginBottom:"20px"}}>

      <H3>Basic Details</H3>
      <Grid container spacing={6}>
        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
          <TextFieldValidator
            type="text"
            name="firstName"
            label="Name"
            value={basicData.firstName || ""}
            disabled={!editpage}
            onChange={(e) => handleInputChange("basic", null, "firstName", e.target.value)}
          />
          <TextFieldValidator
            type="text"
            name="address"
            label="Address"
            value={basicData.address || ""}
            disabled={!editpage}
            onChange={(e) => handleInputChange("basic", null, "address", e.target.value)}
          />
          <TextFieldValidator
            type="text"
            name="pincode"
            label="Pincode"
            value={basicData.pincode || ""}
            disabled={!editpage}
            onChange={(e) => handleInputChange("basic", null, "pincode", e.target.value)}
          />
          <div>
            <p>Student Image</p>
            {editpage ? (
              <TextFieldValidator
                type="file"
                name="studentImage"
                onChange={(e) => handlestudentbasicimg(e)}
              />
            ) : (

              <img src={`${apiUrl}/api/${basicData.basicstudentimage}`} alt="Student" style={{ maxWidth: "100px", maxHeight: "100px" }} />
            )}
            {studentImage && (
              <img src={studentImage} alt="Student" style={{ maxWidth: "100px", maxHeight: "100px" }} />
            )}
          </div>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
          <TextFieldValidator
            type="text"
            name="city"
            label="City"
            value={basicData.city || ""}
            disabled={!editpage}
            onChange={(e) => handleInputChange("basic", null, "city", e.target.value)}
          />
          <TextFieldValidator
            type="text"
            name="selectedstate"
            label="State"
            value={basicData.selectedstate || ""}
            disabled={!editpage}
            onChange={(e) => handleInputChange("basic", null, "selectedstate", e.target.value)}
          />
          <TextFieldValidator
            type="text"
            name="Country"
            label="Country"
            value={basicData.Country || ""}
            disabled={!editpage}
            onChange={(e) => handleInputChange("basic", null, "Country", e.target.value)}
          />
          <div>

            <p>Aadhar Card Image</p>
            {editpage ? (
              <TextFieldValidator
                type="file"
                name="studentImage"
                onChange={(e) => handlestudentAdharImage(e)}
              />
            ) : (
              <img src={`${apiUrl}/api/${Basic.basicstuadharimage}`} alt="Aadhar" style={{ maxWidth: "100px", maxHeight: "100px" }} />
            )}
            {studentImageAdhar && (
              <img src={studentImageAdhar} alt="Student" style={{ maxWidth: "100px", maxHeight: "100px" }} />
            )}

          </div>
        </Grid>
      </Grid>
          </div>
       
        <div style={{ border:"2px solid #00000080",padding:"20px",marginBottom:"20px"}}>
      <H3>Birth Details</H3>
      <Grid container spacing={6}>
        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
          <TextFieldValidator
            type="date"
            name="DateofBIrth"
            label="Date of Birth"
            value={birthDetails.DateofBIrth || ""}
            disabled={!editpage}
            onChange={(e) => handleInputChange("birth", null, "DateofBIrth", e.target.value)}
          />
          <TextFieldValidator
            type="text"
            name="cityofbirth"
            label="City of Birth"
            value={birthDetails.cityofbirth || ""}
            disabled={!editpage}
            onChange={(e) => handleInputChange("birth", null, "cityofbirth", e.target.value)}
          />
          <TextFieldValidator
            type="text"
            name="stateofbirth"
            label="State of Birth"
            value={birthDetails.stateofbirth || ""}
            disabled={!editpage}
            onChange={(e) => handleInputChange("birth", null, "stateofbirth", e.target.value)}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
          <TextFieldValidator
            type="text"
            name="countyofbirth"
            label="Country of Birth"
            value={birthDetails.countyofbirth || ""}
            disabled={!editpage}
            onChange={(e) => handleInputChange("birth", null, "countyofbirth", e.target.value)}
          />
          <div>
            <p>Birth Certificate</p>
            {editpage ? (
              <TextFieldValidator
                type="file"
                name="studentImage"
                onChange={(e) => handlebirthcertificate(e)}
              />
            ) : (

              <img src={`${apiUrl}/api/${BirthDetails.birthcertificate}`} alt="Student" style={{ maxWidth: "100px", maxHeight: "100px" }} />
            )}
            {studentbirthcertificate && (
              <img src={studentbirthcertificate} alt="Student" style={{ maxWidth: "100px", maxHeight: "100px" }} />
            )}
            {/* <img src={`${apiUrl}/api/${BirthDetails.birthcertificate}`} alt="Birth Certificate" style={{ maxWidth: "100px", maxHeight: "100px" }} /> */}
          </div>
        </Grid>
      </Grid>
          </div>
      
          <div style={{ border:"2px solid #00000080",padding:"20px",marginBottom:"20px"}}>
      <H3>Passport & Visa</H3>
      <Grid container spacing={6}>
        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
          <TextFieldValidator
            type="text"
            name="passportnumber"
            label="Passport Number"
            value={passportVisa.PassportNumber || ""}
            disabled={!editpage}
            onChange={(e) => handleInputChange("passportVisa", null, "PassportNumber", e.target.value)}
          />
          <TextFieldValidator
            type="date"
            label="Date Of Issue"
            name="PassportdateofIssue"
            value={passportVisa.PassportdateofIssue || ""}
            disabled={!editpage}
            onChange={(e) => handleInputChange("passportVisa", null, "PassportdateofIssue", e.target.value)}
          />
          <TextFieldValidator
            type="date"
            name="Passportexpairdate"
            label="expiry Date"
            value={passportVisa.Passportexpairdate || ""}
            disabled={!editpage}
            onChange={(e) => handleInputChange("passportVisa", null, "Passportexpairdate", e.target.value)}
          />

        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
          <TextFieldValidator
            type="text"
            name="placeofissue"
            label="placeofissue"
            value={passportVisa.placeofissue || ""}
            disabled={!editpage}
            onChange={(e) => handleInputChange("passportVisa", null, "placeofissue", e.target.value)}
          />
          <div>
            <p>Passport Front Image</p>
            {editpage ? (
              <TextFieldValidator
                type="file"
                name="studentImage"
                onChange={(e) => handlePassportfront(e)}
              />
            ) : (

              <img src={`${apiUrl}/api/${passportVisa.passportfrontimage}`} alt="Student" style={{ maxWidth: "100px", maxHeight: "100px" }} />
            )}
            {passfront && (
              <img src={passfront} alt="Student" style={{ maxWidth: "100px", maxHeight: "100px" }} />
            )}

          </div>
          <div>
            <p>Passport Back Image</p>
            {editpage ? (
              <TextFieldValidator
                type="file"
                name="studentImage"
                onChange={(e) => handlePassportBack(e)}
              />
            ) : (

              <img src={`${apiUrl}/api/${passportVisa.passportbackimage}`} alt="Student" style={{ maxWidth: "100px", maxHeight: "100px" }} />
            )}
            {passback && (
              <img src={passback} alt="Student" style={{ maxWidth: "100px", maxHeight: "100px" }} />
            )}
            {/* <img src={`${apiUrl}/api/${passportVisa.passportbackimage}`} alt="Passport" style={{ maxWidth: "100px", maxHeight: "100px" }} /> */}
          </div>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
          {/* {visa?.map((item, index) => (
            <Grid container spacing={6} key={index}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextFieldValidator
                  type="text"
                  name={`countyname_${index}`}
                  label="Country Name"
                  value={item.countyname}
                  disabled={!editpage}
                  onChange={(e) => handleInputChange("passportVisa", { key: "countyname", index }, e.target.value)}
                />
                <TextFieldValidator
                  type="date"
                  name={`dateofarrival_${index}`}
                  label="Date of Arrival"
                  value={item.dateofarrival}
                  disabled={!editpage}
                  onChange={(e) => handleInputChange("passportVisa", { key: "dateofarrival", index }, e.target.value)}
                />
                <TextFieldValidator
                  type="date"
                  name={`dateofdeparture_${index}`}
                  label="Date of Departure"
                  value={item.dateofdeparture}
                  disabled={!editpage}
                  onChange={(e) => handleInputChange("passportVisa", { key: "dateofdeparture", index }, e.target.value)}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextFieldValidator
                  type="text"
                  name={`purposeofvisit_${index}`}
                  label="Purpose of Visit"
                  value={item.purposeofvisit}
                  disabled={!editpage}
                  onChange={(e) => handleInputChange("passportVisa", { key: "purposeofvisit", index }, e.target.value)}
                />
                <div>
                  <p>Visa Image</p>
                  {editpage ? (
                    <TextFieldValidator
                      type="file"
                      name={`visaimage_${index}`}
                      onChange={(e) => handleFileChange("passportVisa", { key: "visaimage", index }, e)}
                    />
                  ) : (
                    <img src={`${apiUrl}/api/${item.visaimage}`} alt="Visa" style={{ maxWidth: "100px", maxHeight: "100px" }} />
                  )}
                </div>
              </Grid>
            </Grid>
          ))} */}
        </Grid>
      </Grid>

      {initialData?.visa.isvisarejected === "yes" ? <>
        <H3 style={{ margin: "10px 0px" }}>Visa</H3>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextFieldValidator
              type="date"
              name="rejectreasondate"
              label="Rejection Date"
              value={rejectreasondate || ""}
              disabled={!editpage}
              onChange={(e) => handleInputChange("dateofreject", null, "rejectreasondate", e.target.value)}
            />
            <TextFieldValidator
              type="text"
              name="rejectreason"
              label="Rejection Date"
              value={rejectreason || ""}
              disabled={!editpage}
              onChange={(e) => handleInputChange("rejectreason", null, "rejectreason", e.target.value)}
            />
          </Grid>

        </Grid>
      </> :
        (initialData?.visa.isothercountryvisited === "yes" &&
          <>
            <div style={{ margin: "10px 0px" }}>
              <H3>Visa</H3>
            </div>
            {countryvisitdata.map((item, key) => {
              return (
                <Grid container spacing={2} key={key} style={{ margin: "10px 0px" }}>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextFieldValidator
                      type="text"
                      name="where"
                      label="Visited Country"
                      value={item.where || ""}
                      disabled={!editpage}
                      onChange={(e) => handleInputChange("countryvisit", key, "where", e.target.value)}
                    />
                    <TextFieldValidator
                      type="date"
                      name="dateofentry"
                      label="Visite Date"
                      value={item.dateofentry || ""}
                      disabled={!editpage}
                      onChange={(e) => handleInputChange("countryvisit", key, "dateofentry", e.target.value)}
                    />
                    <TextFieldValidator
                      type="date"
                      name="dateofexit"
                      label="Country leaving Date"
                      value={item.dateofexit || ""}
                      disabled={!editpage}
                      onChange={(e) => handleInputChange("countryvisit", key, "dateofexit", e.target.value)}
                    />

                  </Grid>
                </Grid>
              )
            })}

          </>
        )
      }
      </div>

      <div style={{ border:"2px solid #00000080",padding:"20px",marginBottom:"20px"}}>
      <div style={{ display: "flex", alignItems: "center", height: "auto", }}>
            <H3>Parents or Guardian Details</H3>
            <Button
              color="primary"
              variant="contained"
              style={{ marginLeft: "20px" }}
              onClick={HandleAddmoreParents}
            >
              <Icon>add</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add More</Span>
            </Button>
          </div>

      {console.log("parentsDetails", parentsDetails)}
      {parentsDetails?.map((item, key) => {
        return (
          <Grid container spacing={6} key={key}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextFieldValidator
                type="text"
                name="FatherName"
                label="Parent Name"
                value={item.parentsdetails || ""}
                disabled={!editpage}
                onChange={(e) => handleInputChange("parents", key, "parentsdetails", e.target.value)}
              // onChange={(e) => handleInputChange("parents", "parentsdetails", e.target.value)}
              />
              <TextFieldValidator
                type="text"
                name="FatherOccupation"
                label="Parent Occupation"
                value={item.Designation || ""}
                disabled={!editpage}
                onChange={(e) => handleInputChange("parents", key, "Designation", e.target.value)}
              />
              <TextFieldValidator
                type="text"
                name="emailofparents"
                label="Email of  Parents"
                value={item.emailofparents || ""}
                disabled={!editpage}
                onChange={(e) => handleInputChange("parents", key, "emailofparents", e.target.value)}
              />
              <TextFieldValidator
                type="text"
                name="Parents Degree "
                label="Degree Name"
                value={item.degreename || ""}
                disabled={!editpage}
                onChange={(e) => handleInputChange("parents", key, "degreename", e.target.value)}
              />
              <TextFieldValidator
                type="date"
                name="yearofpassing"
                label="Year Of Working"
                value={item.yearofpassing || ""}
                disabled={!editpage}
                onChange={(e) => handleInputChange("parents", key, "yearofpassing", e.target.value)}
              />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextFieldValidator
                type="text"
                name="parentrelation"
                label="Relation"
                value={item.parentrelation || ""}
                disabled={!editpage}
                onChange={(e) => handleInputChange("parents", key, "parentrelation", e.target.value)}
              />
              <TextFieldValidator
                type="text"
                name="professionofparents"
                label="Parents Profession"
                value={item.professionofparents || ""}
                disabled={!editpage}
                onChange={(e) => handleInputChange("parents", key, "professionofparents", e.target.value)}
              />
              <TextFieldValidator
                type="text"
                name="levelofeducation"
                label="Education Of Parents"
                value={item.levelofeducation || ""}
                disabled={!editpage}
                onChange={(e) => handleInputChange("parents", key, "levelofeducation", e.target.value)}
              />
              <TextFieldValidator
                type="text"
                name="phonenumberofparents"
                label=" Number"
                value={item.phonenumberofparents || ""}
                disabled={!editpage}
                onChange={(e) => handleInputChange("parents", key, "phonenumberofparents", e.target.value)}
              />
              <TextFieldValidator
                type="date"
                name="yearofworking"
                label="Year Of Working"
                value={item.yearofworking || ""}
                disabled={!editpage}
                onChange={(e) => handleInputChange("parents", key, "yearofworking", e.target.value)}
              />
              <div style={{ cursor: "pointer" }}>
                    <DeleteIcon
                      onClick={() => {
                        handleparentsList(key);
                      }}
                    />
                  </div>
            </Grid>
          </Grid>
        )
      })}
     </div>
 
     <div style={{ border:"2px solid #00000080",padding:"20px",marginBottom:"20px"}}>
      {console.log("siblingsList", siblingsList)}
      {havesibling && <H3>Sibling Details</H3>}

      {havesibling && siblingsList.map((item, key) => (
        <Grid container spacing={6} key={key}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextFieldValidator
              type="text"
              name={`nameofsibiling${key}`}
              label="Sibling Name"
              value={item.nameofsibiling}
              disabled={!editpage}
              onChange={(e) => handleInputChange("siblings", key, "nameofsibiling", e.target.value)}
            />
            <TextFieldValidator
              type="text"
              name={`relationwithsibling${key}`}
              label="Sibling Relation"
              value={item.relationwithsibling}
              disabled={!editpage}
              onChange={(e) => handleInputChange("siblings", key, "relationwithsibling", e.target.value)}
            />
            <TextFieldValidator
              type="text"
              name={`educationlevelofsibling${key}`}
              label="education of Sibling"
              value={item.educationlevelofsibling}
              disabled={!editpage}
              onChange={(e) => handleInputChange("siblings", key, "educationlevelofsibling", e.target.value)}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextFieldValidator
              type="text"
              name={`universityofsibling${key}`}
              label="University Of Sibling"
              value={item.universityofsibling}
              disabled={!editpage}
              onChange={(e) => handleInputChange("siblings", key, "universityofsibling", e.target.value)}
            />
            <TextFieldValidator
              type="text"
              name={`countryofsibling${key}`}
              label="Country  Of Sibling"
              value={item.countryofsibling}
              disabled={!editpage}
              onChange={(e) => handleInputChange("siblings", key, "countryofsibling", e.target.value)}
            />
          </Grid>
        </Grid>
      ))}

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
    {editpage && (
    <Button color="secondary" variant="contained" onClick={handleSave}>
      Save
    </Button>
  )}
    </div>
  );
}

export default Persnoldetailspre;
