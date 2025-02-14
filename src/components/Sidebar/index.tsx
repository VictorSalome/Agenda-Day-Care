import React, { useState } from "react";
import { FaDog, FaMagnifyingGlass } from "react-icons/fa6";
import { IoIosArrowBack, IoMdPaw } from "react-icons/io";
import { GiDogHouse } from "react-icons/gi";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { GrSchedule } from "react-icons/gr";
import { Menu, SidebarProps } from "../../interfaces";

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(true);
  const [selectedMenu, setSelectedMenu] = useState<string>("Home");

  const Menus: Menu[] = [
    { title: "Home", icon: <GiDogHouse />, link: "/dashboard" },
    { title: "Cadastrar cachorro", icon: <IoMdPaw />, link: "/dashboard/cadastro-pet" },
    { title: "Cachorros cadastrados", icon: <FaDog />, link: "/dashboard/registro-pet" },
    {
      title: "Agenda pet",
      icon: <GrSchedule />,
      gap: true,
      link: "/dashboard/agenda-pet",
    },
    { title: "Search", icon: <FaMagnifyingGlass />, link: "/dashboard/pesquisa" },
  ];

  const handleMenuClick = (title: string) => {
    setSelectedMenu(title);
  };

  return (
    <div className="flex">
      <div
        className={` ${open ? "w-72" : "w-20 "
          } bg-transparent h-screen p-5 pt-8 relative duration-300`}
      >
        <IoIosArrowBack
          className={`absolute cursor-pointer -right-0 top-9 w-4 border-gray-800 border-2 rounded-full ${!open && "rotate-180"
            }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/logo.png"
            className={` w-10 h-10 cursor-pointer duration-500 ${open && "rotate-[360deg] "
              }`}
            alt="Logo"
          />
          <h1
            className={`text- origin-left font-medium text-xl duration-200 ${!open && "scale-0"
              }`}
          >
            Painel Pet
          </h1>
        </div>
        <ul className="pt-6">
          <IconContext.Provider value={{ size: "1.5em" }}>
            {Menus.map((menu, index) => (
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-500 text-sm items-center gap-x-4 ${menu.gap ? "mt-9" : "mt-2"
                  } ${selectedMenu === menu.title && "bg-gray-900"}`}
                onClick={() => handleMenuClick(menu.title)}
              >
                <Link
                  to={menu.link || "#"}
                  className="flex items-center gap-x-2"
                >
                  {menu.icon}
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {menu.title}
                  </span>
                </Link>
              </li>
            ))}
          </IconContext.Provider>
        </ul>
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
