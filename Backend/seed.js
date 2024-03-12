const mongoose = require('mongoose');
const Book = require('./models/book');

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/library', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
    console.log('Connected to MongoDB');

    // Seed featured books
    const featuredBooks = [
        {
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            status: 'available'
        },
        {
            title: '1984',
            author: 'George Orwell',
            status: 'available'
        },
        {
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            status: 'available'
        },
        {
            title: 'Pride and Prejudice',
            author: 'Jane Austen',
            status: 'available'
        },
        {
            title: 'The Catcher in the Rye',
            author: 'J.D. Salinger',
            status: 'available'
        },
        {
            title: 'The Catcher in the Rye',
            author: 'J.D. Salinger',
            status: 'available'
        }
    ];

    try {
        await Book.insertMany(featuredBooks);
        console.log('Featured books seeded successfully');
        db.close();
    } catch (err) {
        console.error('Error seeding featured books:', err);
        db.close();
    }
});
