//TODO:later you'll want to store just the original date and parsed destination
function handleApi(date, place) {
    getGeo(place)
    .then((data) => {
        parseData(data, date)
    })
    .catch(err => {
        alert('destination not found, please check and try again')
    })
}

//parses the data returned from the geo api
function parseData(tripData, date) {

    //TODO: run through options and find the one 
    //that matches country from user?
    
    const displayData = {
        city: tripData.geonames[0].name,
        country: tripData.geonames[0].countryName,
        departure: date
    }

    Client.displayTrip(displayData)
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