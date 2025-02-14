import React, { useState, useEffect } from "react";
import dogHome from "../../../assets/dogHome.png";
import HomeModal from "./homeModal";

const HomeMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const backgroundStyle: React.CSSProperties = {
    position: "relative",
    backgroundImage: `url(${dogHome})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const modalContainerStyle: React.CSSProperties = {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "1rem",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: isMobile ? "1rem" : "1.5rem",
    color: "black",
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex h-screen p-10" style={backgroundStyle}>
      {isModalOpen && (
        <HomeModal open={isModalOpen} onClose={handleCloseModal}>
          <div style={modalContainerStyle}>
            <h1 style={titleStyle}>
              Olá, Rebeca! Como está? Ao lado, você encontrará o painel de
              funcionalidades. Sinta-se à vontade para explorar de acordo com as
              suas necessidades.
            </h1>
          </div>
        </HomeModal>
      )}
    </div>
  );
};

export default HomeMain;
