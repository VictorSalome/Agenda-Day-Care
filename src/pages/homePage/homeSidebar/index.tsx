import { useState } from "react";
import ScheduleMain from "../homeMain";
import { FaDog, FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdPaw } from "react-icons/io";
import { IconContext } from 'react-icons';
import { GrSchedule } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

// Define o componente React chamado ScheduleSideBar
const ScheduleSideBar = () => {
    // Utiliza o hook de estado do React para controlar o estado "open" do menu
    const [open, setOpen] = useState(true);

    // Define uma lista de menus, cada um contendo um título e um ícone
    const Menus = [
        { title: "Cadastrar cachorro", icon: <IoMdPaw />, link: "/cadastro-pet" },
        { title: "Cachorros cadastrados", icon: <FaDog />, link: "/registro-pet" },
        { title: "Agendas pet", icon: <GrSchedule />, gap: true, link: "/agenda-pet" },
        { title: "Search", icon: <FaMagnifyingGlass /> },
    ];

    // Retorna a estrutura JSX do componente
    return (
        <div className="flex">
            {/* Barra lateral esquerda */}
            <div
                className={` ${open ? "w-72" : "w-20 "} bg-transparent h-screen p-5 pt-8 relative duration-300`}
            >
                {/* Ícone de controle para abrir/fechar o menu */}
                <IoIosArrowBack
                    className={`absolute cursor-pointer -right-0 top-9 w-4 border-gray-800
        border-2 rounded-full ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}

                />

                {/* Conteúdo da barra lateral */}
                <div className="flex gap-x-4 items-center">
                    {/* Logo */}
                    <img
                        src="./src/assets/logo.png"
                        className={` w-10 h-10 cursor-pointer duration-500 ${open && "rotate-[360deg] "}`}
                        alt="Logo"
                    />

                    {/* Título do painel */}
                    <h1
                        className={`text-black origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}
                    >
                        Painel Pet
                    </h1>
                </div>

                {/* Lista de menus */}
                <ul className="pt-6">
                    <IconContext.Provider value={{ size: '1.5em' }}>
                        {Menus.map((menu, index) => (
                            <li
                                key={index}
                                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-500 text-sm items-center gap-x-4 
                    ${menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-gray-900"}`}
                            >
                                <Link to={menu.link || '#'} className="flex items-center gap-x-2">
                                    {menu.icon}
                                    <span className={`${!open && "hidden"} origin-left duration-200`}>
                                        {menu.title}
                                    </span>
                                </Link>

                            </li>
                        ))}
                    </IconContext.Provider>
                </ul>
            </div>

            {/* Área principal à direita */}
            <div className="h-screen flex-1 p-0.4">
                <ScheduleMain />
            </div>
        </div>
    );
}

// Exporta o componente ScheduleSideBar
export default ScheduleSideBar;
