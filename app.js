require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Setup environment
const app = express();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI

// init server
mongoose.connect(DB_URI, {}, () => console.log('connected to db'));
mongoose.connection.on('error', (err) => console.log(err))
app.listen(PORT);

// Global middlwares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes::


// -- /api/auth.. contains
// -- login & signup
app.use('/api/auth', require('./routes/auth'));
