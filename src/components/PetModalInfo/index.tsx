import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ModalPropsPet } from "../../interfaces";

const PetModalInfo: React.FC<ModalPropsPet> = ({
  isOpen,
  closeModal,
  user,
}) => {
  if (!user) return null;

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#fff",
          p: 4,
          borderRadius: "10px",
          maxWidth: 600,
          width: "90%",
        }}
      >
        <CloseIcon
          sx={{ position: "absolute", top: 10, right: 10, cursor: "pointer" }}
          onClick={closeModal}
        />
        <Typography
          variant="h5"
          component="h2"
          align="center"
          sx={{ marginBottom: 2 }}
        >
          {user.name}
        </Typography>
        <Grid container spacing={2}>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={user.photo}
              alt={user.name}
              style={{
                width: "100%",
                borderRadius: "50%",
                marginBottom: 10,
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <Stack spacing={2}>
              <TextField
                variant="standard"
                label="Raça"
                value={user.breed}
                fullWidth
              />
              <TextField
                variant="standard"
                label="Cor"
                value={user.color || ""}
                fullWidth
              />
              <TextField
                variant="standard"
                label="Sexo"
                value={user.gender || ""}
                fullWidth
              />
              <TextField
                variant="standard"
                label="Data de Nascimento"
                value={user.birthDate || ""}
                fullWidth
              />
              <TextField
                variant="standard"
                label="Nome do Tutor"
                value={user.ownerName || ""}
                fullWidth
              />
              <TextField
                variant="standard"
                label="Tipo de Alimentação"
                value={user.feedType || ""}
                fullWidth
              />
              <TextField
                variant="standard"
                label="Frequência de Alimentação"
                value={user.feedFrequency || ""}
                fullWidth
              />
              <TextField
                variant="standard"
                label="Servir Petisco"
                value={user.serveSnack ? "Sim" : "Não"}
                fullWidth
              />
            </Stack>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          onClick={closeModal}
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Fechar
        </Button>
      </Box>
    </Modal>
  );
};

export default PetModalInfo;
