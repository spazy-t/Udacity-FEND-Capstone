//chain promises to use each api and parse the data
function handleApi(place) {
    const tripGlobal = Client.tripDeets

    getGeo(place)
    .then((data) => {
        parseGeoData(data)
    })
    .then(() => {
        const departureDays = Client.daysToGo(tripGlobal.departure)
        getWeather(departureDays)
        .then((weather) => {
            parseWeather(weather)
        })
        .then(() => {
            getImage('http://localhost:3000/pixaApi', {
                city: tripGlobal.city,
                country: tripGlobal.country
            })
            .then((imageData) => {
                parseImageData(imageData)
            })
            .then(() => {
                Client.deFocusList()
                Client.displayTrip(true)
            })
        })
    })
    .catch(err => {
        console.log('error', err)
        alert('destination not found, please check and try again')
    })
}

//parses the data returned from the geo api
function parseGeoData(tripData) {
    const tripGlobal = Client.tripDeets
    
    tripGlobal.city = tripData.geonames[0].name
    tripGlobal.country = tripData.geonames[0].countryName
    tripGlobal.lat = tripData.geonames[0].lat
    tripGlobal.lng = tripData.geonames[0].lng
}

//passed weatherBit api data is parsed and relevant bits sent to global obj
function parseWeather(wData) {
    let weatherDay
    const tripWeather = {}
    
    //if returned data has a 'count' field = current weather
    if (wData.count != undefined) {
        //current weather
        weatherDay = wData.data[0]
    } else {
        //forecast weather
        weatherDay = wData.data[wData.data.length - 1]
    }

    //populate current weather obj
    tripWeather.desc = weatherDay.weather.description
    tripWeather.temp = weatherDay.temp
    tripWeather.wind = weatherDay.wind_cdir
    tripWeather.icon = weatherDay.weather.icon

    //pass into global trip details obj
    Client.tripDeets.weather = tripWeather
}

//parse image data and grabs the url to use
function parseImageData(imageArr) {
    const imageUrl = imageArr.hits[0].webformatURL
    Client.tripDeets.image = imageUrl
}

//initial call to geonames api in server
const getGeo = async (dest) => {
    const res = await fetch('http://localhost:3000/geo/'+dest)

    try {
        const data = await res.json()
        return data
    } catch(e) {
        console.log('error > getGeo', e)
    }
}

//call to server get WeatherBit function
const getWeather = async (departure) => {
    let res
    const lat = Client.tripDeets.lat
    const lng = Client.tripDeets.lng
    //determine if future or current weather is needed from api
    if(departure < 7) {
        res = await fetch(`http://localhost:3000/current/${lat}-${lng}`)
    } else {
        res = await fetch(`http://localhost:3000/forecast/${lat}-${lng}`)
    }

    try {
        const wbData = await res.json()
        return wbData
    } catch(e) {
        console.log('error', e)
    }
} 

//send post request for image with country and city data
const getImage = async(url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    try {
        const data = await res.json()
        return data
    } catch(e) {
        console.log('error', e)
    }
}

export { handleApi }