// Repositorio para realizar la solicitud POST
function getPublishing(peticion, successCallback) {
    fetch('http://localhost:5156/Publishing', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(peticion) // Convertir el objeto "peticion" a JSON
    })
        .then((response) => {
            if (!response.ok) {
                console.error("Error del servidor (texto):", error);
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then((json) => {
            // Llamar al callback con la respuesta
            successCallback(json);
        })
        .catch((error) => {
            console.error('Error al realizar la solicitud:', error);
        });
}
