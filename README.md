### FEND capstone project
# Travel Planner

## Table of contents

* [Overview](#overview)
* [Instructions](#instructions)
* [Resources](#resources)
* [Notes-for-reviewer](#notes-for-reviewer)

## Overview



## Instructions

* Upon opening the project run `npm i` in the console to install all required dependencies.
* To open up the dev environment run `npm run build-dev`.
* To open the production environment run `npm start` and open `localhost:3000` in browser.
* To build the files run `npm build-prod` and it will produce a dist folder.
* To run Jest tests, run `npm test`.
* To use the app just place in a destination and date in the form and click submit.
* You can then choose to save or remove that trip with the corresponding buttons.
* You can also select any saves trips to display via the button just above the main UI. Once displayed you can choose to remove it from the saved trips.

## Resources

### APIs

[pixabay, images](https://pixabay.com/)

[Weatherbit, weather details](https://www.weatherbit.io/)

[GeoNames, location details](https://www.geonames.org/)

### Other

[Stackoverflow, date countdown formula](https://stackoverflow.com/questions/2627473/how-to-calculate-the-number-of-days-between-two-dates)

[Stephan Georg, geonames client](https://github.com/StephanGeorg/geocoder-geonames)

[Github, pixabay client](https://github.com/rdev5/node-pixabayclient)

[GitHub, import folder content](https://github.com/gatsbyjs/gatsby/issues/3663)

[npmjs, weatherbit client](https://www.npmjs.com/package/@datafire/weatherbit)

## Notes-for-reviewer

I decided to add in several of the optional extensions and they are:

* Pull in an image for the country from Pixabay API when the entered location brings up no results.
* Allow the user to remove the trip.
* Incorporate icons into forecast.
* Allow the user to add additional trips.
    * Automatically sort additional trips by countdown.
    * Move expired trips to bottom/have their style change so it’s clear it’s expired.
* Use Local Storage to save the data.
