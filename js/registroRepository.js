
function getRegister(peticion, success) {
    console.log("Enviando petición de registro:", peticion);

    fetch('http://localhost:5156/User', {  
        method: 'POST',
        body: JSON.stringify(peticion),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.message || `HTTP error! Status: ${response.status}`);
            });
        }
        return response.json();
    })
    .then(json => {
        console.log("Respuesta del servidor:", json);
        success(json);
    })
    .catch(error => {
        console.error('Error en la solicitud de registro:', error.message);
        let errorLabel = document.getElementById("error_label");
        if (errorLabel) {
            errorLabel.style.display = "block";
            errorLabel.innerText = `* ${error.message}`;
        }
    });
}
