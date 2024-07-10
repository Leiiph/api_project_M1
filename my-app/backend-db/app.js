// app.js
const express = require('express');
const connection = require('./connect');

const app = express();
const port = 3000;

app.use(express.json()); // Parse JSON bodies

// Get all books
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

// Update book state
app.put('/books/:id/state', (req, res) => {
    const { id } = req.params;
    const { state } = req.body;
    const query = 'UPDATE bookstate SET state = ? WHERE id = ?';
    connection.query(query, [state, id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(`Book state updated with ID: ${id}`);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});