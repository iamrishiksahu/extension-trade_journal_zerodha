require('dotenv').config();
const express = require("express")
const app = express()
const cookiePasrser = require('cookie-parser')
const rootRouter = require('./routes/rootRouter')

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookiePasrser())

// Routing all routes to the rootRouter
rootRouter(app)

// Managing all undefined routes
app.use('*', (req, res) => {
    res.status(404).send('Oops! The resource your are looking for is not available!')
})



app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})