import React from 'react';
import { Route, Routes, Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import { LoginPage } from '../pages/auth/loginPage';
import Register from '../pages/auth/registerPage';
import HomePage from "../pages/dashboard";
import RegisterPet from "../pages/dashboard/CadastroPet";
import RegisteredPet from "../pages/dashboard/registeredPet";
import SchedulePet from "../pages/dashboard/schedulePet";
import PrivateRoute from './privateRoutes';
import MainContent from '@/pages/dashboard/mainContent';
import { DetailsDog } from '@/pages/dashboard/detailsDog';
import FileManager from '@/pages/dashboard/tes';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="auth/register" element={<Register />} />
            <Route path="auth/login" element={<LoginPage />} />
            <Route path="teste" element={<FileManager />} />


            <Route path="/dashboard" element={<PrivateRoute />}>
                <Route element={<LayoutWithSidebar />}>
                    <Route index element={<MainContent><HomePage /></MainContent>} />
                    <Route path="cadastro-pet" element={<MainContent><RegisterPet /></MainContent>} />
                    <Route path="registro-pet" element={<MainContent><RegisteredPet /></MainContent>} />
                    <Route path="agenda-pet" element={<MainContent><SchedulePet /></MainContent>} />
                    <Route path="detailsDog/:id" element={<MainContent><DetailsDog /></MainContent>} />
                </Route>
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
