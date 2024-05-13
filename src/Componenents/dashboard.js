import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Feed from "./Feed";
import NavBar from "./NavBar";
import { Button, CssBaseline } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Table from "./TableDocs";
import Message from "./HandleMessage";
const Dashboard = () => {
  const [messageData, setMessageData] = useState({
    isSuccess: false,
    isError: false,
    message: "",
  });

  const [user, setUser] = useState({});
  const [fileData, setFileData] = useState([]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);
  const quotas = 2000;
  console.log("filedata", fileData);
  const fileDataCopy = [...fileData];
  const totalSize = fileDataCopy.reduce(
    (accumulator, currentFile) => accumulator + currentFile.size,
    0
  );
  console.log(totalSize / 1024);

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const [uploadedFiles, setUploadedFiles] = useState([]);
  return (
    <>
      <CssBaseline />

      <Message
        messageData={messageData}
        style={{
          position: "absolute",
          left: "50%",
          top: "80px",
          transform: "translateX(-50%)",
        }}
      />
      <NavBar toggleDrawer={toggleDrawer} user={user} />
      <SideBar
        open={open}
        toggleDrawer={toggleDrawer}
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
        fileData={fileData}
        setFileData={setFileData}
        setMessageData={setMessageData}
        setOpenDrawer={setOpen}
        user={user}
        quotas={quotas}
        totalSize={totalSize}
      />

      <Table
        uploadedFiles={uploadedFiles}
        fileData={fileData}
        setFileData={setFileData}
        setMessageData={setMessageData}
        user={user}
      />
    </>
  );
};

export default Dashboard;
