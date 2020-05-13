//import js files
import { handleApi } from './js/apiHandler'
import { handleSubmit } from './js/formHandler'
import { textFallBack } from './js/formHandler'
import { daysToGo } from './js/app'
import { init } from './js/app'
import { tripDeets } from './js/app'
import { displayTrip } from './js/app'
import { deFocusList } from './js/app'

//import css
import './styles/form.scss'
import './styles/global.scss'
import './styles/trip-info.scss'
import './styles/base.scss'
import './styles/footer.scss'

//all icon images
//https://github.com/gatsbyjs/gatsby/issues/3663 9/05/2020
const req = require.context('./media/icons', false, /.*\.png$/);
req.keys().forEach(function(key){
    req(key);
});

//export functions to use in app
export {
    handleApi,
    handleSubmit,
    daysToGo,
    textFallBack,
    tripDeets,
    displayTrip,
    deFocusList
}

//event listeners
window.addEventListener('DOMContentLoaded', init)
