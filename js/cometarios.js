let page = 1;
const pageSize = 5;

// Función para enviar un comentario
function enviarComentario(postId, inputComentario, comentarioContainer) {
    const comentarioTexto = inputComentario.value.trim();

    if (comentarioTexto === "") {
        alert("El comentario no puede estar vacío.");
        return;
    }

    // Construir el objeto del comentario con la estructura correcta
    const nuevoComentario = {
        userId: 1, // Reemplazar con el ID del usuario real
        text: comentarioTexto,
        publishingId: postId
    };

    fetch("http://localhost:5156/api/Comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoComentario)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            inputComentario.value = ""; // Limpiar el campo de entrada
            page = 1; // Reiniciar paginación
            comentarioContainer.innerHTML = ""; // Limpiar los comentarios previos
            cargarComentarios(postId, comentarioContainer); // Cargar los comentarios actualizados
        } else {
            console.error("Error al enviar comentario:", data.message);
        }
    })
    .catch(error => console.error("Error en la petición:", error));
}

// Función para cargar comentarios con paginación
function cargarComentarios(postId, comentarioContainer) {
    fetch(`http://localhost:5156/api/Comment/post/${postId}?page=${page}&pageSize=${pageSize}`)
    .then(response => response.json())
    .then(data => {
        if (!data.success || data.data.length === 0) {
            document.getElementById("btnVerMas").style.display = "none";
            return;
        }

        data.data.forEach(comentario => {
            comentarioContainer.innerHTML += `
                <p><strong>${comentario.userName}</strong>: ${comentario.text}</p>
            `;
        });

        page++; // Aumentar la página para la próxima carga
    })
    .catch(error => console.error("Error cargando comentarios:", error));
}

// Evento para "Ver más comentarios"
document.getElementById("btnVerMas").addEventListener("click", function() {
    const postId = this.dataset.postId; // Obtener el postId desde un atributo del botón
    const comentarioContainer = document.getElementById("ComentariosRealizados");
    cargarComentarios(postId, comentarioContainer);
});
