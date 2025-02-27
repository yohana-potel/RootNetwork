document.addEventListener("DOMContentLoaded", () => {
    const nombreUsuario = document.getElementById("nombreUsuario");
    
    // Obtener el nombre y apellido desde localStorage
    const userName = localStorage.getItem("userName");
    const lastName = localStorage.getItem("lastName");

    // Comprobar si tanto el nombre como el apellido están disponibles
    if (userName && lastName) {
        nombreUsuario.textContent = `${userName} ${lastName}`;  // Mostrar nombre + apellido
    } else {
        nombreUsuario.textContent = "Invitado";  // Si no se encuentra nombre o apellido
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("publi");
    const textArea = document.getElementById("text");
    const imageUrlInput = document.getElementById("imageUrl");
    const errorLabel = document.getElementById("error_label");

    form.addEventListener("submit", () => {
        const userId = localStorage.getItem("userId");
        const userName = localStorage.getItem("userName");
        const lastName = localStorage.getItem("lastName");
        const postText = textArea.value.trim();
        const imageUrl = imageUrlInput.value.trim();

        // Validar que haya texto en la publicación
        if (!postText) {
            errorLabel.textContent = "No puedes publicar un mensaje vacío.";
            errorLabel.style.display = "block";
            return;
        }

        const postData = {
            userId: userId,
            userName: `${userName} ${lastName}`, // Nombre + Apellido
            text: postText,
            imageUrl: imageUrl,
            timestamp: new Date().toISOString()
        };

        console.log("Datos enviados al servidor:", postData);

        fetch("http://localhost:5156/Publishing", {
            method: "POST",
            body: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {  
                    throw new Error(text || `HTTP error! Status: ${response.status}`);
                });
            }
            return response.json();
        })
        .then(json => {
            console.log("Publicación guardada:", json);
            alert("¡Publicación compartida con éxito!");
            window.location.href = "muroEtiqta.html";  // Volver al muro
        })
        .catch(error => {
            console.error("Error al publicar:", error.message);
            errorLabel.textContent = `* ${error.message}`;
            errorLabel.style.display = "block";
        });
    });
});











