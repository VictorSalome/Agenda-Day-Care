import React, { useState, useEffect } from "react";
import { TextField, Typography, Grid, Box } from "@mui/material";
import axios from "axios";
import PetCard from "../../../components/PetCard";

interface User {
    id: number;
    name: string;
    photo: string;
    breed: string;
    color: string;
    gender: string;
    birthDate: string;
    ownerName: string;
    feedType: string;
    feedFrequency: string;
    serveSnack: boolean;
}

const RegisteredPetPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

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


    return (
        <Box p={4} bgcolor="background.default" minHeight="100vh">
            <Typography variant="h4" component="h2" color="primary.contrastText" align="center" gutterBottom>Pets Cadastrados</Typography>
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
                {filteredUsers.map((user) => (
                    <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
                        <PetCard user={user} />
                    </Grid>
                ))}
            </Grid>

        </Box>
    );
};

export default RegisteredPetPage;
