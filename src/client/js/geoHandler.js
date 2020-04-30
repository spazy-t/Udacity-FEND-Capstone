const geoPlace = 'Wakefield'

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

export { getGeo }