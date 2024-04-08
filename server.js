const express = require("express")
const app = express()

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', (req, res) => {
    res.status(200).send('Welcome to the backend service of Trade Journal for Zerodha by Rishik Sahu!')
})

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})