import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface iDog {
  name: string;
  breed: string;
  color: string;
  gender: string;
  birthDate: string;
  age: string;
  selectedImageName: string;
  ownerName: string;
  feeding: {
    foodType: string;
    feedingFrequency: string;
    serveSnack: boolean;
    snackName: string;
  };
  profileImage: File | null;
}

const DogForm: React.FC = () => {
  const [formData, setFormData] = useState<iDog>({
    name: "",
    breed: "",
    color: "",
    gender: "",
    birthDate: "",
    age: "",
    ownerName: "",
    feeding: {
      foodType: "",
      feedingFrequency: "",
      serveSnack: false,
      snackName: "",
    },
    profileImage: null,
    selectedImageName: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    if (name in formData.feeding) {
      setFormData((prevState) => ({
        ...prevState,
        feeding: {
          ...prevState.feeding,
          [name]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData((prevState) => ({
        ...prevState,
        profileImage: files[0],
        selectedImageName: files[0].name, // Garanta que seja apenas o nome da primeira imagem
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("selectedImageName", formData.selectedImageName);
    formDataToSend.append("profileImage", formData.profileImage || "");

    for (const key in formData) {
      if (key === "feeding") {
        for (const feedingKey in formData.feeding) {
          formDataToSend.append(
            `feeding[${feedingKey}]`,
            String(
              formData.feeding[feedingKey as keyof typeof formData.feeding]
            )
          );
        }
      } else if (key !== "profileImage" && key !== "selectedImageName") {
        formDataToSend.append(
          key,
          String(formData[key as keyof typeof formData])
        );
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/register/dog",
        formDataToSend
      );
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
  };

  console.log(formData);
  return (
    <div className="max-w-lg mx-auto mt-8 bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl mb-4">Formulário de Cachorro</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <div>
          <label className="block mb-1">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Raça:</label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Cor:</label>
          <input
            type="text"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Gênero:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Data de Nascimento:</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Idade:</label>
          <input
            type="text"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Proprietário:</label>
          <input
            type="text"
            id="ownerName"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Tipo de Alimento:</label>
          <input
            type="text"
            id="foodType"
            name="foodType"
            value={formData.feeding.foodType}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Frequência de Alimentação:</label>
          <input
            type="text"
            id="feedingFrequency"
            name="feedingFrequency"
            value={formData.feeding.feedingFrequency}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Servir Lanche?</label>
          <input
            type="checkbox"
            id="serveSnack"
            name="serveSnack"
            checked={formData.feeding.serveSnack}
            onChange={handleChange}
            className="checkbox-field"
          />
        </div>
        {formData.feeding.serveSnack && (
          <div>
            <label className="block mb-1">Nome do Lanche:</label>
            <input
              type="text"
              id="snackName"
              name="snackName"
              value={formData.feeding.snackName}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        )}
        <div>
          <label className="block mb-1">Imagem de Perfil:</label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="input-field"
          />
        </div>
        <button type="submit" className="btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default DogForm;
