const express = require('express')
const router = express.Router()

router.post('/login', (req, res) => {
    res.status(200).json({message: 'Working'})
})

router.post('/signup', (req, res) => {
    
})

router.post('/resetPassword', (req, res) => {

})
router.get('/refresh', (req, res) => {

})
router.get('/logout', (req, res) => {

})

module.exports = router