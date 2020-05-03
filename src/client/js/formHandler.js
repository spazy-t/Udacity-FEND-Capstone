function handleSubmit(evt) {
    evt.preventDefault()
    
    const tripDate = document.querySelector('#trip-date').value
    const tripDest = document.querySelector('#city').value

    //check validation, no empty fields, valid date format and the date is not historical
    if (tripDest === '' || tripDate === '') {
        alert('Please enter a destination and date')
        return
    } else if(!checkDate(tripDate)) {
        alert('please enter valid date')
        return
    } else if(Client.daysToGo(tripDate) < -1) {
        alert('Please enter an upcoming trip date')
        return
    }

    Client.handleApi(tripDate, tripDest)
}

//see if date matches required format, mainly for date input fallback to text
//in this case the user has to enter the date in the US format MM/DD/YYYY
function checkDate(inputDate){
    const date_text_pattern = /\d{2}\/\d{2}\/\d{4}$/
    const date_pattern = /\d{4}-\d{2}-\d{2}$/
    const replaceReg = /\//gi
    
    //if is text field and entered as above then reverse the entry
    //so the next check works for both text and date field
    if (inputDate.match(date_text_pattern)) {
        console.log('backwards text date')
        inputDate = inputDate.replace(replaceReg, '-')
        inputDate = inputDate.split('-').reverse().join('-')
        console.log('changed input: '+inputDate)
    }

    if(inputDate.match(date_pattern)){
        console.log('matches corretc pattern: '+inputDate)
        return true
    } else {
        return false
    }
}

function textFallBack() {
    document.querySelector('#trip-date').setAttribute('placeholder', 'dd/mm/yyyy')
}

export { textFallBack }
export { handleSubmit }