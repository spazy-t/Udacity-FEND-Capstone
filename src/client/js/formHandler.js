function handleSubmit(evt) {
    evt.preventDefault()
    //TODO: validate date as if just text not date input
    //grab date from form 
    const tripDate = document.querySelector('#trip-date').value

    Client.handleApi(tripDate)
}

export { handleSubmit }