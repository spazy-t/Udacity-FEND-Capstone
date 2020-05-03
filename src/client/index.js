//import js files
import { handleApi } from './js/apiHandler'
import { handleSubmit } from './js/formHandler'
import { textFallBack } from './js/formHandler'
import { displayTrip } from './js/app'
import { daysToGo } from './js/app'
import { textTruthy } from './js/app'

//import css
import './styles/base.scss'
import './styles/global.scss'
import './styles/weather-display.scss'

//export functions to use in app
export {
    handleApi,
    handleSubmit,
    displayTrip,
    daysToGo,
    textFallBack,
    textTruthy
}

//event listeners
window.onload = () => {
    document.querySelector('#submit-form').addEventListener('click', Client.handleSubmit)

    if(document.querySelector('#trip-date').type === 'text') {
        //sets placeholder text to prompt correct date format
        Client.textFallBack()
        //set boolean in app.js to true so passed date can be converted
        Client.textTruthy()
    }
}
