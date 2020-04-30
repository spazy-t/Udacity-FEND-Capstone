function handleSubmit(evt) {
    evt.preventDefault()

    console.log('handle submit')
    Client.getGeo()
    .then((data) => {
        console.log(data)
    })
}

export { handleSubmit }