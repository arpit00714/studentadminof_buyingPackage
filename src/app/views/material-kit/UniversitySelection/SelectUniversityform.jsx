import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import apiUrl from "URLS/ApiUrl";
import "./selecteduni.css";
import { H3 } from "app/components/Typography";
import { universityselectBystudent } from "Apis/packageselect";
import { UpdateStudentUniverstatus } from "Apis/University";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { UpdateStudentSteps } from "Apis/studentuser";
import { useNavigate } from "react-router-dom";
import { studentData } from "Apis/Persnoldetailsform";
const columns = [
  { field: "universityName", headerName: "University Name", width: 150 },
  { field: "applicationFee", headerName: "Application Fee", width: 150 },
  { field: "country", headerName: "Country", width: 110 },
  { field: "state", headerName: "State", width: 110 },
  { field: "ielts", headerName: "IELTS/TOFFEL Reporting Charges", width: 110 },
  { field: "intake", headerName: "Intake", width: 110 },
  {
    field: "referenceLink", headerName: "Reference Link", width: 110, renderCell: (params) => (
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          console.log("params.row.referenceLink", params.row.referenceLink)
          window.open(`${params.row.referenceLink}`)
        }
        }>
        View Link
      </Button>
    ),
  },
  { field: "reportingCharges", headerName: "Reporting Charges", width: 110 },
  { field: "tutionFee", headerName: "Tuition Fee", width: 110 }
];

function SelectUniversityForm() {
  const navigation = useNavigate();
  const [selectedUniversitiesList, setSelectedUniversitiesList] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [disableCheckbox, setDisableCheckbox] = useState({});
  const [totalApplicationFee, setTotalApplicationFee] = useState(0);
  const [universitiesPerConsultancy, setUniversitiesPerConsultancy] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedbyStudent, setSelectedByStudent] = useState([]);
  const [afteropen, setafterOpen] = useState(true);
  const userID = localStorage.getItem("userID");
  const [totalSelectedUniversities, setTotalSelectedUniversities] = useState(0);
  const [totalAllowedUniversities, setTotalAllowedUniversities] = useState(0);
  const [selectionDone, setSelectionDone] = useState(false)
  const [reachedLimit, setReachedLimit] = useState(false)
  const [totalunipopup, setTotalunipopup] = useState(false)
  const [reached, setreached] = useState(false)
  const [hidebtn, sethidebtn] = useState(false)
  const [showCheckboxes, setShowCheckboxes] = useState(true);
  console.log("userID", userID)
  useEffect(() => {
    const check = async () => {
      const resp = await studentData(userID);
      if (resp?.status === 200) {
        const data = await resp.json();
        console.log("dreachedLimitstudentDataata", data);
        const steps = data.message[0]?.steps;
        if (steps === "3") {
          sethidebtn(true)

        }
        console.log("steps", steps)
      };
    }
    check();
  }, [userID]);
  console.log("hidebtn", hidebtn)

  useEffect(() => {
    const getUniversity = async () => {
      const endpoint = `${apiUrl}/api/universitiesattach/byAdmin/${userID}`;
      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.status === 200) {
        setSelectedUniversitiesList(data.message);
        console.log("university by admin", data.message)
      }
    };
    getUniversity();
  }, [userID]);
  console.log("showCheckboxes", showCheckboxes)
  useEffect(() => {
    const getstudentselectionstatus = async () => {
      const endpoint = `${apiUrl}/api/universitiesattach/getbyStudent/${userID}`;
      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.status === 200) {
        console.log("data.message", data.message)

        const selecteduniversity = data.message
        setSelectedUniversitiesList(selecteduniversity)
        console.log("selecteduniversity", selecteduniversity)
        setShowCheckboxes(false)
        setTotalunipopup(false)
        if (data.message[0].studentSelectStatus === true) {
          setSelectionDone(true)
        }
      }
    };
    getstudentselectionstatus();
  }, [userID]);

  useEffect(() => {
    const getPackageUniversity = async () => {
      const endpoint = `${apiUrl}/api/studentbuypacakages/getTotalpacakagebyid/${userID}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      if (data.status === 200) {
        console.log("data", data)
        const activePackages = data.message.filter(pkg => !pkg.expiry);
        console.log("activePackages", activePackages)
        const totalUniversitiesPerConsultancy = data.universitiesPerConsultancy.map(item => ({
          ...item,
          totalUniversities: activePackages
            .filter(pkg => pkg.consultancyId === item.id)
            .reduce((sum, pkg) => sum + pkg.universitiesperPackage, 0)
        }));
        console.log("totalUniversitiesPerConsultancy", totalUniversitiesPerConsultancy)
        setUniversitiesPerConsultancy(totalUniversitiesPerConsultancy);

        const initialDisableCheckbox = {};
        totalUniversitiesPerConsultancy.forEach(item => {
          initialDisableCheckbox[item.name] = false;
        });
        setDisableCheckbox(initialDisableCheckbox);
        const totalAllowed = totalUniversitiesPerConsultancy.reduce((sum, item) => sum + item.totalUniversities, 0);
        setTotalAllowedUniversities(totalAllowed);
        if (showCheckboxes) {
          setTotalunipopup(true)
        } else (
          setTotalunipopup(false)
        )

      }
    };
    getPackageUniversity();
  }, [userID, showCheckboxes]);

  useEffect(() => {
    const countSelected = () => {
      let total = 0;
      for (const consultancy of universitiesPerConsultancy) {
        total += selectionModel.filter(id => {
          const uni = selectedUniversitiesList.find(u => u.id === id);
          return uni && uni.country === consultancy.name;
        }).length;
      }
      setTotalSelectedUniversities(total);
    };
    countSelected();
  }, [selectionModel, universitiesPerConsultancy, selectedUniversitiesList]);
  console.log("totalunipopup", totalunipopup)

  // const handleSelectionModelChange = (newSelection) => {
  //   const selectedItems = newSelection.map(id => selectedUniversitiesList.find(uni => uni.id === id));

  //   const selectedUniversitiesByCountry = {};
  //   selectedItems.forEach(item => {
  //     selectedUniversitiesByCountry[item.country] = (selectedUniversitiesByCountry[item.country] || 0) + 1;
  //   });

  //   let isValidSelection = true;
  //   const newDisableCheckbox = {};

  //   for (const consultancy of universitiesPerConsultancy) {
  //     const selectedCount = selectedUniversitiesByCountry[consultancy.name] || 0;

  //     if (selectedCount > consultancy.totalUniversities) {
  //       isValidSelection = false;
  //       alert(`You have exceeded the limit of universities for ${consultancy.name}.`);
  //       break;
  //     }

  //     newDisableCheckbox[consultancy.name] = selectedCount === consultancy.totalUniversities;
  //   }

  //   if (newSelection.length > totalAllowedUniversities) {
  //     isValidSelection = false;
  //     alert("You have reached the total limit of universities.");
  //   }

  //   if (isValidSelection) {
  //     setSelectionModel(newSelection);
  //     setDisableCheckbox(newDisableCheckbox);

  //     let totalPrice = 0;
  //     selectedItems.forEach(item => {
  //       totalPrice += parseFloat(item.applicationFee);
  //     });
  //     setTotalApplicationFee(totalPrice);
  //   }

  //   setSelectedByStudent(selectedItems);
  // };


  const handleSelectionModelChange = (newSelection) => {
    const selectedItems = newSelection.map(id => selectedUniversitiesList.find(uni => uni.id === id));

    // Calculate selected universities by country
    const selectedUniversitiesByCountry = {};
    selectedItems.forEach(item => {
      selectedUniversitiesByCountry[item.country] = (selectedUniversitiesByCountry[item.country] || 0) + 1;
    });

    let isValidSelection = true;
    const newDisableCheckbox = {};

    // Check if the selection exceeds the package limit for any consultancy
    for (const consultancy of universitiesPerConsultancy) {
      const selectedCount = selectedUniversitiesByCountry[consultancy.name] || 0;

      if (selectedCount > consultancy.totalUniversities) {
        isValidSelection = false;
        alert(`You have exceeded the limit of universities for ${consultancy.name}.`);
        break;
      }

      newDisableCheckbox[consultancy.name] = selectedCount === consultancy.totalUniversities;
    }
    console.log("totalAllowedUniversities", totalAllowedUniversities)
    // Check if total selected universities exceed the allowed limit
    if (newSelection.length > totalAllowedUniversities) {
      isValidSelection = false;
      alert("You have reached the total limit of universities.");
      setReachedLimit(true)

    }
    else {
      setReachedLimit(false)
    }
    if (isValidSelection) {
      setSelectionModel(newSelection);
      setDisableCheckbox(newDisableCheckbox);

      // Calculate total application fee for selected universities
      let totalPrice = 0;
      selectedItems.forEach(item => {
        totalPrice += parseFloat(item.applicationFee);
      });
      setTotalApplicationFee(totalPrice);
    }

    setSelectedByStudent(p => selectedItems);
    console.log('selectedbyStudent', selectedbyStudent)
  };


  const SelectUniversityByStudent = async () => {
    if (selectedbyStudent.length === 0) {
      alert("Please select at least one university");
    } else {
      console.log("reachedLimit", reachedLimit)
      console.log("selectedbyStudent", selectedbyStudent)
      setOpen(true)
    }

  };

  const handleClose = async () => {
    console.log("reachedLimit", reachedLimit)
    try {
      if (reachedLimit) {
        alert("You have reached the total limit of universities.");
        setOpen(false)
      }
      else {
        console.log("userID", userID)
        console.log("selectionModel", selectionModel)
        const selctbystud = await universityselectBystudent({
          uid: userID,
          adduniversityId: selectedbyStudent
        });
        console.log("selctbystud", selctbystud)
        setOpen(false)
        setSelectionDone(true)
        const resp = await UpdateStudentUniverstatus({
          studentSelectStatus: true
        }, userID)
        if (resp.status === 200) {
          navigation("/student/dashboard/default");
        }
        // const steps = await UpdateStudentSteps({
        //   steps: "3"
        // }, userID)
        // if (steps) {

        // }
        // console.log("steps", steps)
        console.log("resp", resp)
      }
      // window.location.reload();
    } catch (er) {
      console.log("err", er)
    }
  };
  useEffect(() => {
    if (totalAllowedUniversities !== 0 && selectionModel?.length === totalAllowedUniversities) {
      setreached(true);
      console.log("Limit reached");
    }
  }, [selectionModel?.length, totalAllowedUniversities]);
  console.log("hidebtn", hidebtn)
  return (
    <div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={selectedUniversitiesList}
          columns={columns}
          checkboxSelection={showCheckboxes}
          onRowClick={(e) => console.log("onRowClicke", e)}
          onRowSelectionModelChange={handleSelectionModelChange}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
              }
            }
          }}
          pageSizeOptions={[5]}
          // disableSelectionOnClick={totalSelectedUniversities === totalAllowedUniversities}
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          selectionModel={selectionModel}
          isRowSelectable={(params) => {

            console.log('selectionModel', selectionModel, totalAllowedUniversities)
            if (!selectionModel.length) {
              return true
            } else {
              if (selectionModel.length === totalAllowedUniversities) {
                const selectedItem = selectionModel.find(uni => uni === params.id);
                console.log("selectedItem", selectedItem)
                if (selectedItem) {
                  console.log("true")
                  return true
                } else {
                  console.log("false")
                  return false
                }
              }
            }

            return !reachedLimit
            // const selectedItem = selectedUniversitiesList.find(uni => uni.id === params.id);

            // // If the row is already selected, it's always selectable
            // if (selectionModel.includes(params.id)) {
            //   return true;
            // }

            // // Disable rows whose consultancy has reached the limit
            // if (selectedItem && disableCheckbox[selectedItem.country]) {
            //   return false;
            // }
            // console.log('universitiesPerConsultancy', universitiesPerConsultancy)
            // // Disable all rows for a consultancy if its limit is reached
            // if (selectedItem && universitiesPerConsultancy.some(consultancy => {
            //   return consultancy.name === selectedItem.country && consultancy.totalUniversities <= selectionModel.filter(id => {
            //     const uni = selectedUniversitiesList.find(u => u.id === id);
            //     return uni && uni.country === consultancy.name;
            //   }).length;
            // })) {
            //   return false;
            // }

            // // Disable all other rows if totalSelectedUniversities === totalAllowedUniversities
            // return totalSelectedUniversities < totalAllowedUniversities;
          }}
        />
      </Box>
      <div style={{ margin: "30px 0px", display: "flex", width: "50%", justifyContent: "space-between" }}>
        <H3>
          Total Application Fee:{" "}
          {totalApplicationFee
            .toLocaleString("en-IN")
            .replace(/^(\D+)/, "$1 ")}
        </H3>
        {!selectionDone && <Button onClick={SelectUniversityByStudent} variant="contained" disabled={hidebtn}>
          Submit
        </Button>}

      </div>

      {selectionDone &&
        <Dialog
          open={afteropen}
          // onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Your University Selection Is Done Wait for Next Step"}</DialogTitle>
          <DialogContent></DialogContent>
          <div style={{ display: "flex" }}>
            <DialogActions>
              <Button onClick={() => {
                setafterOpen(false)
              }}>OK</Button>
            </DialogActions>

          </div>
        </Dialog>
      }

      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{reachedLimit ? "Please Select Limited University Check Package!! " : "After Submiting This Form You Cant Edit"}</DialogTitle>
        <DialogContent></DialogContent>
        <div style={{ display: "flex" }}>
          <DialogActions>
            <Button onClick={handleClose}>OK</Button>
          </DialogActions>
          <DialogActions>
            <Button onClick={() => {
              setOpen(false)
            }}>Cancle</Button>
          </DialogActions>
        </div>
      </Dialog>

      <Dialog
        open={totalunipopup}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`You Have Total ${totalAllowedUniversities} Universities To Select`}</DialogTitle>
        <DialogContent></DialogContent>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <DialogActions>
            <Button onClick={() => {
              setTotalunipopup(false)
            }}>OK</Button>
          </DialogActions>
        </div>
      </Dialog>

      <Dialog
        open={reached}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">You have Reached The Limit Of Select University</DialogTitle>
        <DialogContent></DialogContent>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <DialogActions>
            <Button onClick={() => {
              setreached(false)
            }}>OK</Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default SelectUniversityForm;
