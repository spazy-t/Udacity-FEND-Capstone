let displayData = {}

//TODO:later you'll want to store just the original date and parsed destination
function handleApi(date, place) {
    getGeo(place)
    .then((data) => {
        parseGeoData(data, date)
    })
    .then(() => {
        const departureDays = Client.daysToGo(date)
        getWeather(displayData.lat, displayData.lng, departureDays)
        .then((weather) => {
            parseWeather(weather)
        })
    })
    .then(() => {
        getImage('http://localhost:3000/pixaApi', {
            city: displayData.city,
            country: displayData.country
        })
        .then((imageData) => {
            parseImageData(imageData)
        })
    })
    .catch(err => {
        alert('destination not found, please check and try again')
    })
}

//TODO: parse weather data, dependent on current or forecast
function parseWeather(wData) {
    let weatherDay
    //grab relevant dom objects to populate
    const weatherDesc = document.querySelector('#desc')
    const weatherTemp = document.querySelector('#temp')
    const weatherDir = document.querySelector('#wind-dir')
    //if returned data has a 'count' field = current weather
    if (wData.count != undefined) {
        console.log('current weather')
        weatherDay = wData.data[0]
    } else {
        console.log('forecast weather')
        weatherDay = wData.data[wData.data.length - 1]
    }

    //populate dom elements
    weatherDesc.innerHTML = weatherDay.weather.description
    weatherTemp.innerHTML = weatherDay.temp
    weatherDir.innerHTML = weatherDay.wind_cdir

}

//parses the data returned from the geo api
function parseGeoData(tripData, date) {

    //TODO: run through options and find the one 
    //that matches country from user?
    
    displayData = {
        city: tripData.geonames[0].name,
        country: tripData.geonames[0].countryName,
        departure: date,
        lat: tripData.geonames[0].lat,
        lng: tripData.geonames[0].lng
    }
    //send to app.js to display
    Client.displayTrip(displayData)
}

//parse image data and grab a url to use
function parseImageData(imageArr) {
    const imageUrl = imageArr.hits[0].webformatURL
    displayData.image = imageUrl
    //send image url to app.js to display
    Client.displayImage(imageUrl)
}

//call to server get WeatherBit function
const getWeather = async (lat, lng, departure) => {
    let res
    //determine if future or current weather is needed from api
    if(departure < 7) {
        res = await fetch(`http://localhost:3000/current/${lat}-${lng}`)
    } else {
        res = await fetch(`http://localhost:3000/forecast/${lat}-${lng}`)
    }

    try {
        const wbData = await res.json()
        return wbData
    } catch (e) {
        console.log('error', e)
    }
} 

//initial call to geonames api in server
const getGeo = async (dest) => {
    const res = await fetch('http://localhost:3000/geo/'+dest)

    try {
        const data = await res.json()
        return data
    } catch (e){
        console.log('error > getGeo', e)
    }
}
//send post request for image with country and city info
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
        console.log('get Image')
        console.log(data)
        return data
    } catch (e){
        console.log('error', e)
    }
}

export { handleApi }