const geoPlace = 'Wakefield'
//TODO: place this in it's own js file to be called from formHandler
//initial call to geonames api in server
const startApp = async () => {
    const res = await fetch('http://localhost:3000/geo/'+geoPlace)

    try {
        const data = await res.json()
        return data
    } catch (e){
        console.log('error', e)
    }
}

//TODO: Remove this for a form based submit handled in formHandler.js 
startApp()
.then((data) => {
    console.log(data)
})