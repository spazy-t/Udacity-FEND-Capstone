### FEND capstone project
# Travel Planner

## Table of contents

* [Overview](#overview)
* [Instructions](#instructions)
* [Resources](#resources)
* [Notes-for-reviewer](#notes-for-reviewer)

## Overview

This is the final project (capstone) for the Udacity Front End Developer nanodegree course. It utilises three APIs (Geonames, WeatherBit, pixabay)
to grab location, weather, and a picture of a destination specified via user input. The user enters either a city and or country into the form with a date and presses submit. If the date is valid and the destination can be found, the information is used by 'Geonames' to find the city/country and its latitude and longitude.This information is then passed to 'Weatherbit' to find the current weather conditions, if the trip is within seven days, or the forecast up to 16 days (limitation due to Weatherbit without subscription) time if more than seven days away. Once this data is retrieved the city name is used via 'pixabay' to find a location image. If one can't be found then the country name is used instead. The user can then either save the trip, which will then be saved server side, and displayed as a button above the main UI. Otherwise they can remove the trip and start again. Also, if they require, they can remove any saved trip by clicking on the relevant button and then the remove button.
 
This project also includes other additional features as suggested by the project brief. Along with being able to save multiple trips, they are then ordered by departure date with the most imminent first and any expired trips at the end, which are styled differently. The use of weather icons has also been incorporated via a specified code from the WeatherBit API. And finally, local storage is used to hold currently displayed and saved trips should the user navigate away from the site or the server be disconnected.
 
This project works across all current major screen sizes via responsive design methods and uses webpack in order to minify and automate its compatibility. Other technologies used include: SASS, HTML, JavaScript ES6, babel, jest unit testing, node.js, and express.

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
