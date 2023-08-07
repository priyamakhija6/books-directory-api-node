const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Sample data for books (initially empty)
let books = [];

// GET all books
function getAllBooks(req,res) {
    res.status(200).json(books.sort((a,b)=>a.author.localeCompare(b.author)));
}

//GET Book by Id
function getBookById(req,res) {
    const { id } = req.params;
    const book = books.find((book)=>book.id === parseInt(id))
    if(!book) {
        res.status(404).json({message: `Book with ID ${id} not found`});
    } else {
        res.status(200).json(book);
    }
}

// Add a new book
function addNewBook(req,res) {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).json({ error: 'Both title and author are required fields.' });
    }

    const newBook = {
        id: books.length + 1,
        title,
        author,
    };
    books.push(newBook);

    res.status(201).json(books);
}

//Update contents of existing book
//Below implementation could be done through PUT as well

//You want to perform a full update of a resource, replacing it entirely with the new representation
//provided in the request body - Use PUT

//You want to perform a partial update, modifying specific fields of a resource while leaving others unchanged - Use PATCH
function updateExistingBook(req,res) {
    const {id} = req.params;
    const {title,author} = req.body;
    console.log({title,author});

    let book = books.find((book)=>book.id === parseInt(id));

    if(!book) {
        res.status(404).json({message: `Can't update book with ID# ${id} since it doesn't exist.`});
    } else {
        if(title) {
            book.title = title;
        }
        if(author) {
            book.author = author;
        }
        res.status(200).json(books);
    }
}

// Delete existing book
function deleteExistingBook(req,res) {
        const {id} = req.params;
        let bookIndex = books.findIndex((book)=>book.id === parseInt(id));

        if(bookIndex === -1)  {
            res.status(404).json({message: `Can't delete book with ID# ${id} since it doesn't exist.`});
        } else {
            books.splice(bookIndex,1);
            res.status(200).json(books);
        }
}

app.post('/book',addNewBook);
app.get('/books',getAllBooks);
app.get('/books/:id',getBookById);
app.patch('/books/:id',updateExistingBook);
app.delete('/books/:id',deleteExistingBook);
//Delete contents of existing book

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});