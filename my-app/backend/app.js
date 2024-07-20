// app.js
const express = require('express');
const connection = require('./connect');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const fs = require('fs').promises;
const path = require('path');
const port = 3000;

app.use(bodyParser.json());

// GOOGLE OATH
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/tasks.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
      return client;
    }
    client = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
      await saveCredentials(client);
    }
    return client;
  }
  

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