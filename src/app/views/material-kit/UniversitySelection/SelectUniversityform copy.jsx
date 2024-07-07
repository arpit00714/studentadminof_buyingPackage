import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import apiUrl from "URLS/ApiUrl";
import "./selecteduni.css";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { H3 } from "app/components/Typography";
import { universityselectBystudent } from "Apis/packageselect";
const columns = [
  { field: "universityName", headerName: "University Name", width: 150 },
  { field: "applicationFee", headerName: "Application Fee", width: 150 },
  { field: "country", headerName: "Country", width: 110 },
  { field: "state", headerName: "State", width: 110 },
  { field: "ielts", headerName: "IELTS", width: 110 },
  { field: "intake", headerName: "Intake", width: 110 },
  { field: "referenceLink", headerName: "Reference Link", width: 110 },
  { field: "reportingCharges", headerName: "Reporting Charges", width: 110 },
  { field: "tutionFee", headerName: "Tuition Fee", width: 110 }
];

function SelectUniversityForm() {
  const [selectedUniversitiesList, setSelectedUniversitiesList] = useState([]);
  const [universityAttachToPackage, setUniversityAttachToPackage] = useState(0);
  const [selectionModel, setSelectionModel] = useState([]);
  const [disableCheckbox, setDisableCheckbox] = useState(false);
  const [totalApplicationFee, setTotalApplicationFee] = useState(0);
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const getUniversity = async () => {
      const endpoint = `${apiUrl}/api/universitiesattach/byAdmin/${userID}`;
      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.status === 200) {
        setSelectedUniversitiesList(data.message);
      }
    };
    getUniversity();
  }, [userID]);

  useEffect(() => {
    const getPackageUniversity = async () => {
      const endpoint = `${apiUrl}/api/studentbuypacakages/getbuypacakagebyid/${userID}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      if (data.status === 200) {
        console.log(
          "data.message[0].universitiesperPackage",
          data.message[0].universitiesperPackage
        );
        setUniversityAttachToPackage(data.message[0].universitiesperPackage);
        console.log("universityAttachToPackage user selecgt ", data.message[0].universitiesperPackage);
        alert(`you can only select${data.message[0].universitiesperPackage}`)
      }
    };
    getPackageUniversity();
  }, [userID]);

  const handleSelectionModelChange = (newSelection) => {
    console.log("newSelection", newSelection);
    if (newSelection.length <= universityAttachToPackage) {
      setSelectionModel(newSelection);
      if (newSelection.length === universityAttachToPackage) {
        setDisableCheckbox(true);
      } else {
        setDisableCheckbox(false);
      }
      console.log("universityAttachToPackage", universityAttachToPackage)
      console.log("newSelection.length", newSelection.length)
      // Log selected items and calculate total price
      let totalPrice = 0;
      newSelection.forEach((id) => {
        const selectedItem = selectedUniversitiesList.find((uni) => uni.id === id);
        if (selectedItem) {
          console.log(
            `Selected University: ${selectedItem.universityName}, Application Fee: ${selectedItem.applicationFee}`
          );
          totalPrice += parseFloat(selectedItem.applicationFee); // Convert application fee to number
        }
      });

      setTotalApplicationFee(totalPrice);
    }
    if (newSelection.length === universityAttachToPackage) {
      console.log("done")
    }
    else {
      console.log(`You can only select up to ${universityAttachToPackage} universities.`);
    }
  };
  const [selectedbyStudent, SetSelectedBYStudent] = useState([]);
  const SelectUniversityByStudent = async () => {
    const selctbystud = await universityselectBystudent({
      uid: userID,
      adduniversityId: selectedbyStudent
    });
    console.log("Selected by student:", selctbystud);
  };
  return (
    <div style={{}}>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={selectedUniversitiesList}
          columns={columns.map((column, index) => ({
            ...column,
            headerRender: (props) => {
              if (index === 0) {
                return <span>&nbsp;</span>; // Hide the header of the first column
              }
              return <DataGrid.ColumnHeader {...props} />;
            }
          }))}
          onRowClick={(e) => {
            console.log("onRowClicke", e);
          }}
          onRowSelectionModelChange={(newSelection) => {
            const items = selectedUniversitiesList.filter((item) => {
              return newSelection.includes(item.id);
            });
            SetSelectedBYStudent(items);
            handleSelectionModelChange(newSelection);
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
              }
            }
          }}
          pageSizeOptions={[5]}
          disableSelectionOnClick
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          checkboxSelection
          selectionModel={selectionModel}
          isRowSelectable={(params) => !disableCheckbox || selectionModel.includes(params.id)}
        />
      </Box>
      <div
        style={{
          margin: "30px 0px",
          display: "flex",
          width: "50%",
          justifyContent: "space-between"
        }}
      >
        <H3>
          Total Application Fee:{" "}
          {totalApplicationFee
            .toLocaleString("en-IN", {
              style: "currency",
              currency: "INR"
            })
            .replace(/^(\D+)/, "$1 ")}
        </H3>

        <Button onClick={SelectUniversityByStudent} variant="contained">
          Submit
        </Button>
      </div>
    </div>
  );
}

export default SelectUniversityForm;
