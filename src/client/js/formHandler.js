function handleSubmit(evt) {
    evt.preventDefault()
    //TODO: validate date as if just text not date input
    //TODO: make sure date is either today or in future only
    //grab date from form 
    const tripDate = document.querySelector('#trip-date').value
    const tripDest = document.querySelector('#city').value

    if (tripDest === '') {
        alert('Please enter a destination')
        return
    }

    Client.handleApi(tripDate, tripDest)
}

export { handleSubmit }