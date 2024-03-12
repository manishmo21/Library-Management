const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/book');

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/library');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(express.static(__dirname));

// Routes
// Create a new book
app.post('/api/books', async (req, res) => {
    try {
        const { author, title } = req.body;
        const book = await Book.create({ title, author });
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Retrieve all books
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a book
app.put('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(book);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a book
app.delete('/api/books/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
