import * as React from "react";
import { useState } from "react";

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"; // Assurez-vous d'importer Link
import WbCloudyOutlinedIcon from "@mui/icons-material/WbCloudyOutlined";
import HomeIcon from "@mui/icons-material/Home";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DropDrag from "./DropDrag";
import ProgessBar from "./ProgressBar";

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
      path: "/Dashboard",
    },

    { name: "Stockage", icon: <CloudQueueIcon />, path: "/Storage" },
  ];

  const [openD, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const DrawerList = (
    <Box
      sx={{ width: "220px" }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List sx={{ mt: "10px" }}>
        {list.map((element, index) => (
          <Link
            to={element.path}
            key={index}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{element.icon}</ListItemIcon>
                <ListItemText primary={element.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </Box>
  );

  const fun = () => toggleDrawer(false);

  return (
    <div>
      <Drawer open={open} onClose={fun} sx={{ p: 5 }}>
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
