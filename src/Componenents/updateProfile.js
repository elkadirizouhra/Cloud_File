// Importation des composants et des modules nécessaires depuis les bibliothèques et fichiers locaux
import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { onAuthStateChanged } from "firebase/auth";
import TextField from "@mui/material/TextField";
import { LoadingButton } from "@mui/lab/";
import SaveIcon from "@mui/icons-material/Save";
import { updateProfile } from "firebase/auth";
import { storage } from "../firebase";
import { auth } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Définition du composant UserProfilePage
const UserProfilePage = () => {
  // Définition des états
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    photoURL: "",
  });
  const [initialName, setInitialName] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  // Effets secondaires
  useEffect(() => {
    // Mise à jour des données utilisateur lors de la modification de l'état d'authentification
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  useEffect(() => {
    // Mise à jour des données utilisateur lorsque l'URL de l'image change
    if (auth.currentUser) {
      setUser({
        displayName: auth.currentUser.displayName || "",
        email: auth.currentUser.email || "",
        photoURL: auth.currentUser.photoURL || "",
      });
    }
  }, [auth.currentUser, user.photoURL]);

  // Gestionnaires d'événements
  const handleImageChange = (e) => {
    // Gestionnaire pour le changement de l'image
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // Soumettre l'image
    setLoading(true);
    const imageRef = ref(storage, "image");
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
            setLoading(false);

            updateProfile(auth.currentUser, {
              photoURL: url,
            })
              .then(() => {
                setUser((prevUser) => ({
                  ...prevUser,
                  photoURL: url,
                }));
              })
              .catch((error) => {});
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleChange = (e) => {
    // Gestionnaire pour le changement de nom
    setUser((prevUser) => ({
      ...prevUser,
      displayName: e.target.value,
    }));
  };

  const handleSave = async () => {
    // Gestionnaire pour sauvegarder les modifications
    try {
      await updateProfile(auth.currentUser, {
        displayName: user.displayName,
      });
      setIsEditable(false);
      console.log("Profil mis à jour avec succès");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil : ", error);
    }
  };

  const handleCancel = () => {
    // Gestionnaire pour annuler les modifications
    setUser((prevUser) => ({
      ...prevUser,
      displayName: initialName,
    }));
    console.log("Modifications annulées");
    setIsEditable(false); // Désactiver l'édition après avoir annulé
  };

  // Rendu du composant
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        position: "absolute",
        ml: "450px",
        mt: "100px",
        borderRadius: "5px",
        height: "500px",
        width: "550px",
        pl: 3,
        pt: 2,
        pr: 2,
      }}
    >
      <Typography variant="h5" fontWeight="bolder">
        My profile
      </Typography>
      <div>
        {/* Affichage de l'avatar et du bouton de chargement d'image */}
        <Avatar src={url || user.photoURL} sx={{ width: 150, height: 150 }} />
        <input type="file" onChange={handleImageChange} />
        <LoadingButton
          color="secondary"
          onClick={handleSubmit}
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          <span>Save</span>
        </LoadingButton>
      </div>

      {/* Champ de saisie du nom */}
      <TextField
        label="Name"
        value={user.displayName}
        variant="outlined"
        fullWidth
        disabled={!isEditable}
        onChange={handleChange}
      />
      {/* Affichage de l'email */}
      <TextField
        label="Email"
        value={user.email}
        variant="outlined"
        fullWidth
        disabled
      />
      {/* Boutons d'action */}
      <Grid
        container
        spacing={2}
        justifyContent="flex-end"
        gap={2}
        style={{ marginTop: "20px" }}
      >
        {!isEditable && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setIsEditable(true);
              setInitialName(user.displayName);
            }}
          >
            Update
          </Button>
        )}
        {isEditable && (
          <>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </>
        )}
      </Grid>
    </Paper>
  );
};

export default UserProfilePage;
