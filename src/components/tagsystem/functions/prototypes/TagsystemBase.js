const localFunctions = {
  init () {
    this.http
      .post('/db/tagsystemvue', {
        getBase: 1
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err)
        alert('Fehler!')
      })
  }
}

export default localFunctions
