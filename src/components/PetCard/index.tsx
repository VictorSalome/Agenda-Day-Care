import React from "react";
import { Typography, Avatar, Box } from "@mui/material";

interface User {
    id: number;
    name: string;
    photo: string;
    breed: string;
}

interface PetCardProps {
    user: User;
    openModal: (selectedUser: User) => void;
}

const PetCard: React.FC<PetCardProps> = ({ user, openModal }) => {
    if (!user) return null; // Tratamento para caso o usuário seja null

    const { name, photo, breed } = user;

    return (
        <Box
            component="div" // Adicionando a propriedade component
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
            onClick={() => openModal(user)}
        >
            <Avatar alt={name} src={photo} sx={{ width: 150, height: 150, margin: "0 auto 20px", borderRadius: "50%" }} />
            <Typography variant="h6" component="h3">{name}</Typography>
            <Typography variant="body2" color="textSecondary">{breed}</Typography>
        </Box>
    );
};

export default PetCard;
