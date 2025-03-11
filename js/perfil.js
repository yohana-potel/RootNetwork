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

// Función para mostrar publicaciones en el DOM
function mostrarPublicaciones(publicaciones, user) {
    const articleBox = document.getElementById("articleBox");

    if (!articleBox) {
        console.error("❌ Error: No se encontró el contenedor de publicaciones en el DOM.");
        return;
    }

    articleBox.innerHTML = ""; // Limpiar antes de agregar nuevas publicaciones

    // Ordenar las publicaciones por fecha de publicación (de más reciente a más antigua)
    publicaciones.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

    publicaciones.forEach(publicacion => {
        const publicacionElement = document.createElement("articleBox");
        publicacionElement.classList.add("articleBox");
        publicacionElement.style.maxWidth = "540px";

        publicacionElement.innerHTML = `
        <div class="content">
            <div class="imageBox">
                ${publicacion.imageUrl ? `<img src="${publicacion.imageUrl}" alt="Imagen de la publicación" id="imageUrl">` : ""}
            </div>
            <div class="cardBody">
                <h5 class="card-title">${user.name}</h5>
                <p class="text">${publicacion.text || "Sin contenido"}</p>
                <p class="card-text">
                    <small class="text-body-secondary">
                        Publicado el ${publicacion.dateTime ? new Date(publicacion.dateTime).toLocaleString("es-ES") : "Fecha desconocida"}
                    </small>
                </p>
            </div>
        
        
            <div class="barraComentario">
                <button class="boton-publicacion" name="meGusta" id="love">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path class="boton-emoticon" fill="#9c4251" d="M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0h32c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64H64c123.7 0 224 100.3 224 224v32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V320C100.3 320 0 219.7 0 96z"/>
                    </svg>
                </button>
        
                <button class="boton-publicacion" name="compartir" id="compartir">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path class="boton-emoticon" fill="#9c4251" d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/>
                    </svg>
                </button>
            </div>
            <div class="comentario">
                <input type="text" class="inputComentario"${publicacion.id}" placeholder="Escribe un comentario...">
                <button class="botonComentario" id="botonComentar-${publicacion.id}">Comentar</button>
                <div class="ComentariosRealizados" id="comentarios-${publicacion.id}">
                    <p id="textoComentario-${publicacion.id}"></p>
                </div>
            </div>
        </div>
    `;
    

        articleBox.appendChild(publicacionElement);
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
