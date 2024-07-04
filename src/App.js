
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Login from './Login';
import BookTable from './components/BookTable';
import NavigationBar from './components/NavigationBar';
import Recommendation from './components/Recommendation';


import React, { useState }  from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // estado para gestionar si el usuario ha iniciado sesión

    // función para manejar el login exitoso
    const handleLoginSuccess = () => {
      setIsLoggedIn(true);
    };

    // función para manejar el logout
    const handleLogout = () => {
      setIsLoggedIn(false);
      localStorage.removeItem('token'); // limpiar el token de localStorage o sessionStorage
    };

  return (
    <div className="App">

        <Router>
        {isLoggedIn && <NavigationBar onLogout={handleLogout} />} 
       
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess}/>} />
            <Route path="/libros" element={<BookTable />} />
            <Route path="/recomendacion" element={<Recommendation />} />
          </Routes>
        </Router>
    </div>
);


}

export default App;
