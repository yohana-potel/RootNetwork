
function getRegister(peticion, success) {
    console.log(peticion);
    fetch('http://localhost:5156/registro', {
        method: 'POST',
        body: JSON.stringify(peticion),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then((response) => {
       
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((json) => success(json))
    .catch((e) => {
        console.error('Error during registrar request:', e);
        
    });
}