const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    status: { type: String, enum: ['available', 'borrowed'], default: 'available' }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
