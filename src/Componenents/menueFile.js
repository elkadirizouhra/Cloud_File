import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Link } from "@mui/material";
import Messages from "./HandleMessage";
import DialogActions from "@mui/material/DialogActions";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import AddLinkOutlinedIcon from "@mui/icons-material/AddLinkOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  getStorage,
  ref,
  deleteObject,
  updateMetadata,
  getDownloadURL,
} from "firebase/storage";
import { storage, auth } from "../firebase";

export default function BasicMenu({
  style,
  file,
  fileData,
  setFileData,
  user,
  setMessageData,
}) {
  const [openLink, setOpenLink] = React.useState(false);

  const handleClickOpenLink = () => {
    setOpenLink(true);
  };

  const handleCloseLink = () => {
    setOpenLink(false);
  };
  const handleDelete = async () => {
    const desertRef = ref(storage, `/${user?.uid}/${file.name}`);

    try {
      await deleteObject(desertRef);
      console.log("File deleted successfully.");
      const newFiles = fileData.filter((item) => item.name !== file.name);
      setFileData(newFiles);
      setMessageData({
        isSuccess: true,
        message: "File deleted successfully.", // Message de succès
      });

      // Effacer le message après 3 secondes
      setTimeout(() => {
        setMessageData({
          isSuccess: false,
          message: "",
          isError: false,
        });
      }, 3000);
      console.log(newFiles);
      // Mettre à jour l'interface utilisateur ou afficher un message de confirmation
    } catch (error) {
      console.error("An error occurred while deleting the file:", error);
      // Gérer les erreurs
    }
    handleClose();
  };
  const saveBlobAsFile = (blob, fileName) => {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };
  const download = async (name) => {
    console.log("hhhheeellllooo", name);
    await getDownloadURL(ref(storage, `/${user?.uid}/${name}`))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        console.log("shr", xhr);
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
          saveBlobAsFile(blob, name);
        };
        xhr.open("GET", url);
        xhr.send();
        console.log("hellooofrom end");
      })
      .catch((error) => {
        // Handle any errors
      });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={style}>
      
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{}}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => download(file.name)}>
          <FileDownloadOutlinedIcon sx={{ mr: "10px" }} />
          télécharger
        </MenuItem>
        <MenuItem onClick={handleClickOpenLink}>
          <AddLinkOutlinedIcon sx={{ mr: "10px" }} />
          Get link
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteOutlineOutlinedIcon sx={{ mr: "10px" }} />
          Supprimer
        </MenuItem>
      </Menu>

      <React.Fragment>
        <Dialog
          open={openLink}
          onClose={handleCloseLink}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Voici le lien de votre fichier"}
          </DialogTitle>

          <DialogActions>
            <Link href={file.url} target="_blank">
              {file.url}
            </Link>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}
