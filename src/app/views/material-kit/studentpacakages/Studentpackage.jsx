import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import moment from 'moment';
import "./studentpacakage.css"
import { app } from "../../../../Firebase/firebase";
import apiUrl from 'URLS/ApiUrl';
import { H2, H3, H4, H5 } from 'app/components/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const formatDate = (endDate) => {
    const date = new Date(endDate);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
    // return moment(endDate).format('DD-MM-YYYY');
};



function Studentpackage() {
    const [selectedUniversitiesList, setSelectedUniversitiesList] = useState([]);
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [packagedata, setpackageData] = useState({})
    const [packageid, setPackageId] = useState("");

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            console.log("user", user);
            setUser(user);
        });
    }, []);

    useEffect(() => {
        const getUniversity = async () => {
            const endpoint = `${apiUrl}/api/studentbuypacakages/getbuypacakagebyid/${user?.uid}`;
            const response = await fetch(endpoint);
            const data = await response.json();
            if (data.status === 200) {
                setSelectedUniversitiesList(data.message);

            }
        };
        getUniversity();
    }, [user?.uid]);

    const cellClassName = (params) => {
        return params.field === 'expiry' && params.value ? 'expired-cell' : ''; // Add 'expired-cell' class if expiry is true
    };
    const getRowClassName = (params) => {
        return params.row.expiry ? 'expired-row' : 'non-expired';
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const columns = [
        {
            field: 'amount', headerName: 'Amount', width: 150,
            renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CurrencyRupeeIcon fontSize="small" />
                    <span>{params.value}</span>
                </div>
            )
        },
        { field: 'buyDate', headerName: 'Buy Date', width: 150 },
        { field: 'disscountValue', headerName: 'Disscount Value', width: 160 },
        { field: 'endDate', headerName: 'Expiry Date', width: 160, valueFormatter: (params) => formatDate(params) },
        // { field: 'expiry', headerName: 'Package Expaired', width: 160 },
        {
            field: 'view', headerName: 'view', width: 160, renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center', height: "100%" }} className='iconclass'
                    onClick={() => {
                        handleClickOpen()
                        setPackageId(params.row.pacakgeId)
                        console.log("Row ID:", params.id);
                        console.log("Row Data:", params.row);
                    }}
                >
                    <RemoveRedEyeIcon fontSize="small" color='black' />
                    {/* <span>{params.value}</span> */}
                </div>
            )
        },
    ];


    useEffect(() => {
        const getpackageDetails = async () => {
            const resp = `${apiUrl}/api/attachedPackage/getpackagedetails/${packageid}`
            const response = await fetch(resp)
            if (response.status === 200) {
                console.log("response", response)
                const data = await response.json()
                console.log("data", data)
                setpackageData(data.message)
            }

        }
        getpackageDetails()
    }, [packageid])


    console.log("packagedata", packagedata)
    console.log("packageid", packageid)
    return (

        <>
            <div style={{ width: "90%", margin: "20px auto" }}>
                <H2>Pacakages Buy</H2>
                <Box sx={{ height: 400, width: '100%', margin: "20px 0px" }}>
                    <DataGrid
                        rows={selectedUniversitiesList}
                        columns={columns.map((column) => ({
                            ...column,
                            cellClassName,
                        }))}
                        getRowClassName={getRowClassName}
                        pageSize={5}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </Box>
            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Package Details"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <H3 style={{ color: "black", margin: "5px 0px" }}>Package Title : {packagedata[0]?.createpackage.packageheading}</H3>
                        <H4 style={{ color: "black", margin: "5px 0px" }}> package Description : {packagedata[0]?.createpackage.packagedescription}</H4>
                        <H4 style={{ color: "black", margin: "5px 0px" }}>Consultancy : {packagedata[0]?.addconsultancy.title}</H4>
                        <H5 style={{ color: "black", margin: "5px 0px" }}>
                            Universities :
                            {packagedata.length && JSON.parse(packagedata[0]?.setting)['unCount']}
                        </H5>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Studentpackage;
