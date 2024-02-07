const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'new_user',
    password: 'password',
    database: 'pdv'
});

// Connect to the MySQL server
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL server: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL server');
});

// Query the database
app.get('/produtos', (req, res) => {
    const query = 'SELECT * FROM pdv.tb_produtos;';
    console.log(query);

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).send('Error retrieving data from database');
            return;
        }
        res.json(results);
    });
});

app.get('/formasPagamentos', (req, res) => {
    const query = 'SELECT * FROM pdv.tb_formas_pagamento;';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).send('Error retrieving data from database');
            return;
        }
        res.json(results);
    });
});

app.get('/clientes', (req, res) => {
    const query = 'SELECT * FROM pdv.tb_pessoas;';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).send('Error retrieving data from database');
            return;
        }
        res.json(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
