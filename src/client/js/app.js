//TODO: place globas in a globals.js where each has a function with nested let variables and getter / setters
//initial false boolean to be set true when input falls back to text input
let textDateInput = false
let tripsArr = []
//global object to hold current trip details
let tripDeets = {  
    city: '',
    country: '',
    lat: '',
    lng: '',
    departure: '',
    image: '',
    weather: {}
}

/**
 * Helpers
 */

//clear trip info helper
function clearTripUi() {
    document.querySelector('.dest-img').setAttribute('style', 'display: none')
    document.querySelector('.dest-weather').setAttribute('style', 'display: none')
    document.querySelector('#time-place').setAttribute('style', 'display: none')
    document.querySelector('#start-prompt').removeAttribute('style')
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

//helps showSavedTrip function by adding and removing relevant listeners before displaying
function showSavedHelper(tripBtn) {
    const saveBtn = document.querySelector('#save-trip')
    const removeBtn = document.querySelector('#remove-trip')
    //remove unneeded listeners
    saveBtn.removeEventListener('click', saveTrip)
    removeBtn.addEventListener('click', removeTrip)
    //deactivate save btn and activate remove btn
    saveBtn.classList.add('inactive')
    removeBtn.classList.remove('inactive')

    //take off purple border from previously selected before adding to currently selected
    deFocusList()
    tripBtn.setAttribute('style', ('border-color: #a805f3'))
    localStorage.setItem('btnFocus', tripBtn.id)

    //show saved trip
    displayTrip(false)
}

function deFocusList() {
    document.querySelector('.trip-list').querySelectorAll('p').forEach(btn => {
        btn.removeAttribute('style')
    })
}

//if formHandler - textfallback is called set a boolean to true so you can run an if statement
//in checkDate to convert string date from dd/mm/yyyy => yyyy-mm-dd?
function textTruthy() {
    textDateInput = true
}

 /**
  * Main functions
  */

function init() {
    document.querySelector('#submit-form').addEventListener('click', Client.handleSubmit)
    document.querySelector('.trip-list').addEventListener('click', showSavedTrip)
    document.querySelector('#save-trip').classList.add('inactive')
    document.querySelector('#remove-trip').classList.add('inactive')

    if(document.querySelector('#trip-date').type === 'text') {
        //sets placeholder text to prompt correct date format
        Client.textFallBack()
        //set boolean in app.js to true so passed date can be converted
        textTruthy()
    }

    //hide default labels etc on startup
    clearTripUi()

    //checks to see if a displayed trip has been saved in browser storage, if so = display
    if(localStorage.getItem('currentTrip')) {
        tripDeets = JSON.parse(localStorage.getItem('currentTrip'))
        const toSave = JSON.parse(localStorage.getItem('toSave'))
        displayTrip(toSave)
    }

    //grab any saved trips, if any, and display on strt up of app
    getSavedTrips('http://localhost:3000/trips')
    .then((storedTrips) => {
        if (storedTrips.length > 0) {
            sortTrips(storedTrips)
            if(localStorage.getItem('btnFocus')){
                document.getElementById(localStorage.getItem('btnFocus')).setAttribute('style', ('border-color: #a805f3'))
            }
        }
    })
    .catch(err => {
        console.log('error', err)
    })
}

//called from various point to display current or selected trip
function displayTrip(saveable) {
    //make sure main elements are visible
    document.querySelector('.dest-img').removeAttribute('style')
    document.querySelector('.dest-weather').removeAttribute('style')
    document.querySelector('#time-place').removeAttribute('style')
    document.querySelector('#start-prompt').setAttribute('style', 'display: none')

    //grab dom elements
    const dest = document.querySelector('.dest')
    const countDown = document.querySelector('.countdown')
    const weatherDesc = document.querySelector('#desc')
    const tempDegs = document.querySelector('#temp')
    const windDir = document.querySelector('#wind-dir')
    const wIcon = document.querySelector('#icon')
    const disclaim = document.querySelector('#disclaimer')

    countDown.removeAttribute('style')
    disclaim.innerHTML = '(Current Weather)'
    //determines countdown days, if below 0 make countdown red
    const countDownNum = daysToGo(tripDeets.departure)
    if(countDownNum < 0) {
        countDown.setAttribute('style', 'color: red')
    } else if(countDownNum >= 7) {
        disclaim.innerHTML = '(Weather is up to 16 days from today)'
    }

    //poulates dom elements
    dest.innerHTML = `${tripDeets.city}, ${tripDeets.country}`
    countDown.innerHTML = countDownNum
    weatherDesc.innerHTML = tripDeets.weather.desc
    tempDegs.innerHTML = `${tripDeets.weather.temp}&deg;C`
    windDir.innerHTML = `wind: ${tripDeets.weather.wind}`
    wIcon.setAttribute('src', `media/${tripDeets.weather.icon}.png`)

    //display image from stored url
    console.log('app.js > displayImage: '+tripDeets.image)
    const imgTag = document.querySelector('.dest-img')
    imgTag.setAttribute('src', tripDeets.image)

    //saves displayed trip in local storage for user if they navigate away from page
    localStorage.setItem('currentTrip', JSON.stringify(tripDeets))

    //as the trip search has worked and displays, allow it to be saved
    if(saveable){
        const removeBtn = document.querySelector('#remove-trip')
        const saveBtn = document.querySelector('#save-trip')

        saveBtn.addEventListener('click', saveTrip)
        removeBtn.removeEventListener('click', removeTrip)

        saveBtn.classList.remove('inactive')
        removeBtn.classList.add('inactive')

        localStorage.removeItem('btnFocus')
        localStorage.setItem('toSave', JSON.stringify(true))
    } else {
        const removeBtn = document.querySelector('#remove-trip')

        removeBtn.addEventListener('click', removeTrip)
        removeBtn.classList.remove('inactive')
        localStorage.setItem('toSave', JSON.stringify(false))
    }
}

//save current trip to server array via post method
function saveTrip(evt) {
    evt.preventDefault()
    console.log('save Trip')
    if (tripDeets.city != '') {
        sendTrip('http://localhost:3000/save-data', tripDeets)
        .then((allTrips) => {
            sortTrips(allTrips)
            evt.target.removeEventListener('click', saveTrip)
            evt.target.classList.add('inactive')

            const removeBtn = document.querySelector('#remove-trip')
            removeBtn.addEventListener('click', removeTrip)
            removeBtn.classList.remove('inactive')
            
            localStorage.setItem('toSave', JSON.stringify(false))
            //loop over tripArr to match btn and highlight it accordingly
            for (const [i, trip] of tripsArr.entries()) {
                if(trip.city === tripDeets.city && trip.departure === tripDeets.departure) {
                    document.getElementById(i).setAttribute('style', ('border-color: #a805f3'))
                    localStorage.setItem('btnFocus', i)
                }
            }
        })
        .catch(err => {
            console.log('error', err)
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

    console.log('show saved')
    console.log(tripsArr.length)
    console.log(tripsArr)

    //have to stringify and parse the tripsArr to avoid deep referencing
    //and having the entry overwritten when a new trip is searched
    if(listTarget.nodeName.toLowerCase() === 'p') {
        tripDeets = JSON.parse(JSON.stringify(tripsArr[listTarget.id]))
        showSavedHelper(evt.target)
    } else if(listTarget.nodeName.toLowerCase() === 'span') {
        tripDeets = JSON.parse(JSON.stringify(tripsArr[listTarget.parentNode.id]))
        showSavedHelper(evt.target.parentNode)
    }
}

function removeTrip(evt) {
    evt.target.classList.add('inactive')
    evt.target.removeEventListener('click', removeTrip)
    console.log('remove trip:')
    console.log(tripDeets)

    //call async to delete from server
    sendTrip('http://localhost:3000/delete-trip', tripDeets)
    .then((amendedTrips) => {
        sortTrips(amendedTrips)
        clearTripUi()
        tripDeets = {}
        localStorage.removeItem('currentTrip')
        localStorage.removeItem('toSave')
        localStorage.removeItem('btnFocus')
    })
    .catch(err => {
        console.log('err', err)
        alert('error deleting trip please try again')
    })
}

/**
 * async
 */

//post route to save trip into server array
const sendTrip = async (url = '', data = {}) => {
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
    } catch (e){
        console.log('error', e)
    }
}

//get request to retrieve saved trips
const getSavedTrips = async (url = '') => {
    const res = await fetch(url)

    try {
        const data = await res.json()
        return data
    } catch (e){
        console.log('error > getSavedTrips', e)
    }
}

export { displayTrip }
export { tripDeets }
export { init }
export { daysToGo }
export { deFocusList }