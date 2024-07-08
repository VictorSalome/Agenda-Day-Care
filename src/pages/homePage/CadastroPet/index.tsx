import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";

export interface iDog {
  _id: string;
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
    _id: "",
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

  useEffect(() => {
    if (formData.birthDate) {
      const birthYear = new Date(formData.birthDate).getFullYear();
      const currentYear = new Date().getFullYear();
      setFormData((prevState) => ({
        ...prevState,
        age: (currentYear - birthYear).toString(),
      }));
    }
  }, [formData.birthDate]);

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
        selectedImageName: files[0].name,
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

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('src/assets/telaDeCadastro.png')" }}
    >
      <div className="flex justify-center items-center h-full">
        <div className="max-w-lg w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Formulário de Cachorro
          </h1>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-6"
          >
            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-2">Nome:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-2">Raça:</label>
              <input
                type="text"
                id="breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                className="input-field px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-2">Cor:</label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="input-field px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-2">Gênero:</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input-field px-4 py-2 border rounded-lg"
                required
              >
                <option value="">Selecione</option>
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-2">
                Data de Nascimento:
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="input-field px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-2">Idade:</label>
              <input
                type="text"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="input-field px-4 py-2 border rounded-lg"
                required
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-2">
                Proprietário:
              </label>
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                className="input-field px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-2">
                Tipo de Alimento:
              </label>
              <select
                id="foodType"
                name="foodType"
                value={formData.feeding.foodType}
                onChange={handleChange}
                className="input-field px-4 py-2 border rounded-lg"
                required
              >
                <option value="">Selecione</option>
                <option value="Natural">Natural</option>
                <option value="Ração">Ração</option>
                <option value="Natural e Ração">Natural e Ração</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-2">
                Frequência de Alimentação:
              </label>
              <select
                id="feedingFrequency"
                name="feedingFrequency"
                value={formData.feeding.feedingFrequency}
                onChange={handleChange}
                className="input-field px-4 py-2 border rounded-lg"
                required
              >
                <option value="">Selecione</option>
                <option value="1x ao dia">1x ao dia</option>
                <option value="2x ao dia">2x ao dia</option>
                <option value="3x ao dia">3x ao dia</option>
                <option value="4x ao dia">4x ao dia</option>
              </select>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="serveSnack"
                name="serveSnack"
                checked={formData.feeding.serveSnack}
                onChange={handleChange}
                className="checkbox-field mr-2"
              />
              <label htmlFor="serveSnack" className="text-lg font-semibold">
                Servir Lanche?
              </label>
            </div>
            {formData.feeding.serveSnack && (
              <div className="flex flex-col">
                <label className="text-lg font-semibold mb-2">
                  Nome do Lanche:
                </label>
                <input
                  type="text"
                  id="snackName"
                  name="snackName"
                  value={formData.feeding.snackName}
                  onChange={handleChange}
                  className="input-field px-4 py-2 border rounded-lg"
                />
              </div>
            )}
            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-2">
                Imagem de Perfil:
              </label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input px-4 py-2 border rounded-lg"
              />
              {formData.selectedImageName && (
                <p className="text-sm text-gray-600 mt-2">
                  Arquivo selecionado: {formData.selectedImageName}
                </p>
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Registrar Cachorro
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DogForm;
