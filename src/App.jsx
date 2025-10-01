import { BrowserRouter } from "react-router-dom"
import Rutas from "./Routers/Rutas"
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import './app.css';

function App() {

  return (
    <div className="w-screen h-screen">
      <AuthProvider>
      <BrowserRouter>
       <Navbar/>  
       <Rutas /> 
  
      </BrowserRouter>
      </AuthProvider>
      
    </div>
  )
}

export default App
