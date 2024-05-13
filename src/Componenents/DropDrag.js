import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Paper from "@mui/material/Paper";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import LoadBar from "./LoadingCercle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({
  open,
  handleOpen,
  setOpen,
  uploadedFiles,
  setUploadedFiles,
  toggleDrawer,
  fileData,
  setFileData,
  setMessageData,
  setOpenDrawer,
  user,
}) {
  const [loading, setLoading] = React.useState(false);
  console.log("existing files", fileData);
  const close = () => {
    toggleDrawer(false);
  };

  const handleClickLoading = () => {
    setLoading((prevLoading) => !prevLoading);
  };
  const quotas = 2000;
  const fileDataCopy = [...fileData];
  const totalSize = fileDataCopy.reduce(
    (accumulator, currentFile) => accumulator + currentFile.size,
    0
  );

  const handleClose = () => setOpen(false);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      // Parcourir tous les fichiers acceptés
      acceptedFiles.forEach(async (file) => {
        try {
          // Créer une référence dans le stockage Firebase
          const storageRef = ref(storage, `/${user?.uid}/${file.name}`);

          // Télécharger le fichier dans le stockage Firebase
          setLoading(true);
          if (file.size / 1024 <= quotas - totalSize / 1024) {
            await uploadBytes(storageRef, file);

            // Ajouter le fichier téléchargé à la liste des fichiers téléchargés
            setUploadedFiles((prevFiles) => [...prevFiles, file]);
            setFileData((prevFiles) => [...prevFiles, file]);

            //   setFileData(newFiles);

            setMessageData((prevData) => ({
              ...prevData,
              isSuccess: true,
              message: "your files was uploaded succefuly",
            }));
            setTimeout(() => {
              setMessageData({
                isSuccess: false,
                message: "",
                isError: false,
              });
            }, 3000);
          } else {
            setMessageData((prevData) => ({
              ...prevData,
              isError: true,
              message: "you exceeded the limit",
            }));
            setTimeout(() => {
              setMessageData({
                isSuccess: false,
                message: "",
                isError: false,
              });
            }, 3000);
          }

          setLoading(false);

          handleClose();
          close();
          setOpenDrawer(false);
        } catch (error) {
          setLoading(false);
          setMessageData((prevData) => ({
            ...prevData,
            isError: true,
            message: "Error to upload your files",
          }));
          setTimeout(() => {
            setMessageData({
              isSuccess: false,
              message: "",
              isError: false,
            });
          }, 3000);
        }
      });
    },
  });

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<CloudUploadIcon />}
        onClick={handleOpen}
        sx={{ width: "190px", height: "50px", ml: "10px", mt: "50px" }}
      >
        new
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          elevation={3}
          {...getRootProps()}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            padding: 2,
            ml: "500px",
            mt: "100px",
            height: "400px",
            width: "500px",
            cursor: "pointer",
          }}
        >
          <LoadBar loading={loading} handleClickLoading={handleClickLoading} />
          <input {...getInputProps()} />
          <CloudUploadIcon sx={{ fontSize: 48 }} />
          <p>Drag and drop files here or click to browse.</p>
        </Paper>
      </Modal>
    </div>
  );
}
