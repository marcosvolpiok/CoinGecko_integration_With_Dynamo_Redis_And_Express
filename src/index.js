const express = require('express'),
    morgan = require('morgan'),
    app = express(),
    cors = require('cors');
const indexRoutes = require('./routes/index');
const checkAuth = require('./middlewares/checkAuth');

app.use(express.json());

require('dotenv').config();

app.set('port', process.env.PORT || 6000);

app.use(cors());

// middlewares
app.use(morgan('dev'));
app.use(checkAuth);

//Routes
app.use('/', indexRoutes);

// error handler
app.use(function(err, req, res, next){
    res.status(400).json({error: err, message: err.message});
});

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});
