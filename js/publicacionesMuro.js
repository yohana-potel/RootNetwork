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
            comentarioContainer.innerHTML = ""; // Limpiar comentarios previos
            if (data.success) {
                data.data.forEach(comment => {
                    const commentHTML = `
                        <div class="ComentariosRealizados">
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

// Función para enviar un comentario
function enviarComentario(postId, inputComentario, comentarioContainer) {
    const comentarioTexto = inputComentario.value.trim();

    if (comentarioTexto === "") {
        alert("El comentario no puede estar vacío.");
        return;
    }

    // Verifica que userId esté definido (reemplázalo con el valor real si es necesario)
    const userId = 6 // <-- Asegúrate de obtener este valor dinámicamente


    if (!userId) {
        console.error("Error: userId no está definido.");
        return;
    }

    // Estructura del comentario para la API
    const nuevoComentario = { userId, publishingId: postId, text: comentarioTexto };
    
    console.log("Enviando comentario a publishingId:", postId);
    console.log("Enviando comentario:", comentarioTexto);

    fetch("http://localhost:5156/api/Comment/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoComentario)
    })
    .then(response => {
        //console.log("Código de respuesta:", response.status);
        return response.json().catch(() => {
            console.error("Error al convertir la respuesta a JSON");
            return null;
        });
    })
    .then(data => {
        if (data && data.success) {
            inputComentario.value = ""; // Limpiar campo de comentario
            cargarComentarios(postId, comentarioContainer); // Recargar comentarios en tiempo real
        } else {
            console.error("Error al enviar comentario:", data ? data.message : "Respuesta inválida");
        }
    })
    .catch(error => console.error("Error en la petición:", error));
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

                <div class="comentario">
                    <input type="text" class="inputComentario" placeholder="Escribe un comentario...">
                    <button class="botonComentario">Comentar</button>
                    <div class="ComentariosRealizados">
                        <p id="textoComentario"></p>  
                    </div>
                </div>
            </div>
        `;

        // Seleccionar elementos necesarios
        const inputComentario = postHTML.querySelector(".inputComentario");
        const botonComentar = postHTML.querySelector(".botonComentario");
        const comentarioContainer = postHTML.querySelector(".ComentariosRealizados");

        // Cargar los comentarios de la publicación
        cargarComentarios(post.id, comentarioContainer);

        // Agregar evento al botón de comentar
        botonComentar.addEventListener("click", () => {
            enviarComentario(post.id, inputComentario, comentarioContainer);
        });

        container.appendChild(postHTML);
    });
}
