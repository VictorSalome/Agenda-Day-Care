import React, { useState, useEffect } from 'react';

interface Dog {
    name: string;
    breed: string;
    color: string;
    gender: string;
    birthDate: string;
    age: string;
    ownerName: string;
    feeding: {
        foodType: string;
        feedingFrequency: string;
        serveSnack: boolean;
        snackName: string;
    };
    profileImage: File | null | undefined;
}

interface FormState {
    dog: Dog;
}

const AddDogForm: React.FC = () => {
    const [formState, setFormState] = useState<FormState>({
        dog: {
            name: '',
            breed: '',
            color: '',
            gender: '',
            birthDate: '',
            age: '',
            ownerName: '',
            feeding: {
                foodType: '',
                feedingFrequency: '',
                serveSnack: false,
                snackName: '',
            },
            profileImage: null,
        },
    });

    // Função para tratar o campo de gênero
    const handleGenderChange = (value: string) => {
        setFormState((prevFormState) => ({
            ...prevFormState,
            dog: {
                ...prevFormState.dog,
                gender: value,
            },
        }));
    };

    // Função para tratar o campo de tipo de alimentação
    const handleFoodTypeChange = (value: string) => {
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

    // Função para tratar o campo de frequência de alimentação
    const handleFeedingFrequencyChange = (value: string) => {
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

    // Função principal handleInputChange
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = event.target;

        setFormState((prevFormState) => {
            if (type === 'checkbox') {
                const checkboxValue = (event.target as HTMLInputElement).checked;

                return {
                    ...prevFormState,
                    dog: {
                        ...prevFormState.dog,
                        feeding: {
                            ...prevFormState.dog.feeding,
                            serveSnack: checkboxValue,
                            snackName: checkboxValue ? prevFormState.dog.feeding.snackName : '',
                        },
                    },
                };
            }

            if (type === 'select-one') {
                switch (name) {
                    case 'gender':
                        handleGenderChange(value);
                        break;
                    case 'foodType':
                        handleFoodTypeChange(value);
                        break;
                    case 'feedingFrequency':
                        handleFeedingFrequencyChange(value);
                        break;
                    default:
                        break;
                }

                return prevFormState; // Retorna o estado sem alterações no objeto dog
            }

            // Tratamento específico para o campo 'snackName'
            if (name === 'snackName') {
                return {
                    ...prevFormState,
                    dog: {
                        ...prevFormState.dog,
                        feeding: {
                            ...prevFormState.dog.feeding,
                            snackName: value,
                        },
                    },
                };
            }

            // Se não for checkbox, select-one, snackName ou gender, trata como input de texto padrão
            return {
                ...prevFormState,
                dog: {
                    ...prevFormState.dog,
                    [name]: value,
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
                    age: isNaN(age) ? '' : `${age} anos`,
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
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-600 to-blue-600">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-4 sm:p-6 md:p-8 rounded shadow-md w-full sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-"
                encType="multipart/form-data"
            >
                <h1 className="text-3xl font-bold text-indigo-600 mb-4 text-center">Cadastro de Pets</h1>
                <h2 className="text-lg text-gray-700 mb-4">Dados do Pet</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
                            Foto do Pet
                        </label>
                        <input
                            type="file"
                            name="profileImage"
                            id="profileImage"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="dogName" className="block text-sm font-medium text-gray-700">
                            Nome do Pet
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="dogName"
                            value={formState.dog.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="dogBreed" className="block text-sm font-medium text-gray-700">
                            Raça
                        </label>
                        <input
                            type="text"
                            name="breed"
                            id="dogBreed"
                            value={formState.dog.breed}
                            onChange={handleInputChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="dogColor" className="block text-sm font-medium text-gray-700">
                            Cor
                        </label>
                        <input
                            type="text"
                            name="color"
                            id="dogColor"
                            value={formState.dog.color}
                            onChange={handleInputChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="dogGender" className="block text-sm font-medium text-gray-700">
                            Sexo
                        </label>
                        <select
                            name="gender"
                            id="dogGender"
                            value={formState.dog.gender}
                            onChange={handleInputChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Selecione...</option>
                            <option value="macho">Macho</option>
                            <option value="femea">Fêmea</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="dogBirthDate" className="block text-sm font-medium text-gray-700">
                            Data de Nascimento
                        </label>
                        <input
                            type="date"
                            name="birthDate"
                            id="dogBirthDate"
                            value={formState.dog.birthDate}
                            onChange={handleInputChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="dogAge" className="block text-sm font-medium text-gray-700">
                            Idade
                        </label>
                        <input
                            type="text"
                            name="age"
                            id="dogAge"
                            value={formState.dog.age}
                            readOnly
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
                            Nome do Proprietário
                        </label>
                        <input
                            type="text"
                            name="ownerName"
                            id="ownerName"
                            value={formState.dog.ownerName}
                            onChange={handleInputChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
                <h2 className="text-lg text-gray-700 mb-4 mt-8">Alimentação</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="foodType" className="block text-sm font-medium text-gray-700">
                            Tipo de Alimentação
                        </label>
                        <select
                            name="foodType"
                            id="foodType"
                            value={formState.dog.feeding.foodType}
                            onChange={handleInputChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="" disabled hidden>
                                Selecione...
                            </option>
                            <option value="comida">Comida Natural</option>
                            <option value="racao">Ração</option>
                            <option value="comidaNaturalRacao">As duas opções</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="feedingFrequency" className="block text-sm font-medium text-gray-700">
                            Frequência de Alimentação
                        </label>
                        <select
                            name="feedingFrequency"
                            id="feedingFrequency"
                            value={formState.dog.feeding.feedingFrequency}
                            onChange={handleInputChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="" disabled hidden>
                                Selecione...
                            </option>
                            <option value="1x">1x ao dia</option>
                            <option value="2x">2x ao dia</option>
                            <option value="3x">3x ao dia</option>
                            <option value="4x">4x ao dia</option>
                        </select>
                    </div>
                    <div className="flex-1 space-y-2">
                        <label htmlFor="serveSnack" className="block text-sm font-medium text-gray-700">
                            Servir Petisco
                        </label>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="serveSnack"
                                id="serveSnackYes"
                                checked={formState.dog.feeding.serveSnack}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            <span className="text-sm text-gray-700">Sim</span>
                        </div>
                    </div>
                    {formState.dog.feeding.serveSnack && (
                        <div className="space-y-2">
                            <label htmlFor="snackName" className="block text-sm font-medium text-gray-700">
                                Nome do Petisco
                            </label>
                            <input
                                type="text"
                                name="snackName"
                                id="snackName"
                                value={formState.dog.feeding.snackName}
                                onChange={handleInputChange}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-8"
                >
                    Cadastrar Pet
                </button>
            </form>
        </div>
    );
};

export default AddDogForm;
