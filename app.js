const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./API/routes/userRoutes')

// middlewares
app.use(bodyParser.urlencoded({ extends: true }))
app.use(bodyParser.json());
app.use('/api/users', userRoutes )

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, PUT');
        return res.status(200).json({})
    }
    next()
})

module.exports = app