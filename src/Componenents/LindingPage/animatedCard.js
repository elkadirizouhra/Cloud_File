import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import PickMeals from "../../Assets/sécurité.png";
import ChooseMeals from "../../Assets/search.png";
import DeliveryMeals from "../../Assets/collab.png";

const Work = () => {
  AOS.init();
  const workInfoData = [
   
    {
      image: ChooseMeals,
      title: "Partagez vos contenus",
      text: "Avec CloudFile, envoyez des fichiers volumineux sans pièces jointes, partagez des liens traçables et accédez à des statistiques en temps réel pour une prise de décision basée sur les données.",
      delay: 0,
      minHeight: "400px",
      dataAos: "fade-right",
      boxShadow: "0",
      imageWidth:"200px"
    },
    {
      image: PickMeals,
      title: "Stockez et protégez vos fichiers",
      text: "Obtenez 3 To d'espace de stockage sécurisé avec des fonctionnalités telles que la récupération de fichiers, la protection par mot de passe et les filigranes.",
      delay: 500,
      minHeight: "550px",
      dataAos: "zoom-in",
      boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
      imageWidth:"auto"
    },
    {
      image: DeliveryMeals,
      title: "Collaborez sur vos fichiers professionnels",
      text: "Réduisez le nombre de réunions avec Capture et utilisez Replay pour simplifier l’échange de commentaires et le processus d’approbation pour les projets vidéo.",
      delay: 200,
      minHeight: "400px",
      dataAos: "fade-left",
      boxShadow: "0",
      imageWidth:"220px"
    },
  ];
  return (
    <div className="work-section-wrapper" id="advantages">
      <div className="work-section-top">
        <h1 className="primary-heading">
          Que pouvez-vous faire avec Cloud File ?
        </h1>
        <p className="primary-text">
          Cloud File vous aide, vous et votre entreprise, à chaque étape{" "}
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div
            className="work-section-info"
            data-aos={data.dataAos}
            data-aos-delay={data.delay}
            key={data.title}
            style={{ minHeight: data.minHeight, boxShadow: data.boxShadow, padding:"30px" }}
          >
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" style={{width:data.imageWidth}}/>
            </div>
            <h2>{data.title}</h2>
            <p style={{ color: "gray" }}>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
