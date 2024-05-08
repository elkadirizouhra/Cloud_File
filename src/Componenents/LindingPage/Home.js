import React from "react";
import BannerBackground from "../../Assets/spot.png";
import BannerImage from "../../Assets/cloud.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">NimbusDrive</h1>
          <p className="primary-text">
            Vos fichiers accessibles partout, à tout moment. Profitez d'un accès
            rapide et sécurisé à vos documents, photos et vidéos, où que vous
            soyez. Stockage en ligne fiable et pratique pour une gestion
            simplifiée de vos fichiers.
          </p>

          <Button variant="contained"   href="/SignIn" sx={{borderRadius:'40px',padding:'10px 30px'}}>
          
              Se connecter
           
          </Button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
