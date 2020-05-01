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
    .catch(err => {
        alert('destination not found, please check and try again')
    })
}

//TODO: parse weather data, dependent on current or forecast
function parseWeather(wData) {
    //if returned data has a 'count' field = current weather
    if (wData.count != undefined) {
        console.log('current weather')
    } else {
        console.log('forecast weather')
    }
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

    Client.displayTrip(displayData)
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
        console.log('error', e)
    }
}

export { handleApi }