import * as React from "react";
import { useState, useEffect } from "react";
import validator from "validator";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link as LinkMui } from "@mui/material/";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Navigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate, Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, storage } from "../firebase";
import Messages from "./HandleMessage";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/elkadirizouhra?tab=repositories"
      >
        Mygithub
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  const navigate = useNavigate();
  const [messageData, setMessageData] = useState({
    isSuccess: false,
    isError: false,
    message: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Créer un nouvel utilisateur avec son adresse e-mail et son mot de passe
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      setMessageData({
        isSuccess: true,
        message: "Votre compte a été créé avec succès.", // Message de succès
      });

      // Effacer le message après 3 secondes
      setTimeout(() => {
        setMessageData({
          isSuccess: false,
          message: "",
          isError: false,
        });
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      setMessageData({
        isError: true,
        message: "Votre adresse e-mail ou votre mot de passe est invalide.", // Message d'erreur
      });

      // Effacer le message d'erreur après 3 secondes
      setTimeout(() => {
        setMessageData({
          isSuccess: false,
          message: "",
          isError: false,
        });
      }, 3000);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
      setIsValidEmail(validator.isEmail(value));
    } else if (name === "password") {
      setPassword(value);
      setIsValidPassword(validator.isStrongPassword(value));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Messages
        messageData={messageData}
        style={{
          position: "absolute",
          left: "50%",
          top: "20px",
          transform: "translateX(-50%)",
        }}
      />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleChange}
                error={!isValidEmail}
                helperText={!isValidEmail ? "svp enterer un email valide " : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={handleChange}
                error={!isValidPassword}
                helperText={
                  !isValidPassword ? "svp entrer un fort mot de passe" : ""
                }
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            onClick={onSubmit}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <LinkMui component={Link} to="/SignIn" variant="body2">
                Already have an account? Sign in
              </LinkMui>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
