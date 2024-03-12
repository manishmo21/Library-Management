document.addEventListener('DOMContentLoaded', function() {
    const addBookForm = document.getElementById('add-book-form');
    const bookList = document.getElementById('book-list');

    // Function to fetch books and display them
    function fetchAndDisplayBooks() {
        fetch('/api/books')
            .then(response => response.json())
            .then(books => {
                bookList.innerHTML = ''; 
                books.forEach(book => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${book.title}</td>
                        <td>${book.bookId}</td>
                        <td>${book.author}</td>
                        <td>${book.status}</td>
                        <td>
                            <button class="borrow-button action-button" data-id="${book._id}">Borrow</button>
                            <button class="return-button action-button" data-id="${book._id}">Return</button>
                            <button class="update-button action-button" data-id="${book._id}">Update</button>
                            <button class="delete-button action-button" data-id="${book._id}">Delete</button>
                        </td>
                    `;
                    bookList.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Add Book form submission
    addBookForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(addBookForm);
        const bookName = formData.get('bookName');
        const bookId = formData.get('bookId');
        const bookAuthor = formData.get('bookAuthor');

        fetch('/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: bookName, bookId: bookId, author: bookAuthor })
        })
        .then(response => response.json())
        .then(result => {
            fetchAndDisplayBooks(); // Refresh 
            addBookForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    // Handle borrow button click
    bookList.addEventListener('click', function(event) {
        if (event.target.classList.contains('borrow-button')) {
            const bookId = event.target.getAttribute('data-id');
            fetch(`/api/books/${bookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ action: 'borrow' })
            })
            .then(response => response.json())
            .then(result => {
                fetchAndDisplayBooks();
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    });

    // Handle return button click
    bookList.addEventListener('click', function(event) {
        if (event.target.classList.contains('return-button')) {
            const bookId = event.target.getAttribute('data-id');
            fetch(`/api/books/${bookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ action: 'return' })
            })
            .then(response => response.json())
            .then(result => {
                fetchAndDisplayBooks();
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    });

    // Handle update button click
bookList.addEventListener('click', function(event) {
    if (event.target.classList.contains('update-button')) {
        let bookId = event.target.getAttribute('data-id');
        const row = event.target.closest('tr');
        const title = row.cells[0].innerText;
         bookId = row.cells[1].innerText;
        const author = row.cells[2].innerText;

        // Assuming you have input fields for editing in your HTML
        const updatedTitle = prompt('Enter updated title:', title);
        const updatedBookId = prompt('Enter updated book ID:', bookId);
        const updatedAuthor = prompt('Enter updated author:', author);

        fetch(`/api/books/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: updatedTitle, bookId: updatedBookId, author: updatedAuthor })
        })
        .then(response => response.json())
        .then(result => {
            fetchAndDisplayBooks();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});

// Handle delete button click
bookList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-button')) {
        const bookId = event.target.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this book?')) {
            fetch(`/api/books/${bookId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(result => {
                fetchAndDisplayBooks();
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }
});

    // Fetch and display books on page load
    fetchAndDisplayBooks();
});
