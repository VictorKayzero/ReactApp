import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Recommendation = () => {
  const [randomBookText, setRandomBookText] = useState('');

  const fetchRandomBook = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/libros/random');
      setRandomBookText(response.data); 

    } catch (error) {
      console.error('Error fetching random book:', error);
    }
  };

  // Se ejecuta una vez al levantar el componente
  useEffect(() => {
    fetchRandomBook();
  }, []); 

  const handleRefresh = () => {
    fetchRandomBook();
  };

  return (
    <div>
      <h2>Recomendación de Libro al Azar</h2>
      <div>
        <p>{randomBookText}</p>
      </div>
      <button onClick={handleRefresh}>Obtener otro libro al azar</button>
    </div>
  );
};

export default Recommendation;
