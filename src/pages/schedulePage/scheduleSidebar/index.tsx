import { useState } from "react";
import ScheduleMain from "../scheduleMain";
import { FaDog, FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdPaw } from "react-icons/io";
import { IconContext } from 'react-icons';
import { GrSchedule } from "react-icons/gr";

// Define o componente React chamado ScheduleSideBar
const ScheduleSideBar = () => {
    // Utiliza o hook de estado do React para controlar o estado "open" do menu
    const [open, setOpen] = useState(true);

    // Define uma lista de menus, cada um contendo um título e um ícone
    const Menus = [
        { title: "Cadastrar cachorro", icon: <IoMdPaw /> },
        { title: "Cachorros cadastrados", icon: <FaDog /> },
        { title: "Agendas pet", icon: <GrSchedule />, gap: true },
        { title: "Search", icon: <FaMagnifyingGlass /> },
    ];

    // Retorna a estrutura JSX do componente
    return (
        <div className="flex">
            {/* Barra lateral esquerda */}
            <div
                className={` ${open ? "w-72" : "w-20 "} bg-gray-600 h-screen p-5 pt-8 relative duration-300`}
            >
                {/* Ícone de controle para abrir/fechar o menu */}
                <img
                    src="./src/assets/control.png"
                    className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
             border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                    alt="Toggle Menu"
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
                        Painel
                    </h1>
                </div>

                {/* Lista de menus */}
                <ul className="pt-6">
                    <IconContext.Provider value={{ size: '1.5em' }}>
                        {Menus.map((menu, index) => (
                            <li
                                key={index}
                                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                    ${menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`}
                            >
                                {/* Ícone do menu */}
                                {menu.icon}
                                {/* Título do menu */}
                                <span className={`${!open && "hidden"} origin-left duration-200`}>
                                    {menu.title}
                                </span>
                            </li>
                        ))}
                    </IconContext.Provider>
                </ul>
            </div>

            {/* Área principal à direita */}
            <div className="h-screen flex-1 p-7">
                <ScheduleMain />
            </div>
        </div>
    );
}

// Exporta o componente ScheduleSideBar
export default ScheduleSideBar;
