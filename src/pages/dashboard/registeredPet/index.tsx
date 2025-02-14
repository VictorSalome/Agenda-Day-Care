import React, { useState } from "react";
import { useGetDogs } from "../../../hooks/serviceHook";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";

import { IoMdInformationCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const RegisteredPetPage: React.FC = () => {
  const { data, error, isLoading } = useGetDogs();
  const [page, setPage] = useState(1); // Estado para controlar a página atual
  const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de busca
  const dogsPerPage = 8; // Número de itens por página
  const navigate = useNavigate();

  const { dogs } = data || {};

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  // Lógica para calcular o índice inicial e final dos itens a serem exibidos na página atual
  const startIndex = (page - 1) * dogsPerPage;
  const endIndex = startIndex + dogsPerPage;

  // Filtra os cães com base no termo de busca
  const filteredDogs = dogs?.filter((dog) =>
    dog.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const dogsToShow = filteredDogs?.slice(startIndex, endIndex); // Filtra os cães a serem exibidos na página atual

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reinicia a página para a primeira ao iniciar uma nova busca
  };

  return (
    <Box p={4} bgcolor="background.default" minHeight="100vh">
      <Typography
        variant="h4"
        component="h2"
        color="primary.contrastText"
        align="center"
        gutterBottom
      >
        Pets Cadastrados
      </Typography>

      <TextField
        type="text"
        placeholder="Pesquisar pets..."
        variant="outlined"
        fullWidth
        className="mt-4"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Grid container spacing={4} mt={4}>
        {dogsToShow?.map((dog) => (
          <Grid item xs={12} sm={6} md={3} key={dog._id}>
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
                position: "relative", // Ensure IconButton stays within Box
              }}
            >
              <IconButton
                sx={{ position: "absolute", top: 10, right: 10, color: "#000" }}
                onClick={() => navigate(`/detailsDog/${dog._id}`)}
              >
                <IoMdInformationCircleOutline />
              </IconButton>
              <Avatar
                alt={dog.name}
                src={dog.profileImage}
                sx={{
                  width: 150,
                  height: 150,
                  margin: "0 auto 20px",
                  borderRadius: "50%",
                }}
              />
              <Typography variant="h6" component="h3">
                {dog.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {dog.breed}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      {/* Controles de páginação */}
      <Box mt={10} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil((filteredDogs?.length || 0) / dogsPerPage)} // Calcula o número total de páginas
          page={page}
          onChange={(_event, value) => handlePageChange(value)}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
};

export default RegisteredPetPage;
