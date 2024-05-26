import * as React from "react";
import {  useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import { Box } from "@mui/material/";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import MovieIcon from "@mui/icons-material/Movie";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { storage } from "../firebase"; // Importer le service de stockage Firebase
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage"; // Importer les méthodes nécessaires depuis firebase/storage
import MenueList from "./menueFile";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.red,
    color: theme.palette.common.black,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({}));
const getFileIcon = (fileName) => {
  const extension = fileName.split(".").pop().toLowerCase();
  if (extension === "pdf")
    return <PictureAsPdfIcon sx={{ color: "rgb(234, 67, 53)" }} />;
  else if (
    extension === "jpeg" ||
    extension === "jpg" ||
    extension === "png" ||
    extension === "webp"
  )
    return <ImageIcon sx={{ color: "rgb(234, 67, 53)" }} />;
  else if (extension === "doc" || extension === "docx" || extension === "txt")
    return <ArticleOutlinedIcon color="primary" />;
  else if (
    extension === "mp3" ||
    extension === "wav" ||
    extension === "wma" ||
    extension === "FLAC" ||
    extension === "ocg"
  )
    return <LibraryMusicIcon color="primary" />;
  else if (
    extension === "mp4" ||
    extension === "avi" ||
    extension === "mov" ||
    extension === "wmv" ||
    extension === "flv" ||
    extension === "mkv" ||
    extension === "webm"
  ) {
    return <MovieIcon color="primary" />;
  }
};
export default function CustomizedTables({
  uploadedFiles,
  fileData,
  setFileData,
  setMessageData,
  user,
  setLoading,
  folders
}) {
  const downloadFile = async (fileName) => {
    try {
      // Créer une référence au fichier dans Firebase Storage
      const fileRef = ref(storage, `/${user.uid}/${fileName}`);

      // Obtenir le lien de téléchargement du fichier
      const url = await getDownloadURL(fileRef);

      // Déclencher le téléchargement du fichier
      window.open(url);
    } catch (error) {
      console.error("An error occurred while downloading the file:", error);
      // Gérer les erreurs
    }
  };
  
  const handleDownload = (fileName) => {
    downloadFile(fileName);
  };
  useEffect(() => {
    console.log("ee", user.uid);
    // Récupérer une référence au répertoire que vous souhaitez lister
    const storageRef = ref(storage, `/${user.uid}/`);

    // List les fichiers dans ce répertoire
    listAll(storageRef)
      .then(async (result) => {
        const filePromises = result.items.map(async (item) => {
          // Obtient l'URL de téléchargement pour chaque fichier
          const downloadURL = await getDownloadURL(item);
          const metadata = await getMetadata(item);
          console.log(metadata);
          const fileSize = metadata.size;

          // Crée un objet contenant le nom du fichier et son URL de téléchargement
          return { name: item.name, url: downloadURL, size: fileSize };
        });

        // Attendre que toutes les promesses soient résolues
        const fileData = await Promise.all(filePromises);
     setLoading(false)
        // Mettre à jour l'état avec les données des fichiers
        setFileData(fileData);
        console.log("ghjk", fileData);
      })
      .catch((error) => {
        // Gérer les erreurs
        console.error("Error listing files:", error);
      });
  }, [user]);
  function formatFileSize(fileSize) {
    if (fileSize >= 1024 * 1024 * 1024) {
      return (fileSize / (1024 * 1024 * 1024)).toFixed(2) + " Go";
    } else if (fileSize >= 1024 * 1024) {
      return (fileSize / (1024 * 1024)).toFixed(2) + " Mo";
    } else if (fileSize >= 1024) {
      return (fileSize / 1024).toFixed(2) + " Ko";
    } else {
      return fileSize + " octets";
    }
  }
  return (
    <>
     <TableContainer
        component={Paper}
        sx={{
          width: "1200px",
          position: "relative",
          left: "15%",
          top: "100px",
        }}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow sx={{ Color: "black", fontWeight: "bolder" }}>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>size</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fileData?.map((file) => (
              <StyledTableRow
                key={file}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)", // Couleur de fond au survol
                    cursor: "pointer", // Curseur change au survol
                  },
                }}
              >
                <StyledTableCell
                  align="rigth"
                  component="th"
                  scope="row"
                  onDoubleClick={() => handleDownload(file.name)}
                >
                  <Box sx={{ display: "flex", gap: 2 }}>
                    {getFileIcon(file.name)}
                    {file.name}
                  </Box>
                </StyledTableCell>
                <StyledTableCell>{formatFileSize(file.size)}</StyledTableCell>
                <StyledTableCell>
                  <MenueList
                    file={file}
                    fileData={fileData}
                    setFileData={setFileData}
                    user={user}
                    setMessageData={setMessageData}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
