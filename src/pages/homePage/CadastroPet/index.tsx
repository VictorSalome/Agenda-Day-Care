import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  IconButton,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { FormState } from "../../../interfaces";

const AddDogForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    dog: {
      name: "",
      breed: "",
      color: "",
      gender: "",
      birthDate: "",
      age: "",
      selectedImageName: "",
      ownerName: "",
      feeding: {
        foodType: "",
        feedingFrequency: "",
        serveSnack: false,
        snackName: "",
      },
      profileImage: null,
    },
  });

  const [gender, setGender] = useState("");
  const [foodType, setFoodType] = useState("");
  const [feedingFrequency, setFeedingFrequency] = useState("");

  const handleGenderChange = (value: string) => {
    setGender(value);
    setFormState((prevFormState) => ({
      ...prevFormState,
      dog: {
        ...prevFormState.dog,
        gender: value,
      },
    }));
  };

  const handleFoodTypeChange = (value: string) => {
    setFoodType(value);
    setFormState((prevFormState) => ({
      ...prevFormState,
      dog: {
        ...prevFormState.dog,
        feeding: {
          ...prevFormState.dog.feeding,
          foodType: value,
        },
      },
    }));
  };

  const handleFeedingFrequencyChange = (value: string) => {
    setFeedingFrequency(value);
    setFormState((prevFormState) => ({
      ...prevFormState,
      dog: {
        ...prevFormState.dog,
        feeding: {
          ...prevFormState.dog.feeding,
          feedingFrequency: value,
        },
      },
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormState((prevFormState) => ({
        ...prevFormState,
        dog: {
          ...prevFormState.dog,
          profileImage: file,
          selectedImageName: file.name, // Define o nome da imagem selecionada
        },
      }));
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
      | { name?: string; value: unknown; type?: unknown }
    >
  ) => {
    const { name, value, type } = event.target;

    setFormState((prevFormState) => {
      if (type === "checkbox") {
        const checkboxValue = (event.target as HTMLInputElement).checked;

        return {
          ...prevFormState,
          dog: {
            ...prevFormState.dog,
            feeding: {
              ...prevFormState.dog.feeding,
              serveSnack: checkboxValue,
              snackName: checkboxValue
                ? prevFormState.dog.feeding.snackName
                : "",
            },
          },
        };
      }

      if (type === "select-one") {
        switch (name) {
          case "gender":
            handleGenderChange(value as string);
            break;
          case "foodType":
            handleFoodTypeChange(value as string);
            break;
          case "feedingFrequency":
            handleFeedingFrequencyChange(value as string);
            break;
          default:
            break;
        }

        return prevFormState;
      }

      if (name === "snackName") {
        return {
          ...prevFormState,
          dog: {
            ...prevFormState.dog,
            feeding: {
              ...prevFormState.dog.feeding,
              snackName: value as string,
            },
          },
        };
      }

      return {
        ...prevFormState,
        dog: {
          ...prevFormState.dog,
          [name as string]: value as string,
        },
      };
    });
  };

  useEffect(() => {
    const calculateAge = () => {
      const birthYear = new Date(formState.dog.birthDate).getFullYear();
      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear;
      setFormState((prevFormState) => ({
        ...prevFormState,
        dog: {
          ...prevFormState.dog,
          age: isNaN(age) ? "" : `${age} anos`,
        },
      }));
    };

    calculateAge();
  }, [formState.dog.birthDate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Adicionar lógica de envio do formulário aqui
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white sm:p-6 md:p-8 rounded-2xl shadow-md w-full sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto"
        encType="multipart/form-data"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Cadastro de Pets
        </h1>
        <h2 className="text-lg text-gray-900 mb-4">Dados do Pet</h2>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="icon-button-file"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="icon-button-file">
              <TextField
                fullWidth
                variant="outlined"
                value={formState.dog.selectedImageName || ""}
                placeholder="Foto do Pet"
                InputProps={{
                  startAdornment: (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  ),
                }}
              />
            </label>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nome do Pet"
              name="name"
              value={formState.dog.name}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Raça"
              name="breed"
              value={formState.dog.breed}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Cor"
              name="color"
              value={formState.dog.color}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="gender-label">Sexo</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => handleGenderChange(e.target.value as string)}
                label="Sexo"
                variant="outlined"
              >
                <MenuItem value="">Selecione...</MenuItem>
                <MenuItem value="macho">Macho</MenuItem>
                <MenuItem value="femea">Fêmea</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Data de Nascimento"
              name="birthDate"
              type="date"
              value={formState.dog.birthDate}
              onChange={handleInputChange}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Idade"
              name="age"
              value={formState.dog.age}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nome do Proprietário"
              name="ownerName"
              value={formState.dog.ownerName}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <h2 className="text-lg text-gray-700 mb-4 mt-8">Alimentação</h2>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="foodType-label">Tipo de Alimentação</InputLabel>
              <Select
                labelId="foodType-label"
                id="foodType"
                name="foodType"
                value={foodType}
                onChange={(e) => handleFoodTypeChange(e.target.value as string)}
                label="Tipo de Alimentação"
                variant="outlined"
              >
                <MenuItem value="">Selecione...</MenuItem>
                <MenuItem value="comida">Comida Natural</MenuItem>
                <MenuItem value="racao">Ração</MenuItem>
                <MenuItem value="comidaNaturalRacao">As duas opções</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="feedingFrequency-label">
                Frequência de Alimentação
              </InputLabel>
              <Select
                labelId="feedingFrequency-label"
                id="feedingFrequency"
                name="feedingFrequency"
                value={feedingFrequency}
                onChange={(e) =>
                  handleFeedingFrequencyChange(e.target.value as string)
                }
                label="Frequência de Alimentação"
                variant="outlined"
              >
                <MenuItem value="">Selecione...</MenuItem>
                <MenuItem value="1x">1x ao dia</MenuItem>
                <MenuItem value="2x">2x ao dia</MenuItem>
                <MenuItem value="3x">3x ao dia</MenuItem>
                <MenuItem value="4x">4x ao dia</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormGroup style={{ marginBottom: "16px" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formState.dog.feeding.serveSnack}
                    onChange={handleInputChange}
                    name="serveSnack"
                    id="serveSnack"
                  />
                }
                label="Servir Petisco"
              />
              {formState.dog.feeding.serveSnack && (
                <TextField
                  fullWidth
                  label="Nome do Petisco"
                  name="snackName"
                  value={formState.dog.feeding.snackName}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              )}
            </FormGroup>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginBottom: "16px" }}
          >
            Cadastrar Pet
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default AddDogForm;
