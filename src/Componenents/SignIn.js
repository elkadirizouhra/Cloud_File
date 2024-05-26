import * as React from "react";
import { useState } from "react";
import Model from "./model";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import SvgColor from "./svgColor";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Container, Link as LinkMui } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Google from "../Assets/google.png";
import Facebook from "../Assets/facebook.png";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {
  const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log(user);
    if (user) {
      navigate("/Dashboard");
    }
  };

  const doSignInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);

      if (user) {
        navigate("/Dashboard");
      }
    } catch (e) {
      console.log("erreur");
    }
  };

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/Dashboard");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{ height: "100vh" }}
        justifyContent="center"
      >
        <CssBaseline />
        {/* <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://www.edtechreview.in/images/Daily/Insight/cloud_file_storage_for_students.jpg)",
            backgroundRepeat: "no-repeat",

            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundPosition: "center",
          }}
        /> */}
        <Grid item xs={12} sm={8} md={5}>
          <Container
            maxWidth="sm"
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                onClick={onLogin}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                SignIn
              </Button>

              <Grid container>
                <Grid item xs>
                  <Model />
                </Grid>
                <Grid item>
                  <LinkMui component={Link} to="/SignUp" variant="body2">
                    Already have an account? Sign Up
                  </LinkMui>
                </Grid>
              </Grid>
              <Divider sx={{ mt: 3 }}>or</Divider>

              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "16px",
                  pt: "20px",
                }}
              >
                <Button
                  fullWidth
                  disableElevation
                  startIcon={<SvgColor src={Google} />}
                  variant="outlined"
                  onClick={doSignInWithGoogle}
                  sx={{ mt: 2, mb: 1, height: 45 }}
                >
                  google
                </Button>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "16px",
                }}
              >
                <Button
                  fullWidth
                  disableElevation
                  startIcon={
                    <SvgColor src={Facebook} sx={{ height: 16, width: 12 }} />
                  }
                  variant="contained"
                  onClick={doSignInWithFacebook}
                  sx={{ mt: 1, height: 45 }}
                >
                  Facebook
                </Button>
              </Grid>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
