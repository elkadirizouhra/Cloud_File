import * as React from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
export default function Modale({
  open = false,
  width = "80%",
  handleClose = () => {},
  renderContent,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { width },
    bgcolor: "background.paper",
    boxShadow: 24,
    py: 7,
    borderRadius: 1,
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CloseOutlinedIcon
          onClick={handleClose}
          sx={{ position: "absolute", top: 6, right: 5, cursor: "pointer" }}
        />
        {renderContent}
      </Box>
    </Modal>
  );
}
