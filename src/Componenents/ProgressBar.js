import * as React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Updated styles for the progress bar
const linearProgressStyles = {
  height: 10,
  borderRadius: 5,
  backgroundColor: "#f1f3f4", // Light grey background
  "& .MuiLinearProgress-bar": {
    borderRadius: 5,
    backgroundColor: "#1a73e8", // Google's blue
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3)", // Subtle shadow for depth
    transition: "transform .4s linear", // Smooth transition for the bar animation
  },
};

function LinearProgressWithLabel(props) {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1, mb:2 }}>
          <LinearProgress
            variant="determinate"
            {...props}
            sx={linearProgressStyles}
          />
        </Box>
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary" >{`${Math.floor(
          props.totalSize / 1024
        )}Ko utilisé sur ${props.quotas}Ko`}</Typography>
      </Box>
    </>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel({ quotas, totalSize }) {
  const percentage = (totalSize / 1024 / quotas) * 100;
  const [progress, setProgress] = React.useState(percentage);

  React.useEffect(() => {
    setProgress(percentage);
  }, [totalSize, quotas]);

  return (
    <Box sx={{ width: "90%", m: "25px auto 0 auto" }}>
      <LinearProgressWithLabel
        value={progress}
        totalSize={totalSize}
        quotas={quotas}
      />
    </Box>
  );
}
