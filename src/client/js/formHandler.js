function handleSubmit(evt) {
    evt.preventDefault()
    //TODO: validate date as if just text not date input
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