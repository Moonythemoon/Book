import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateBook() {
  const [book, setBook] = useState({ title: '', author: '', description: '' });
  const navigate = useNavigate(); // Using useNavigate hook

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000', book)
      .then(() => {
        navigate('/');  
      })
      .catch(err => console.log('Error posting book:', err));
  };

  return (
    <div className="CreateBook container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <a className="btn btn-info float-left" href="/">Show Book List</a>
          <h1 className="display-4 text-center">Add Book</h1>
          <p className="lead text-center">Create new book</p>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <input type="text" placeholder="Title of the Book" name="title" className="form-control" value={book.title} onChange={handleChange} />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Author" name="author" className="form-control" value={book.author} onChange={handleChange} />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Describe this book" name="description" className="form-control" value={book.description} onChange={handleChange} />
            </div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBook;
