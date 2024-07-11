import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
} from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa"; // Import the spinner icon
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const [isSubmitting, setIsSubmitting] = useState(false); // State to handle form submission
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Create a ref for the file input

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
    setIsSubmitting(true); // Disable button and show spinner
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

      // Mostrar toast de sucesso
      toast.success("Cachorro registrado com sucesso!");

      // Resetar o formulário após o envio bem-sucedido
      setFormData({
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

      // Limpar o campo de arquivo
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    } finally {
      setIsSubmitting(false); // Re-enable button and hide spinner
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('src/assets/telaDeCadastro.png')" }}
    >
      <div className="flex justify-center items-center h-full ">
        <div className="max-w-xl w-full mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Cadastro do Pet
          </h1>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-6"
          >
            {/* Nome e Raça (em linha) */}
            <div className="flex space-x-4">
              <div className="flex flex-col flex-1">
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
              <div className="flex flex-col flex-1">
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
            </div>

            {/* Cor e Gênero (em linha) */}
            <div className="flex space-x-4">
              <div className="flex flex-col flex-1">
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
              <div className="flex flex-col flex-1">
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
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
              </div>
            </div>

            {/* Data de Nascimento e Idade (em linha) */}
            <div className="flex space-x-4">
              <div className="flex flex-col flex-1">
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
              <div className="flex flex-col flex-1">
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
            </div>

            {/* Proprietário */}
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

            {/* Tipo de Alimento e Frequência de Alimentação (em linha) */}
            <div className="flex space-x-4">
              <div className="flex flex-col flex-1">
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
                  <option value="Ração">Ração</option>
                  <option value="Comida caseira">Natural</option>
                  <option value="Ração + Natural">Ração + Natural</option>
                </select>
              </div>
              <div className="flex flex-col flex-1">
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
                  <option value="Uma vez ao dia">Uma vez ao dia</option>
                  <option value="Duas vezes ao dia">Duas vezes ao dia</option>
                  <option value="Três vezes ao dia">Três vezes ao dia</option>
                </select>
              </div>
            </div>

            {/* Servir Petisco e Nome do Petisco (em linha) */}
            <div className="flex space-x-4">
              <div className="flex flex-col flex-1 items-start">
                <label className="text-lg font-semibold mb-2">
                  Servir Petisco?
                </label>
                <input
                  type="checkbox"
                  id="serveSnack"
                  name="serveSnack"
                  checked={formData.feeding.serveSnack}
                  onChange={handleChange}
                  className="input-field px-4 py-2 border rounded-lg"
                />
              </div>
              {formData.feeding.serveSnack && (
                <div className="flex flex-col flex-1">
                  <label className="text-lg font-semibold mb-2">
                    Nome do Petisco:
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
            </div>

            {/* Imagem */}
            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-2">
                Imagem do Perfil:
              </label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                onChange={handleImageChange}
                className="input-field px-4 py-2 border rounded-lg"
                accept="image/*"
                ref={fileInputRef} // Attach ref to the file input
              />
              {formData.selectedImageName && (
                <span className="text-sm mt-1">
                  {formData.selectedImageName}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-6 bg-gray-500 text-white font-bold rounded-lg shadow-md hover:bg-gray-700 transition duration-300 flex items-center justify-center"
              disabled={isSubmitting} // Disable button while submitting
            >
              {isSubmitting ? ( // Show spinner while submitting
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                "Registrar"
              )}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer /> {/* Adicione o container do Toastify */}
    </div>
  );
};

export default DogForm;
