const express = require('express');

const app = express();

const postRoutes = require('./routes/post');

//Nous donne accées au Cors de la requète(Remplace Body-parser)
app.use(express.json())

// Access Header
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/post', postRoutes);

module.exports = app;