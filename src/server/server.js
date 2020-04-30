const GeocoderGeonames = require('geocoder-geonames')

const dotenv = require('dotenv')
dotenv.config()

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

//setup geonames (https://github.com/StephanGeorg/geocoder-geonames, 29/04/2020)
const geoApi = new GeocoderGeonames({
    username: process.env.GEO_USERNAME,
})

//select folder for express to point to
app.use(express.static('dist'))

//port to use for localhost
app.listen(3000, () => {
    console.log('Server running on port 3000')
})

//accesses geonames api with place name in get request and returns the results
//to the app. All using geocoder
app.get('/geo/:place', (req, res) => {
    const geoPlace = req.params.place
    console.log('geo place: '+geoPlace)

    geoApi.get('search', {
        q: geoPlace,
        maxRows: 5
    })
    .then((data) => {
        res.send(data)
    })
    .catch((error) => {
        console.log('error', error)
    })
})