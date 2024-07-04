import React from 'react';
import { Link } from 'react-router-dom'; 
import './NavigationBar.css'; 

const NavigationBar = () => {

    const handleLogout = () => {
        //cerramos sesión
        localStorage.removeItem('token');
        window.location.href = '/login';
      };

  return (
    <nav className="navigation-bar">
      <ul>
        <li><Link to="/libros">Ver Libros</Link></li>
        <li><Link to="/recomendacion">Recomendación</Link></li>
        <li style={{ marginLeft: 'auto' }}><Link onClick={handleLogout}>Cerrar sesión</Link></li>
      </ul>
    </nav>
  );
};

export default NavigationBar;