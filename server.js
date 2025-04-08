const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const passport = require('passport')
const session = require('express-session')
const connectDB = require('./config/db')
const swaggerUi = require('swagger-ui-express');
const cors = require('cors')

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config 
require('./config/passport')(passport)

connectDB()

const app = express()

// Body parser
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// sessions
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


// Static folder
app.use(express.static(path.join(__dirname, 'public')))



// Routes
app.use('/', require('./routes'))
app.use('/auth', require('./routes/auth'))
app.use('/tvshows', require('./routes/tvshows'))


// Basic routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
  } else {
    res.redirect('/login.html');
  }
});

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))


