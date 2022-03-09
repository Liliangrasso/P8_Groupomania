const express = require('express');

const app = express();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user')
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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/users', userRoutes)

module.exports = app;