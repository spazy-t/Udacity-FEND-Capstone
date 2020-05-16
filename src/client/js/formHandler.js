//function called on form submition
function handleSubmit(evt) {
    evt.preventDefault()
    
    const tripDate = document.querySelector('#trip-date').value
    const tripDest = document.querySelector('#city').value

    //check validation, no empty fields, valid date format
    if (tripDest === '' || tripDate === '') {
        alert('Please enter a destination and date')
        return
    } else if(!checkDate(tripDate)) {
        alert('please enter valid date')
        return
    }
    //sets trip date to global obj and starts API calls
    Client.tripDeets.departure = tripDate
    Client.handleApi(tripDest)
}

//see if date matches required format, mainly for date input fallback to text
function checkDate(inputDate) {
    const date_text_pattern = /\d{2}\/\d{2}\/\d{4}$/
    const date_pattern = /\d{4}-\d{2}-\d{2}$/
    const replaceReg = /\//gi
    
    //if is text field and entered as above then reverse the entry
    //so the next check works for both text and date field
    if (inputDate.match(date_text_pattern)) {
        inputDate = inputDate.replace(replaceReg, '-')
        inputDate = inputDate.split('-').reverse().join('-')
    }
    //checks if date enterd is valid format
    if(inputDate.match(date_pattern)) {
        return true
    } else {
        return false
    }
}
//if input field falls back to text then display placeholder text for format to enter
function textFallBack() {
    document.querySelector('#trip-date').setAttribute('placeholder', 'dd/mm/yyyy')
}

export { textFallBack }
export { handleSubmit }