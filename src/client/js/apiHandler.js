const geoPlace = 'Wakefield'

function handleApi(date) {
    getGeo()
    .then((data) => {
        console.log(data.geonames[0] + ' date: ' + date)
    })
}

//initial call to geonames api in server
const getGeo = async () => {
    const res = await fetch('http://localhost:3000/geo/'+geoPlace)

    try {
        const data = await res.json()
        return data
    } catch (e){
        console.log('error', e)
    }
}

export { handleApi }