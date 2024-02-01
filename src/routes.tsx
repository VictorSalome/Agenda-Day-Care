import { Route, Routes } from "react-router-dom";
import Login from './pages/loginPage'
import Register from './pages/registerPage'



export function AppRoutes() {
    return (
        <Routes>
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}