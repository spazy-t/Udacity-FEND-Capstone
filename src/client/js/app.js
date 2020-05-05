//initial false boolean to be set true when input falls back to text input
let textDateInput = false

//global object to hold trip details
let tripDeets = {  
    city: '',
    country: '',
    lat: '',
    lang: '',
    departure: '',
    image: '',
    weather: {}
}

function init() {
    document.querySelector('#submit-form').addEventListener('click', Client.handleSubmit)

    if(document.querySelector('#trip-date').type === 'text') {
        //sets placeholder text to prompt correct date format
        Client.textFallBack()
        //set boolean in app.js to true so passed date can be converted
        textTruthy()
    }
}

//called from apiHandler to display stored data after all api calls
function displayTrip() {
    //grab dom elements
    const dest = document.querySelector('.dest')
    const countDown = document.querySelector('.countdown')
    const weatherDesc = document.querySelector('#desc')
    const tempDegs = document.querySelector('#temp')
    const windDir = document.querySelector('#wind-dir')

    //determines countdown days
    const countDownNum = daysToGo(tripDeets.departure)

    //poulates dom elements
    dest.innerHTML = `${tripDeets.city}, ${tripDeets.country}`
    countDown.innerHTML = countDownNum
    weatherDesc.innerHTML = tripDeets.weather.desc
    tempDegs.innerHTML = tripDeets.weather.temp
    windDir.innerHTML = tripDeets.weather.wind

    //display image from stored url
    console.log('app.js > displayImage: '+tripDeets.image)
    const imgTag = document.querySelector('.dest-img')
    imgTag.setAttribute('src', tripDeets.image)
}

//TODO: use again later when recalling saved trips to recalculate countdown
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

//if formHandler - textfallback is called set a boolean to true so you can run an if statement
//in checkDate to convert string date from dd/mm/yyyy => yyyy-mm-dd?
function textTruthy() {
    textDateInput = true
}

export { displayTrip }
export { tripDeets }
export { init }
export { daysToGo }