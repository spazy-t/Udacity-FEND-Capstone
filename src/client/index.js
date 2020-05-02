//import js files
import { handleApi } from './js/apiHandler'
import { handleSubmit } from './js/formHandler'
import { textFallBack } from './js/formHandler'
import { displayTrip } from './js/app'
import { daysToGo } from './js/app'

//import css
import './styles/base.scss'

//export functions to use in app
export {
    handleApi,
    handleSubmit,
    displayTrip,
    daysToGo,
    textFallBack
}

//event listeners
window.onload = () => {
    document.querySelector('#submit-form').addEventListener('click', Client.handleSubmit)

    if(document.querySelector('#trip-date').type === 'text') {
        Client.textFallBack()
        //TODO:set boolean in app.js to true so passed date can be converted
    }
}
