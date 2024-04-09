const express = require('express')
const router = express.Router()

const mainRouter = (app) => {


    app.use('/',
        router.get('/', (req, res) => {
            res.status(200).send('Welcome to the backend of Trade Journal for Zerodha by Rishik Sahu! We are listening and responding very fast!')
        })
    )

    // Auth related routes
    app.use('/auth', require('./auth.js'))

    // Trade journal routes
    app.use('/journal', require('./journal.js'))

    // Account routes
    app.use('/account', require('./account.js'))
}

module.exports = mainRouter