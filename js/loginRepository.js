//Todas las llamadas al login controller.
function getLogin(peticion, success, error) {
    console.log(peticion);
    fetch('http://localhost:5156/login', {
        method: 'POST',
        body: JSON.stringify(peticion),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then((response) => response.json())
        .then((json) => success(json))
        .catch((e) => console.log(e));
}