document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("userId");
    console.log("userId desde localStorage:", userId);

    if (!userId) {
        console.error("Error: No hay userId en localStorage");
        return; // Detiene la ejecución si no hay userId
    }

    obtenerPublicacionesUsuario(userId);
});

// Función para obtener las publicaciones del usuario logueado
function obtenerPublicacionesUsuario(userId) {
    fetch(`http://localhost:5156/Publishing/GetPostsByUser/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Respuesta completa del servidor:", data);

            if (!data || !data.posts) {
                console.warn("No se encontraron publicaciones.");
                return;
            }

            const publicaciones = data.posts;
            const usuario = data.user;

            mostrarPublicaciones(publicaciones, usuario);
        })
        .catch(error => {
            console.error("Error al obtener las publicaciones del usuario:", error);
        });
}

// Función para mostrar publicaciones en el DOM
function mostrarPublicaciones(publicaciones, user) {
    const publicacionesContainer = document.getElementById("publicacionesContainer");

    if (!publicacionesContainer) {
        console.error("❌ Error: No se encontró el contenedor de publicaciones en el DOM.");
        return;
    }

    publicacionesContainer.innerHTML = ""; // Limpiar antes de agregar nuevas publicaciones

    publicaciones.forEach(publicacion => {
        const publicacionElement = document.createElement("div");
        publicacionElement.classList.add("publicacion");

        publicacionElement.innerHTML = `
            <div class="contenidoPublicacion">
                <h5>${user.name}</h5>
                <p>${publicacion.text || "Sin contenido"}</p>
                ${publicacion.imageUrl ? `<img src="${publicacion.imageUrl}" alt="Imagen de la publicación">` : ""}
                <p><small>Publicado el: ${publicacion.dateTime ? new Date(publicacion.dateTime).toLocaleDateString() : "Fecha desconocida"}</small></p>

                <!-- Sección de Comentarios -->
                <div class="comentariosContainer">
                    <h6>Comentarios:</h6>
                    <div id="comentarios-${publicacion.id}">
                        ${publicacion.comments && publicacion.comments.length > 0 ? 
                            publicacion.comments.map(comentario => `
                                <p><strong>${comentario.user?.name || "Anónimo"}:</strong> ${comentario.text} 
                                <span class="text-muted" style="font-size: 0.8rem;"> - ${new Date(comentario.dateTime).toLocaleDateString()}</span></p>
                            `).join("")
                        : "<p>No hay comentarios aún.</p>"}
                    </div>

                    <!-- Input para agregar nuevo comentario -->
                    <input type="text" id="inputComentario-${publicacion.id}" placeholder="Escribe un comentario...">
                    <button class="botonComentario" onclick="agregarComentario(${publicacion.id})">Comentar</button>
                </div>
            </div>
        `;

        publicacionesContainer.appendChild(publicacionElement);
    });
}

// Función para agregar un comentario dinámicamente
function agregarComentario(publicacionId) {
    const inputComentario = document.getElementById(`inputComentario-${publicacionId}`);
    const comentarioTexto = inputComentario.value.trim();

    if (comentarioTexto === "") return;

    const usuarioActual = { name: "Usuario Logueado" }; // Simulación del usuario autenticado
    const nuevoComentario = {
        user: usuarioActual,
        text: comentarioTexto,
        dateTime: new Date().toISOString(),
    };

    // Agregar el comentario en la UI
    const comentariosContainer = document.getElementById(`comentarios-${publicacionId}`);
    const comentarioHTML = `
        <p><strong>${nuevoComentario.user.name}:</strong> ${nuevoComentario.text}
        <span class="text-muted" style="font-size: 0.8rem;"> - ${new Date(nuevoComentario.dateTime).toLocaleDateString()}</span></p>
    `;
    comentariosContainer.innerHTML += comentarioHTML;

    inputComentario.value = ""; // Limpiar el input
}
