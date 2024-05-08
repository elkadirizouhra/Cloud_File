import React from "react";

import AboutBackgroundImage from "../../Assets/cloud.png";
import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <div className="about-section-container" id="About">
      
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <h1 className="primary-heading">
        Cloud File : Simplicité et Sécurité
        </h1>
        <p className="primary-text">
        Simplifiez la collaboration et assurez la sécurité de vos données avec le stockage de fichiers cloud</p>
        <p className="primary-text">
        Accessible à distance et doté de fonctionnalités de sécurité avancées, il offre une solution pratique pour gérer vos informations en toute tranquillité.
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
