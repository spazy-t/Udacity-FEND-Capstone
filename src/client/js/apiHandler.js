const geoPlace = 'Wakefield'
//TODO:later you'll want to store just the original date and parsed destination
function handleApi(date) {
    getGeo()
    .then((data) => {
        parseData(data, date)
    })
}

//parses the data returned from the geo api
function parseData(tripData, date) {
    
    const displayData = {
        city: tripData.geonames[0].name,
        country: tripData.geonames[0].countryName,
        departure: date
    }

    Client.displayTrip(displayData)
}

//initial call to geonames api in server
const getGeo = async () => {
    const res = await fetch('http://localhost:3000/geo/'+geoPlace)

    try {
        const data = await res.json()
        return data
    } catch (e){
        console.log('error', e)
    }
}

export { handleApi }