// Función para enviar un comentario
function enviarComentario(postId, inputComentario, comentarioContainer) {
    const comentarioTexto = inputComentario.value.trim();

    if (comentarioTexto === "") {
        alert("El comentario no puede estar vacío.");
        return;
    }

    // Estructura del comentario para la API
    const nuevoComentario = {
        postId: postId,
        text: comentarioTexto,
        userName: "UsuarioDemo" // Reemplaza con el usuario real
    };

    fetch("http://localhost:5156/api/Comment/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoComentario)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            inputComentario.value = ""; // Limpiar campo de comentario
            cargarComentarios(postId, comentarioContainer); // Recargar comentarios en tiempo real
        } else {
            console.error("Error al enviar comentario:", data.message);
        }
    })
    .catch(error => console.error("Error en la petición:", error));
}