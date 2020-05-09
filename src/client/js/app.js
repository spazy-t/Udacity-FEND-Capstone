//TODO: place globas in a globals.js where each has a function with nested let variables and getter / setters
//initial false boolean to be set true when input falls back to text input
let textDateInput = false
let tripsArr = []
//global object to hold trip details
let tripDeets = {  
    city: '',
    country: '',
    lat: '',
    lng: '',
    departure: '',
    image: '',
    weather: {}
}

function init() {
    document.querySelector('#submit-form').addEventListener('click', Client.handleSubmit)
    document.querySelector('.trip-list').addEventListener('click', showSavedTrip)

    if(document.querySelector('#trip-date').type === 'text') {
        //sets placeholder text to prompt correct date format
        Client.textFallBack()
        //set boolean in app.js to true so passed date can be converted
        textTruthy()
    }
}

//called from apiHandler to display stored data after all api calls
function displayTrip(displayObj, saveable) {
    //grab dom elements
    const dest = document.querySelector('.dest')
    const countDown = document.querySelector('.countdown')
    const weatherDesc = document.querySelector('#desc')
    const tempDegs = document.querySelector('#temp')
    const windDir = document.querySelector('#wind-dir')
    const wIcon = document.querySelector('#icon')

    //determines countdown days
    const countDownNum = daysToGo(displayObj.departure)

    //poulates dom elements
    dest.innerHTML = `${displayObj.city}, ${displayObj.country}`
    countDown.innerHTML = countDownNum
    weatherDesc.innerHTML = displayObj.weather.desc
    tempDegs.innerHTML = displayObj.weather.temp
    windDir.innerHTML = displayObj.weather.wind
    wIcon.setAttribute('src', `${displayObj.weather.icon}.png`)

    //display image from stored url
    console.log('app.js > displayImage: '+displayObj.image)
    const imgTag = document.querySelector('.dest-img')
    imgTag.setAttribute('src', displayObj.image)

    //as the trip search has worked and displays, allow it to be saved
    if(saveable){
        document.querySelector('#save-trip').addEventListener('click', saveTrip)
    }
}

//find out how many days to go between today and date given
//found formula @ https://stackoverflow.com/questions/2627473/how-to-calculate-the-number-of-days-between-two-dates
function daysToGo(date) {
    //if date input falls back to text then perform needed conversion of input
    if (textDateInput) {
        const replaceReg = /\//gi
        date = date.replace(replaceReg, '-')
        date = date.split('-').reverse().join('-')
    }

    const oneDay = 24 * 60 * 60 * 1000
    const today = new Date()
    const tripDay = new Date(date)

    const daysToGo = Math.round((tripDay - today) / oneDay)

    return daysToGo
}

//save current trip to server array via post method
function saveTrip(evt) {
    evt.preventDefault()
    console.log('save Trip')
    if (tripDeets.city != '') {
        storeTrip('http://localhost:3000/save-data')
        .then((allTrips) => {
            sortTrips(allTrips)
            evt.target.removeEventListener('click', saveTrip)
        })
        .catch(err => {
            alert('error trying to save trip, please try again')
        })
    }
}

//sort returned array of saved trips into order via departure date and display
function sortTrips(arrOfTrips) {
    arrOfTrips.sort((a, b) => new Date(a.departure) - new Date(b.departure))

    let negArr = []
    arrOfTrips.forEach(trip => {
        if(daysToGo(trip.departure) < 0) {
            negArr.push(trip)
        }
    })
    //if any negative days to go found reverse order and add bak onto sorted array
    //so we can display expired trips at back of list
    if (negArr.length >= 1) {
        negArr.reverse()
        negArr.forEach(neg => {
            arrOfTrips.push(neg)
            arrOfTrips.shift()
        })
    }
    //store sorted array in global to access later on item click
    tripsArr = arrOfTrips
    console.log(arrOfTrips)

    //display arrOfTrips
    const tripList = document.querySelector('.trip-list')
    const tripFrag = document.createDocumentFragment()

    for (const [i, trip] of arrOfTrips.entries()) {
        const tripObj = document.createElement('p')
        const tripDepart = daysToGo(trip.departure)
        if (tripDepart < 0) {
            tripObj.setAttribute('class', 'expired')
        }
        tripObj.setAttribute('id', i)
        tripObj.innerHTML = `${trip.city} <span>${tripDepart}</span>`
        tripFrag.appendChild(tripObj)
    }
    //clear list div and re-populate
    tripList.innerHTML = ''
    tripList.appendChild(tripFrag)
}

//check on event that it's the target that we want
function showSavedTrip(evt) {
    const listTarget = evt.target
    if(listTarget.nodeName.toLowerCase() === 'p') {
        displayTrip(tripsArr[listTarget.id], false)
    }
}

//post route to save trip into server array
const storeTrip = async (url = '') => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tripDeets)
    })

    try {
        const data = await res.json()
        return data
    } catch (e){
        console.log('error', e)
    }
}

//if formHandler - textfallback is called set a boolean to true so you can run an if statement
//in checkDate to convert string date from dd/mm/yyyy => yyyy-mm-dd?
function textTruthy() {
    textDateInput = true
}

export { displayTrip }
export { tripDeets }
export { init }
export { daysToGo }