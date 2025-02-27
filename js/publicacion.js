import { crearPublicacionAPI } from './publishingRepository.js';

document.getElementById('share').addEventListener('click', async function() {
    const text = document.getElementById('text').value;
    const imageUrl = document.getElementById('imageUrl').value();

    // Obtener el userId desde el localStorage
    const userId = localStorage.getItem('userId'); 

    // Verificar si el userId existe en el localStorage
    if (!userId) {
        alert("Usuario no encontrado. Por favor, inicia sesión.");
        return;
    }

    // Crear el objeto de la nueva publicación
    const nuevaPublicacion = {
        Text: text,
        ImageUrl: imageUrl,
        UserId: userId
    };

    console.log("Enviando publicación:", nuevaPublicacion);

    try {
        // Aquí estamos usando la función 'crearPublicacionAPI' que envía la publicación
        const response = await crearPublicacionAPI(nuevaPublicacion);
        console.log("Respuesta del servidor:", response);

        if (response.success) {
            alert("¡Publicación creada con éxito!");
            window.location.href = "muroEtiqueta.html"; // Redirige al muro
        } else {
            alert("Error al publicar: " + response.message);
        }
    } catch (error) {
        console.error("Error al crear la publicación:", error);
        alert("Hubo un error al crear la publicación.");
    }
});