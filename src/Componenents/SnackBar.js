import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function PositionedSnackbar({
  state,
  handleCloseSnackBar,
  email,
}) {
  const { vertical, horizontal, open } = state;

  return (
    <Box sx={{ width: 1000 }}>
      <Snackbar
        sx={{
          position: "absolute",
          width: "1000px",
          top: { md: -160 },
        }}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleCloseSnackBar}
        key={vertical + horizontal}
      >
        <Alert severity="info">
          An email has been sent to {email}, please check your inbox
        </Alert>
      </Snackbar>
    </Box>
  );
}
