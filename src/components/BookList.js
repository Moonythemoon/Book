import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/${id}`);
      // Remove the deleted book from the state
      setBooks(books.filter(book => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="BookList container">
      <div className="row">
        <div className="col-md-12">
          <h2 className="display-4 text-center">Books List</h2>
          <div className="book-count-container">
            <div className="book-count-circle"> {/* Circular container */}
              <p className="book-count"> {books.length} </p> {/* Book count */}
            </div>
          </div>
          <Link to="/create-book" className="btn btn-info float-right">+ Add New Book</Link>
        </div>
      </div>
      <div className="list">
        {books.map(book => (
          <div key={book._id} className="card-container">
            <img src={book.image || "https://images.unsplash.com/photo-1495446815901-a7297e633e8d"} alt={book.title} height="200" />
            <div className="desc">
              <h2>{book.title}</h2>
              <h3>{book.author}</h3>
              <p>{book.description}</p>
              <button onClick={() => handleDelete(book._id)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
