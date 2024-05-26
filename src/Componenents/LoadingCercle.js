import * as React from "react";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";


export default function DelayingAppearance({ loading, handleClickLoading }) {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box sx={{ height: 40 }}>
        <Fade in={loading}>
          <CircularProgress />
        </Fade>
      </Box>
    </Box>
  );
}
