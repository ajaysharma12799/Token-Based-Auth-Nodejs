require('dotenv').config(); // SETUP DOTENV WHEN APPLICATION START TO LOAD ALL ENVIRONMENT VARIABLE
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// ROUTES
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT;

// MIDDLEWARE
app.use(bodyParser.json());

// CUSTOM MIDDLEWARE
app.use('/api/user', authRoutes);

// DATABASE CONNECTION
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then( () => {
    console.log('DataBase Successfully Connected');
} )
.catch( () => {
    console.log('Failed to Connect with DataBase');
} );

// STARTING SERVER
app.listen(PORT, () => {
    console.log(`Server Running at ${PORT}`)
} )