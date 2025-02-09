import { useParams } from "react-router-dom";
import { useGetDogs } from "../../hooks/serviceHook";
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

export const DetailsDog = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetDogs();

  const dog = data?.dogs.find((dog) => dog._id === id);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!dog) {
    return <div>No dog found with ID: {id}</div>;
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box display="flex" gap={4}>
          <Box display="flex" flexDirection="column" >
            <Typography variant="h4" fontWeight={700} gutterBottom>
              {dog.name.toUpperCase()}
            </Typography>
            <Avatar src={dog.profileImage} sx={{ width: 250, height: 250, mb: 2, borderRadius: 3 }} />
          </Box>

          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flex: '1 1 auto' }}>
              <TextField
                label="Raça"
                value={dog.breed}
                disabled
                sx={{ width: 'auto', flexShrink: 0 }}
              />
            </Box>
            <Box sx={{ flex: '1 1 auto' }}>
              <TextField
                label="Sexo"
                value={dog.gender}
                disabled
                sx={{ width: 'auto', flexShrink: 0 }}
              />
            </Box>
            <Box sx={{ flex: '1 1 auto' }}>
              <TextField
                label="Cor"
                value={dog.color}
                disabled
                sx={{ width: 'auto', flexShrink: 0 }}
              />
            </Box>
            <Box sx={{ flex: '1 1 auto' }}>
              <TextField
                label="Tutor"
                value={dog.ownerName}
                disabled
                sx={{ width: 'auto', flexShrink: 0 }}
              />
            </Box>
            <Box sx={{ flex: '1 1 auto' }}>
              <TextField
                label="Alimentação"
                value={dog.feeding.foodType}
                disabled
                sx={{ width: 'auto', flexShrink: 0 }}
              />
            </Box>
            <Box sx={{ flex: '1 1 auto' }}>
              <TextField
                label="Comida"
                value={dog.feeding.feedingFrequency}
                disabled
                sx={{ width: 'auto', flexShrink: 0 }}
              />
            </Box>
            <Box sx={{ flex: '1 1 auto' }}>
              <TextField
                label="Petisco"
                value={dog.feeding.snackName ? dog.feeding.snackName : "Não"}
                disabled
                sx={{ width: 'auto', flexShrink: 0 }}
              />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
