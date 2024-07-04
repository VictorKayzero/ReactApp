import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookTable.css'; 


const BookTable = () => {
    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false); 
    const [selectedBook, setSelectedBook] = useState(null); // estado para el libro seleccionado
    const [userType, setUserType] = useState('');

    useEffect(() => {
    // obtener el tipo de usuario desde localStorage
    const storedUserType = localStorage.getItem('userType');
    console.log(storedUserType);
    setUserType(storedUserType);

      fetchBooks();
    }, []);
    const isAdmin = userType === 'Administrador';

    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/libros');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
  
    const handleDeleteBook = async (id) => {
      try {
        await axios.delete(`http://localhost:8081/api/libros/${id}`);
        // actualizar la lista de libros
        fetchBooks();
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    };
  
    const handleUpdateBook = (book) => {
      setSelectedBook(book); // guardar el libro seleccionado en el estado
      setShowModal(true); // mostrar el modal
    };
  
    const closeModal = () => {
      setShowModal(false);
      setSelectedBook(null);
    };
  
    const handleUpdateSubmit = async () => {
      try {
        const response = await axios.put(`http://localhost:8081/api/libros/${selectedBook.id}`, selectedBook);
        console.log('Updated book:', response.data); 
        fetchBooks(); // actualizar la lista de libros 
        closeModal(); 
      } catch (error) {
        console.error('Error updating book:', error);
      }
    };
  
    return (
      <div>
        <h2>Lista de Libros</h2>
        <table className="book-table"> 
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
             {isAdmin && ( <th>Acciones</th> )}
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                <td>{book.titulo}</td>
                <td>{book.autor}</td>
                {isAdmin && (
                  <td>
                    
                    <button className="btn-delete" onClick={() => handleDeleteBook(book.id)}>Eliminar</button> 
                    <button className="btn-update" onClick={() => handleUpdateBook(book)}>Actualizar</button> 
                    
                  </td>
                )}

              </tr>
            ))}
          </tbody>
        </table>
  
      {/* Modal para actualizar libro */}
      {showModal && selectedBook && (
        <div className="modal-container">
          <div className="modal">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Actualizar Libro</h2>
            <form onSubmit={handleUpdateSubmit}>
              <label>Título:</label>
              <input type="text" value={selectedBook.titulo} onChange={(e) => setSelectedBook({ ...selectedBook, titulo: e.target.value })} />

              <label>Autor:</label>
              <input type="text" value={selectedBook.autor} onChange={(e) => setSelectedBook({ ...selectedBook, autor: e.target.value })} />

              <button type="submit">Actualizar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

  export default BookTable;