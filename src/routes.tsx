import { Route, Routes } from "react-router-dom";
import Login from './pages/loginPage'
import Register from './pages/registerPage'
import SchedulePage from "./pages/schedulePage";




export function AppRoutes() {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<SchedulePage />} />
        </Routes>
    );
}