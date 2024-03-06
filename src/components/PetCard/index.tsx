import React, { useState } from "react";
import Modal from "react-modal";
import { RiCalendar2Line } from "react-icons/ri";
import { SiDatadog } from "react-icons/si";
import { IconButton } from "@mui/material";
import { Typography, Avatar, Box } from "@mui/material";
import { Agenda } from "../Agenda";
import PetModalInfo from "../PetModalInfo";
import CloseIcon from "@mui/icons-material/Close";
import { PetCardProps } from "../../interfaces";

const PetCard: React.FC<PetCardProps> = ({ user }) => {
  const { name, photo, breed, id } = user;

  const [agendaModalIsOpen, setAgendaModalIsOpen] = useState(false);
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);

  const openAgendaModal = () => {
    setAgendaModalIsOpen(true);
  };

  const closeAgendaModal = () => {
    setAgendaModalIsOpen(false);
  };

  const openInfoModal = () => {
    setInfoModalIsOpen(true);
  };

  const closeInfoModal = () => {
    setInfoModalIsOpen(false);
  };

  return (
    <Box
      component="div"
      bgcolor="#00000010"
      p={2}
      borderRadius={4}
      textAlign="center"
      sx={{
        cursor: "pointer",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
        boxShadow: 2,
        marginTop: 2,
      }}
    >
      <Avatar
        alt={name}
        src={photo}
        sx={{
          width: 150,
          height: 150,
          margin: "0 auto 20px",
          borderRadius: "50%",
        }}
      />
      <Typography variant="h6" component="h3">
        {name}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {breed}
      </Typography>

      {user && (
        <>
          <IconButton
            onClick={openInfoModal}
            sx={{ bgcolor: "gray.400", "&:hover": { bgcolor: "gray.500" } }}
          >
            <SiDatadog />
          </IconButton>

          <IconButton
            onClick={openAgendaModal}
            sx={{ bgcolor: "gray.400", "&:hover": { bgcolor: "gray.500" } }}
          >
            <RiCalendar2Line />
          </IconButton>

          <Modal
            isOpen={agendaModalIsOpen}
            onRequestClose={closeAgendaModal}
            contentLabel="Agenda Modal"
            ariaHideApp={false}
            style={{
              overlay: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                position: "relative",
                border: "none",
                background: "#fff",
                overflow: "hidden",
                borderRadius: "8px",
                outline: "none",
                padding: "0",
                width: "80%", // Diminui a largura do modal para 80% da largura da tela
                height: "90%", // Define a altura do modal para 90% da altura da tela
                margin: "auto", // Centraliza o modal horizontalmente
                top: "2%", // Ajusta a posição vertical para cima
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              },
            }}
          >
            <Box p={5} textAlign="center" style={{ height: "100%" }}>
              <IconButton
                sx={{ position: "absolute", top: 10, right: 10, color: "#000" }}
                onClick={closeAgendaModal}
              >
                <CloseIcon />
              </IconButton>
              <div style={{ overflow: "auto", height: "calc(100% - 80px)" }}>
                <Agenda userId={String(id)} /> {/* Componente do calendário */}
              </div>
            </Box>
          </Modal>
          <PetModalInfo
            isOpen={infoModalIsOpen}
            closeModal={closeInfoModal}
            user={user}
          />
        </>
      )}
    </Box>
  );
};

export default PetCard;
