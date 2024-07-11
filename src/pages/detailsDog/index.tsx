import { useParams } from "react-router-dom";
import { useGetDogs } from "../../hooks/servicesApi/serviceHook";

export const DetailsDog = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetDogs();

  const dog = data?.dogs.find((dog) => dog._id === id);
  console.log("dog", dog);

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
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-center">Detalhes do pet</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-5xl flex ">
        <div className="w-1/3 flex flex-col items-start">
          <h1 className="text-3xl font-medium">{dog.name}</h1>
          <img
            src={dog.profileImage}
            alt="avatar-dog"
            className="w-72 h-72 rounded-md mr-4"
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <label className="text-lg font-medium mr-2">Raça:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={dog.breed}
                disabled
                className="input-field px-4 py-2 border rounded-lg w-1/2"
              />
            </div>
            <div className="flex items-center">
              <label className="text-lg font-medium mr-2">Sexo:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={dog.gender}
                disabled
                className="input-field px-4 py-2 border rounded-lg w-1/2"
              />
            </div>
            <div className="flex items-center mt-2">
              <label className="text-lg font-medium mr-2">Cor do pet:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={dog.color}
                disabled
                className="input-field px-4 py-2 border rounded-lg w-1/2"
              />
            </div>
            <div className="flex items-center mt-2">
              <label className="text-lg font-medium mr-2">Dono do pet:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={dog.ownerName}
                disabled
                className="input-field px-4 py-2 border rounded-lg w-1/2"
              />
            </div>
            <div className="flex items-center mt-2">
              <label className="text-lg font-medium mr-2">Alimentação:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={dog.feeding.feedingFrequency}
                disabled
                className="input-field px-4 py-2 border rounded-lg w-1/2"
              />
            </div>
            <div className="flex items-center mt-2">
              <label className="text-lg font-medium mr-2">
                Tipo do alimento:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={dog.feeding.foodType}
                disabled
                className="input-field px-4 py-2 border rounded-lg w-1/2"
              />
            </div>
            <div className="flex items-center mt-2">
              <label className="text-lg font-medium mr-2">Petisco:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={dog.feeding.snackName ? dog.feeding.snackName : "Não"}
                disabled
                className="input-field px-4 py-2 border rounded-lg w-1/2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
