require('dotenv').config();
const express = require("express")
const app = express()
const cookiePasrser = require('cookie-parser')
const rootRouter = require('./routes/rootRouter')
const {logRequest} = require('./middlewares/logger')
const connectDB = require('./config/connectDB')
const corsOption = require('./config/corsConfig');
const cors = require('cors')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 4000

connectDB()

app.use(logRequest)

app.use(cors(corsOption));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookiePasrser())

// Routing all routes to the rootRouter
rootRouter(app)

// Managing all undefined routes
app.use('*', (req, res) => {
    res.status(404).send('Oops! The resource your are looking for is not available!')
})

// Check if MongoDB connection is Open, then only starts the server to listen.  
mongoose.connection.once('open', () => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
        console.log(`Server is listening at port: ${PORT}`)
    })
})