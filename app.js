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

const authRoutes = require("./routes/auth")
const tvshowsRoutes = require("./routes/tvshows")


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
app.use('/auth', authRoutes)
app.use('/tvshows', tvshowsRoutes)

// swagger documentation
const swaggerDocument = require("./swagger.json")
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))


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

// const isTest = process.env.NODE_ENV === 'test';
// const authMiddleware = isTest
//   ? require('./middleware/mockAuth')
//   : require('./middleware/auth');

// app.use(authMiddleware);


// const PORT = process.env.PORT || 3000

// app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))


module.exports = app