const GeocoderGeonames = require('geocoder-geonames')
const weatherbit = require('@datafire/weatherbit').create()
const PixabayApi = require('node-pixabayclient')

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

//setup pixabayclient (https://github.com/rdev5/node-pixabayclient) 04/05/2020
const PixabayPhotos = new PixabayApi({apiUrl: 'https://pixabay.com/api/'})

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
        console.log(data)
        res.send(data)
    })
    .catch((error) => {
        console.log('error', error)
    })
})

//https://www.npmjs.com/package/@datafire/weatherbit 1/05/2020
//call to weatherBit api for current weather
app.get('/current/:lat-:lng', (req, res) => {
    const lat = req.params.lat
    const lng = req.params.lng
    
    weatherbit.current_lat_lat_lon_lon.get({
        lat: Number(lat),
        lon: Number(lng),
        key: process.env.WB_KEY
    })
    .then((data) => {
        console.log('weatherbit current data')
        console.log(data)
        res.send(data)
    })
    .catch((error) => {
        console.log('error', error)
    })
})

//call to get future forecast
app.get('/forecast/:lat-:lng', (req, res) => {
    const lat = req.params.lat
    const lng = req.params.lng
    
    weatherbit.forecast.daily_lat_lat_lon_lon.get({
        lat: Number(lat),
        lon: Number(lng),
        key: process.env.WB_KEY
    })
    .then((data) => {
        console.log('weatherbit forecast data')
        //console.log(data)
        res.send(data)
    })
    .catch((error) => {
        console.log('error', error)
    })
})

//collect body info from apiHandler request and use for pixabay request
app.post('/pixaApi', (req, response) => {
    const city = req.body.city
    const country = req.body.country
    const params = {
        key: process.env.PIXA_KEY,
        q: `${city} ${country}`,
        image_type: 'photo'
    }

    function queryPixa() {
        PixabayPhotos.query(params, (err, res, req) => {
            if(err) {
                console.log('error', err)
                return
            }

            if (res.totalHits === 0) {
                params.q = `${country}`
                queryPixa()
            } else {
                response.send(res)
            }
        })
    }

    queryPixa()
})

module.exports =  { app }