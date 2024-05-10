import * as React from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import WbCloudyOutlinedIcon from "@mui/icons-material/WbCloudyOutlined";
import HomeIcon from "@mui/icons-material/Home";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export default function TemporaryDrawer({ open, toggleDrawer }) {
  const list = [
    {
      name: "Accueil",
      icon: <HomeIcon />,
    },
    { name: "Mon CloudFile", icon: <DriveFolderUploadIcon /> },
    { name: "Courbeille", icon: <DeleteIcon /> },
    { name: "espace de stockage", icon: <CloudQueueIcon /> },
  ];
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {list.map((element, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>{element.icon}</ListItemIcon>
              <ListItemText primary={element.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)} sx={{ p: 5 }}>
        <WbCloudyOutlinedIcon sx={{ width: "100px", height: "60px" }} />
        <Button
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          sx={{ height: "50px", width: "120px", borderRadius: 3 }}
        >
          New
          <VisuallyHiddenInput type="file" />
        </Button>
        {DrawerList}
      </Drawer>
    </div>
  );
}
