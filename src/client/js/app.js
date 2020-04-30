function formClicked(e) {
    Client.handleSubmit()
}

document.querySelector('#submit-form').addEventListener('click', formClicked)

//check if browser supports date input
const dateInput = document.querySelector('#trip-date')
if(dateInput.type === 'text') {
    dateInput.value = '2020-05-18'
}