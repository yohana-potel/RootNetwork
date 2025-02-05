document.addEventListener("DOMContentLoaded", () => {
    cargarPublicaciones();
});

// Función para cargar publicaciones desde el backend
function cargarPublicaciones() {
    fetch("http://localhost:5156/Publishing/all")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                renderPosts(data.data);
            } else {
                console.error("Error al cargar publicaciones:", data.message);
            }
        })
        .catch(error => console.error("Error de red:", error));
}

// Función para cargar comentarios de una publicación específica
function cargarComentarios(postId, comentarioContainer) {
    fetch(`http://localhost:5156/api/Comment/post/${postId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                comentarioContainer.innerHTML = ""; // Limpiar comentarios previos
                data.data.forEach(comment => {
                    const commentHTML = `
                        <div class="comentarioItem">
                            <strong>${comment.userName}</strong>: ${comment.text}
                        </div>
                    `;
                    comentarioContainer.innerHTML += commentHTML;
                });
            } else {
                comentarioContainer.innerHTML = "<p>No hay comentarios aún.</p>";
            }
        })
        .catch(error => console.error("Error al cargar comentarios:", error));
}

// Renderizar las publicaciones en el contenedor
function renderPosts(posts) {
    const container = document.getElementById("articleBox");
    container.innerHTML = ""; // Limpiar contenido previo

    posts.forEach(post => {
        const postHTML = document.createElement("article");
        postHTML.classList.add("articleBox");
        postHTML.style.maxWidth = "540px";

        postHTML.innerHTML = `
            <div class="content">
                <div class="imageBox">
                    <img src="${post.imageUrl}" alt="Imagen de la publicación">
                </div>
                <div class="cardBody">
                    <h5 class="card-title">${post.userName}</h5>
                    <p class="text">${post.text}</p>
                    <p class="card-text">
                        <small class="text-body-secondary">${new Date(post.PublishDate).toLocaleString()}</small>
                    </p>
                </div>

                <div class="barraComentario">
                    <button class="boton-publicacion" id="love">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path class="boton-emoticon" fill="#9c4251" d="M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0h32c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64H64c123.7 0 224 100.3 224 224v32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V320C100.3 320 0 219.7 0 96z"/>
                        </svg>
                    </button>
                    <button class="boton-publicacion" id="compartir">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path class="boton-emoticon" fill="#9c4251" d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/>
                        </svg>
                    </button>
                </div>

                <div class="comentario">
                    <input type="text" class="inputComentario" placeholder="Escribe un comentario...">
                    <button class="botonComentario">Comentar</button>
                    <div class="ComentariosRealizados"></div> <!-- Contenedor para los comentarios -->
                </div>
            </div>
        `;

        // Seleccionar el contenedor donde se van a mostrar los comentarios
        const comentarioContainer = postHTML.querySelector(".ComentariosRealizados");

        // Cargar los comentarios de la publicación
        cargarComentarios(post.id, comentarioContainer);

        container.appendChild(postHTML);
    });
}
