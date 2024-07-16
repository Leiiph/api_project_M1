// app.js
const express = require('express');
const connection = require('./connect');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());
const port = 3000;

app.use(bodyParser.json());

// ALL BOOKS - TO BE TRANSFORMED INTO A GRAPHQL
app.get('/books', (req, res) => {
    const query = 'SELECT * FROM bookstate';
    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(results);
        }
    });
});


// Get all books' names - used to displa them
app.get('/books/names', (req, res) => {
    const query = 'SELECT name FROM bookstate';
    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).send
        }
        else {
            res.status(200).json(results);
        }
    }
    );
});

// Update book state
app.put('/books/:id/state', (req, res) => {
    const { id } = req.params;
    const { state } = req.body;
    const query = 'UPDATE bookstate SET state = ? WHERE id_book = ?';
    connection.query(query, [state, id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(`Book state updated with ID: ${id}`);
        }
    });
});


// Add a book
app.post('/books/add', (req, res) => {
    const { name, author, state } = req.body;
    const query = 'INSERT INTO bookstate (name, author, state) VALUES (?, ?, ?)';
    connection.query(query, [name, author, state], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(`Book added with ID: ${results.insertId}`);
        }
    });
});

// Fetch the name of the book, to be used to delete a book

app.post('/books/name/deletion', (req, res) => {
    const { name } = req.body;
    const query = 'DELETE FROM bookstate WHERE name= (?)';
    connection.query(query, [name], (err, results) => {
        if (err) {
            res.status(500).send(err + 'name not found');
        } else {
            res.status(200).send(`Book added with ID: ${results.insertId}`);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});