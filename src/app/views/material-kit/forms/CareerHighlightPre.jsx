
import React from 'react'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Grid, Icon, TextField, styled } from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useState } from 'react';
import apiUrl from 'URLS/ApiUrl';
import { filesupload } from 'Apis/filesupload';
import { persnoaldetailsupdate } from 'Apis/Persnoldetailsform';
const userID = localStorage.getItem("userID");
const datePickerStyles = {
    width: "100%",
    marginBottom: "16px"
};
const TextFieldEdit = styled(TextField)(() => ({
    width: "100%",
    marginBottom: "16px",
}));
const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const TextareaAutosize = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 10px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);
function CareerHighlightPre(props) {
    const formstatus = props.formstatus
    const [filedopen, setfiledOpen] = useState(true);
    const [companyProfile, setcompanyProfile] = useState("")
    const [careerHighlight, setCareerHighlight] = useState(props.userData)
    const [editable, setEditable] = useState(false);
    const [open, setOpen] = useState(false);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedFormData = [...careerHighlight];
        updatedFormData[index] = { ...updatedFormData[index], [name]: value };
        setCareerHighlight(updatedFormData);
    }

    const HandleCompanyProfile = async (event, index) => {
        const file = event.target.files[0]; // Get the first file selected
        const fd = new FormData();
        fd.append("Company_profile", file);
        const data = await filesupload(fd);
        console.log("data", data);
        console.log("data[0].filename", data[0].filename);
        // careerForm.companyLogo = data[0].filename;
        const updatedFormData = [...careerHighlight];
        updatedFormData[index].companyLogo = data[0].filename; // Assuming data[0].filename is the path
        setCareerHighlight(updatedFormData);
        const fileName = file.name; // Get the file name
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setcompanyProfile(reader.result);
            };
            reader.readAsDataURL(file);
        }
        console.log("Selected file:", file);
        console.log("File name:", fileName);
    }
    const toggleEdit = () => {
        setEditable(!editable);
    };

    const handleClose = () => {
        setOpen(false)
        window.location.reload();
    }

    const handleSubmit = async () => {
        try {
            setOpen(true)
            const resp = await persnoaldetailsupdate(
                {
                    CareerHighLightList: JSON.stringify(careerHighlight)
                },
                userID
            );
            console.log("resp", resp)
        } catch (err) {
            console.log("err", err)
        }
    };
    console.log("careerHighlight", careerHighlight)

    const checkvalidaty = () => {
        const check = careerHighlight.filter((item) => item.yourWorkSummary)
        console.log("check", check)
    }


    const check = careerHighlight.filter((item) => item.yourWorkSummary)
    console.log("check", check)
    return (
        <div>
            {!formstatus && <div>
                <Button variant="contained" color="primary" onClick={toggleEdit}>
                    {editable ? "Cancel" : "Edit"}
                </Button>
                {editable && (
                    <Button variant="contained" color="secondary" onClick={handleSubmit}>
                        Submit
                    </Button>
                )}
            </div>}
            {careerHighlight.map((item, key) => {
                return (
                    <Grid container spacing={6} style={{ borderBottomColor: "black" }}>

                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextFieldEdit
                                type="text"
                                name="compaName"
                                label="Company Name"
                                onChange={(e) => {
                                    handleChange(e, key)
                                }}
                                disabled={!editable}
                                value={item.compaName || ""}
                            />
                            <TextFieldEdit
                                type="text"
                                name="companyWebLink"
                                label="Company Website"
                                onChange={(e) => {
                                    handleChange(e, key)
                                }}
                                disabled={!editable}
                                value={item.companyWebLink || ""}
                            />
                            <TextFieldEdit
                                type="text"
                                name="companyprofile"
                                label="Company profile"
                                onChange={(e) => {
                                    handleChange(e, key)
                                }}
                                disabled={!editable}

                                value={item.companyprofile || ""}

                            />
                            <TextFieldEdit
                                type="date"
                                name="TenureFrom"
                                label="Company Tenure From"
                                onChange={(e) => {
                                    handleChange(e, key)
                                }}
                                disabled={!editable}
                                value={item.TenureFrom || ""}

                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextFieldEdit
                                type="text"
                                name="YourDesignation"
                                label="Your Designation"
                                onChange={(e) => {
                                    handleChange(e, key)
                                }}
                                disabled={!editable}
                                value={item.YourDesignation || ""}

                            />
                            <TextFieldEdit
                                type="text"
                                name="SupervisorName"
                                label="Name and designation of Supervisor you work under"
                                onChange={(e) => {
                                    handleChange(e, key)
                                }}
                                disabled={!editable}
                                value={item.SupervisorName || ""}

                            />
                            <TextareaAutosize
                                style={{ width: "100%" }}
                                type="text"
                                name="yourWorkSummary"
                                label="Summary of work Profile"
                                onChange={(e) => {
                                    handleChange(e, key)
                                }}
                                disabled={!editable}
                                value={item.yourWorkSummary || ""}

                            />
                            <TextFieldEdit
                                type="date"
                                name="TenureTo"
                                label="Company Tenure To"
                                onChange={(e) => {
                                    handleChange(e, key)
                                }} disabled={!editable}
                                value={item.TenureTo || ""}

                            />
                        </Grid>
                    </Grid>
                )
            })}
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
    )
}

export default CareerHighlightPre