import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { Container, Divider } from "@mui/material";
import Menu from "@mui/material/Menu";
import { auth } from "../firebase";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
export default function MenuAppBar({ toggleDrawer, user }) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /////// profile user //////

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cloud File
          </Typography>
          {
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                disablePadding={true}
              >
                <Grid
                  container
                  spacing={0}
                  sx={{ borderRadius: "20px", width: "250px" }}
                >
                  <Grid
                    item
                    xs={12}
                    sx={{
                      backgroundColor: "rgb(162, 205, 255)",
                      height: "100px",

                      mt: -2,
                    }}
                  >
                    <Link to="/userProfile" component={Button}>
                      <CreateOutlinedIcon
                        sx={{ position: "relative", ml: "210px", mt: "70px" }}
                      />
                    </Link>
                  </Grid>
                  <Divider
                    orientation="horizontal"
                    flexItem
                    style={{ width: "100%" }}
                  >
                    <Grid
                      item
                      xs={12}
                      style={{ textAlign: "center", position: "relative" }}
                    >
                      <Avatar
                        alt="Profile"
                        src={user.photoURL}
                        sx={{
                          width: 100,
                          height: 100,
                          border: "2px solid white",
                          backgroundColor: "transparent",
                          position: "absolute",
                          top: "-50px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          zIndex: "1",
                        }}
                      />
                    </Grid>
                  </Divider>

                  <Grid
                    item
                    xs={12}
                    style={{ backgroundColor: "white", height: "200px" }}
                  >
                    <Container
                      color="black"
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                        mt: "50px",
                        position: "relative",
                      }}
                    >
                      <Typography fontWeight="bold">
                        {user.displayName}
                      </Typography>
                      <Typography>{user.email}</Typography>
                      <Button
                        gap="5px"
                        position="absolute"
                        top="100px"
                        onClick={handleLogout}
                      >
                        <LogoutIcon />
                        Log out
                      </Button>
                    </Container>
                  </Grid>
                </Grid>
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
