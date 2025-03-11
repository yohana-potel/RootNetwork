document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("userId");
    console.log("userId desde localStorage:", userId);

    if (!userId) {
        console.error("Error: No hay userId en localStorage");
        return;
    }

    obtenerPublicacionesUsuario(userId);
});

// Función para obtener las publicaciones del usuario
function obtenerPublicacionesUsuario(userId) {
    fetch(`http://localhost:5156/Publishing/GetPostsByUser/${userId}`)
    
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data || !data.posts) {
                console.warn("No se encontraron publicaciones.");
                return;
            }

            mostrarPublicaciones(data.posts, data.user);
        })
        .catch(error => {
            console.error("Error al obtener las publicaciones del usuario:", error);
        });
}


function mostrarPublicaciones(publicaciones, user) {
    const contenedorPosteos = document.querySelector(".user-post");

    if (!contenedorPosteos) {
        console.error("❌ Error: No se encontró el contenedor de publicaciones en el DOM.");
        return;
    }

    contenedorPosteos.innerHTML = ""; // Limpiar antes de agregar nuevas publicaciones

    // Ordenar las publicaciones por fecha de más reciente a más antigua
    publicaciones.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

    publicaciones.forEach(publicacion => {
        const publicacionElement = document.createElement("div");
        publicacionElement.classList.add("post", "mb-3", "p-3", "border", "rounded");

        publicacionElement.innerHTML = `
            <h2 class="username">${user.name}</h2>
            <p class="post-text">${publicacion.text || "Sin contenido"}</p>
            ${publicacion.imageUrl ? `<img src="${publicacion.imageUrl}" alt="Imagen de la publicación" class="post-image img-fluid">` : ""}
            <p class="text-muted">
                Publicado el ${publicacion.dateTime ? new Date(publicacion.dateTime).toLocaleString("es-ES") : "Fecha desconocida"}
            </p>
            <div class="d-flex gap-2">
                <button class="btn btn-outline-danger" id="love-${publicacion.id}">❤️ Me gusta</button>
                <button class="btn btn-outline-primary" id="compartir-${publicacion.id}">🔄 Compartir</button>
            </div>
            <div class="mt-3">
                <input type="text" class="form-control" id="comentario-${publicacion.id}" placeholder="Escribe un comentario...">
                <button class="btn btn-success mt-2" id="botonComentar-${publicacion.id}">Comentar</button>
                <div class="mt-2" id="comentarios-${publicacion.id}"></div>
            </div>
        `;

        contenedorPosteos.appendChild(publicacionElement);
    });
}

function mostrarComentarios(container, comentarios) {
    container.innerHTML = ""; // Limpiar antes de agregar nuevos comentarios
    if (comentarios.length === 0) {
        container.innerHTML = "<p>No hay comentarios aún.</p>";
    } else {
        comentarios.forEach(comment => {
            container.innerHTML += ` 
                <div class="ComentariosRealizados">
                    <p><strong>${comment.userName}</strong>: ${comment.text}</p>
                </div>
            `;
        });
    }
}


// Obtener el ID del usuario desde la URL
const params = new URLSearchParams(window.location.search);
const userId = params.get("query");



