function formClicked(e) {
    Client.handleSubmit()
}

//listen for form submit click and handle
document.querySelector('#submit-form').addEventListener('click', formClicked)