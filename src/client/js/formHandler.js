function handleSubmit(evt) {
    evt.preventDefault()
    //TODO: validate date as if just text not date input
    //grab date from form 
    const tripDate = document.querySelector('#trip-date').value

    //determine days between today and date given
    const countDownDays = daysToGo(tripDate)
    
    console.log('days to go: '+countDownDays)

    Client.handleApi(tripDate)
}

//found formula @ https://stackoverflow.com/questions/2627473/how-to-calculate-the-number-of-days-between-two-dates
function daysToGo(date) {
    const oneDay = 24 * 60 * 60 * 1000
    const today = new Date()
    const tripDay = new Date(date)

    const daysToGo = Math.round((tripDay - today) / oneDay)

    return daysToGo
}

export { handleSubmit }