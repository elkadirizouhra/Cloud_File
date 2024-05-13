import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";

export default function FilledAlerts({ messageData, style }) {
  
  return (
    <Stack
      sx={{
        ...style,
      }}
      spacing={2}
    >
      {messageData.isSuccess && (
        <Alert variant="filled" severity="success">
          {messageData.message}
        </Alert>
      )}

      {messageData.isError && (
        <Alert variant="filled" severity="error">
          {messageData.message}
        </Alert>
      )}
    </Stack>
  );
}
