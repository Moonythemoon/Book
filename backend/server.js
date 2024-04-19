const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const Book = require('./models/Book');

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000'
  }));
  

mongoose.connect('mongodb://127.0.0.1:27017/BookStorage', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// API Endpoints
// Get all books
app.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single book by id
app.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.json(book);
    } catch (error) {
        res.status(404).json({ message: "Book not found" });
    }
});

// Add/save a book
app.post('/', async (req, res) => {
    const book = new Book(req.body);
    try {
        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update book by id
app.put('/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete book by id
app.delete('/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ message: "Book not found" });
    }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
