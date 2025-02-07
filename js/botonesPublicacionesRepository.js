function getReactions(peticion, successCallback) {
    fetch('http://localhost:5156/Reaction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(peticion) // Convertir el objeto "peticion" a JSON
    })
    .then((response) => {
        if (!response.ok) {
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
