import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import SnackBar from "./SnackBar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 580,
  height: 370,
  borderRadius: "18px",
  bgcolor: "background.paper",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 3,
  p: 7,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  ////// snackBar
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const handleClick = (ps) => {
    setState((ps) => ({ ...ps, open: true }));
  };

  const handleCloseSnack = () => {
    setState({ ...state, open: false });
  };
  //////reset
  function ResetPassword() {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        handleClick();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="text"
        sx={{ textDecoration: "underline" }}
      >
        Forget Password ?
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container sx={style}>
          <Typography variant="h4">Forget Password ?</Typography>
          <Typography
            viriant="body2"
            sx={{ alignSelf: "flex-start", fontWeight: "bolder" }}
          >
            {" "}
            Email Address
          </Typography>
          <TextField
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth
            sx={{ display: "block", alignSelf: "flex-start" }}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ height: "55px" }}
            onClick={ResetPassword}
          >
            Reset Password
          </Button>
          <SnackBar
            state={state}
            handleCloseSnack={handleCloseSnack}
            email={email}
          ></SnackBar>
        </Container>
      </Modal>
    </div>
  );
}
