import React, { useState, useEffect } from "react";
import { TextField, Typography, Grid, Box, Pagination } from "@mui/material";
import axios from "axios";
import PetCard from "../../../components/PetCard";
import { User } from "../../../interfaces";

const RegisteredPetPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<User[]>("http://localhost:3001/pets");
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao obter dados dos pets:", error);
      }
    };
    fetchData();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

 
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const renderUsers = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex).map((user) => (
      <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
        <PetCard user={user} />
      </Grid>
    ));
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
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Grid container spacing={4} mt={4}>
        {renderUsers()}
      </Grid>
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default RegisteredPetPage;
