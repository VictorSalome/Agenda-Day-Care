import { Route, Routes } from "react-router-dom";
import Login from './pages/loginPage'
import Register from './pages/registerPage'
import HomePage from "./pages/homePage";
import RegisterPet from "./pages/homePage/registerPet";
import RegisteredPet from "./pages/homePage/registeredPet";
import SchedulePet from "./pages/homePage/schedulePet";




export function AppRoutes() {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/cadastro-pet" element={<RegisterPet />} />
            <Route path="/registro-pet" element={<RegisteredPet />} />
            <Route path="/agenda-pet" element={<SchedulePet />} />
        </Routes>
    );
}