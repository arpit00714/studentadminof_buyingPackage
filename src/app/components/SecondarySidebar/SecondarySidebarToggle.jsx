import { Fab, styled, IconButton } from "@mui/material";
import { Close, Settings } from "@mui/icons-material";
import InfoIcon from '@mui/icons-material/Info';
import clsx from "clsx";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useSettings from "app/hooks/useSettings";
import { useState } from "react";
import Popup from "app/views/material-kit/forms/Popup";
import Box from '@mui/material/Box';
// STYLED COMPONENT
const Toggle = styled("div")(() => ({
  zIndex: 99,
  right: "30px",
  bottom: "50px",
  position: "fixed",
  transition: "all 0.15s ease",
  "&.open": { right: "10px" }
}));
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function SecondarySidebarToggle() {
  const [commentbox, setCommentBox] = useState(false)
  const toggle = () => {
    setCommentBox(!commentbox)
    // updateSettings({ secondarySidebar: { open: !settings.secondarySidebar.open } });
  };

  return (
    <>
      {commentbox && <Modal
        open={commentbox}
        onClose={() => {
          setCommentBox(false)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Instruction
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
            "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
            What is Lorem Ipsum?
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

            Why do we use it?
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


            Where does it come from?
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a
          </Typography>
        </Box>
      </Modal>}
      <Toggle >
        <Fab color="primary" aria-label="expand" onClick={toggle}>
          <InfoIcon />
        </Fab>
      </Toggle>
    </>

  );
}
