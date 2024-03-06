import axios from "axios";

const getPetsData = async () => {
  try {
    const response = await axios.get("http://localhost:3001/pets");
    // Aqui você pode acessar os dados dos pets em response.data
    return response.data;
  } catch (error) {
    // Lidar com erros, se houver algum
    console.error("Erro ao obter dados dos pets:", error);
    return null;
  }
};

// Exemplo de utilização
getPetsData().then((petsData) => {
  if (petsData) {
    console.log(petsData); // Aqui estão os dados dos pets
  } else {
    console.log("Erro ao obter os dados dos pets");
  }
});
