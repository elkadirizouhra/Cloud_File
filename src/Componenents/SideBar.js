import * as React from "react";
import { useState } from "react";
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
import DropDrag from "./DropDrag";
import ProgessBar from "./ProgressBar";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export default function TemporaryDrawer({
  open,
  toggleDrawer,
  uploadedFiles,
  setUploadedFiles,
  fileData,
  setFileData,
  setMessageData,
  setOpenDrawer,
  user,
  quotas,
  totalSize,
}) {
  const list = [
    {
      name: "Accueil",
      icon: <HomeIcon />,
    },
    { name: "Mon CloudFile", icon: <DriveFolderUploadIcon /> },
    { name: "Courbeille", icon: <DeleteIcon /> },
    { name: "stockage", icon: <CloudQueueIcon /> },
  ];
  const [openD, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const DrawerList = (
    <Box
      sx={{ width: "220px" }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List sx={{ mt: "10px" }}>
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

  const fun = () => toggleDrawer(false);
  return (
    <div>
      <Drawer open={open} onClose={fun()} sx={{ p: 5 }}>
        <WbCloudyOutlinedIcon
          sx={{ width: "120px", height: "80px", m: "25px auto 0 auto" }}
        />

        <DropDrag
          open={openD}
          handleOpen={handleOpen}
          setOpen={setOpen}
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
          fileData={fileData}
          setFileData={setFileData}
          setMessageData={setMessageData}
          toggleDrawer={toggleDrawer}
          setOpenDrawer={setOpenDrawer}
          user={user}
        />
        {DrawerList}
        <ProgessBar quotas={quotas} totalSize={totalSize} />
      </Drawer>
    </div>
  );
}
