//import js files
import { handleApi } from './js/apiHandler'
import { handleSubmit } from './js/formHandler'
import { textFallBack } from './js/formHandler'
import { daysToGo } from './js/app'
import { init } from './js/app'
import { tripDeets } from './js/app'
import { displayTrip } from './js/app'

//import css
import './styles/base.scss'
import './styles/global.scss'
import './styles/weather-display.scss'

//export functions to use in app
export {
    handleApi,
    handleSubmit,
    daysToGo,
    textFallBack,
    tripDeets,
    displayTrip
}

//event listeners
window.addEventListener('DOMContentLoaded', init)
