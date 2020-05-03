//initial false boolean to be set true when input falls back to text input
let textDateInput = false

//takes in parsed data from apiHandler
function displayTrip(parsedData) {
    const dest = document.querySelector('.destination')
    const countDown = document.querySelector('.countdown')
    //determines countdown days
    const countDownNum = daysToGo(parsedData.departure)
    //poulates dom elements
    dest.innerHTML = `${parsedData.city}, ${parsedData.country}`
    countDown.innerHTML = countDownNum
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

export { textTruthy }
export { displayTrip }
export { daysToGo }