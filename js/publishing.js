//usuarios crear una nueva publicación.

// Escuchar el clic en el botón "Compartir"
document.getElementById('share').addEventListener("click", (evt) => {
    evt.preventDefault(); // Prevenir comportamiento por defecto del formulario

    // Capturar datos del formulario
    let textPublishing = document.getElementById('text').value.trim(); // Texto de la publicación
    let imagePublishing = document.getElementById('imageUrl').value.trim(); // URL de la imagen
    //let UserName = document.getElementById('UserName').value.trim();
    let userId = 1 //localStorage.getItem("userId"); // Obtener ID del usuario desde localStorage

    // Etiqueta para mostrar errores
    let errorLabel = document.getElementById('error_label');

    // Validar campos obligatorios
    if (!textPublishing) {
        showError(errorLabel, "El texto de la publicación es obligatorio.");
        return;
    }

    if (!isValidUrl(imagePublishing)) {
        showError(errorLabel, "Por favor, ingresa una URL válida para la imagen.");
        return;
    }

    if (!userId) {
        showError(errorLabel, "El usuario no está autenticado. Inicia sesión nuevamente.");
        return;
    }

    // Ocultar mensajes de error si pasa todas las validaciones
    errorLabel.style.display = "none";

    // Crear objeto de la solicitud
    let peticion = {
        Text: textPublishing,
        ImageUrl: imagePublishing,
        UserId: userId,
    
    };

    console.log("Datos enviados al backend:", peticion); // Log para depurar

    // Llamar al repositorio para enviar los datos al backend
    getPublishing(peticion, (response) => {
        if (response.success) {
            alert("¡Publicación creada con éxito!");
            window.location.href = "/muroEtiqta.html"; // Redirigir al muro
        } else {
            console.error("Error al publicar:", response.message);
            showError(errorLabel, `Error al publicar: ${response.message}`);
        }
    });
});

// Función para validar URLs
function isValidUrl(string) {
    try {
        new URL(string); // Intenta crear un objeto URL
        return true;
    } catch {
        return false; // Si falla, no es una URL válida
    }
}

// Función para mostrar errores
function showError(label, message) {
    label.style.display = "block";
    label.textContent = message;
}
