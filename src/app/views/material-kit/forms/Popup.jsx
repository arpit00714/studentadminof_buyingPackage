import { H3, H4 } from 'app/components/Typography'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function Popup(props) {

    const [commentbox, setCommentBox] = useState(props.commentbox)
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        props.setCommentBox(false)
    }
    console.log("commentbox", commentbox)
    return (
        <>
            {commentbox && <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Fill required feild
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Please type 'NA' for the required feild, if no information to be filled
                    </Typography>
                </Box>
            </Modal>}

            {/* {commentbox && <div style={{ background: "#1976d2", width: "20%", position: "fixed", top: "100px", right: "40px", zIndex: 9999, padding: "10px" }}>
                <H3 style={{ color: "white" }}>Note:</H3>
                <H4 style={{ color: "white" }}>Type NA when you Dont have any Data</H4>
                <div style={{ background: "white", position: "absolute", top: "-10px", right: "-5px", height: "20px", width: "20px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px" }}><CloseIcon size={10} onClick={() => {
                    setCommentBox(false)
                }} /></div>
            </div>} */}
        </>
    )
}

export default Popup