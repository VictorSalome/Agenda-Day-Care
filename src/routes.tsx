import React from 'react';
import { Route, Routes, Outlet } from "react-router-dom";
import Sidebar from './components/Sidebar';
import MainContent from './pages/homePage/mainContent';
import { LoginPage } from './pages/auth/loginPage';
import Register from './pages/auth/registerPage';
import HomePage from "./pages/homePage";
import RegisterPet from "./pages/homePage/CadastroPet";
import RegisteredPet from "./pages/homePage/registeredPet";
import SchedulePet from "./pages/homePage/schedulePet";
import { DetailsDog } from './pages/detailsDog';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="auth/register" element={<Register />} />
            <Route path="auth/login" element={<LoginPage />} />
            <Route path="/" element={<LayoutWithSidebar />}>
                <Route index element={<MainContent><HomePage /></MainContent>} />
                <Route path="cadastro-pet" element={<MainContent><RegisterPet /></MainContent>} />
                <Route path="registro-pet" element={<MainContent><RegisteredPet /></MainContent>} />
                <Route path="agenda-pet" element={<MainContent><SchedulePet /></MainContent>} />
                <Route path="detailsDog/:id" element={<MainContent><DetailsDog /></MainContent>} />
            </Route>
        </Routes>
    );
}

const LayoutWithSidebar: React.FC = () => {
    return (
        <Sidebar>
            <Outlet />
        </Sidebar>
    );
}

export default AppRoutes;
