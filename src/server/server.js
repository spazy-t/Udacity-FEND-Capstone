const path = require('path')
const express = require('express')

//create express server
const app = express()

//middleware
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//cross origin compatibility
const cors = require('cors')
app.use(cors())

//select folder for express to point to
app.use(express.static('src/client/views'))

//port to use for localhost
app.listen(3000, () => {
    console.log('Server running on port 3000')
})