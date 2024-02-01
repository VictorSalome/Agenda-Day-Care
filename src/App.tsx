
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from './routes';
import Login from './pages/loginPage'
import Register from './pages/registerPage'


function App() {
  return (

    <BrowserRouter>
      <AppRoutes />
      <Login />
      <Register />
    </BrowserRouter>
  )
}


export default App
