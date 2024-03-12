const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    bookId:{
        type:Number,
        required:true
    },
    author: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'borrowed'],
        default: 'available'
    },

});


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
