const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Create a new book
router.post('/', async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Retrieve all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a book's status (borrow/return)
router.put('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book.status === 'available') {
            book.status = 'borrowed';
        } else {
            book.status = 'available';
        }
        await book.save();
        res.json(book);
    } catch (err) {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Update a book
router.patch('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(book);
    } catch (err) {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Delete a book
router.delete('/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(404).json({ message: 'Book not found' });
    }
});

module.exports = router;
