import { obtenerComentarios, enviarComentarioAPI, manejarReaccion, getPublishing } from './publishingRepository.js';

document.addEventListener("DOMContentLoaded", function () {
    const userName = localStorage.getItem("userName");
    const userLastName = localStorage.getItem("lastName");
    const userId = localStorage.getItem("userId");

    if (userName && userLastName) {
        const nombreUsuario = document.getElementById("nombreUsuario");
        nombreUsuario.innerHTML = `${userName} ${userLastName}`;
    } else {
        console.error("No se encontraron los datos del usuario en localStorage.");
    }

    if (userId) {
        obtenerPublicacionesUsuario(userId);
    } else {
        console.error("No se encontró el userId en localStorage.");
    }
});

function obtenerPublicacionesUsuario(userId) {
    fetch(`http://localhost:5156/Publishing/GetPostsByUser/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Publicaciones obtenidas:", data);
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

async function cargarComentarios(postId, comentarioContainer) {
    console.log(`Cargando comentarios para la publicación con id: ${postId}`);
    try {
        const comentarios = await obtenerComentarios(postId);
        mostrarComentarios(comentarioContainer, comentarios);
    } catch (error) {
        console.error(`Error al cargar comentarios del post ${postId}:`, error);
    }
}

async function manejarComentario(postId, inputComentario, comentarioContainer) {
    const texto = inputComentario.value.trim();
    if (!texto) {
        alert("El comentario no puede estar vacío.");
        return;
    }

    try {
        await enviarComentarioAPI(postId, texto);
        inputComentario.value = "";
        const comentariosActualizados = await obtenerComentarios(postId);
        mostrarComentarios(comentarioContainer, comentariosActualizados);
    } catch (error) {
        console.error("Error al enviar comentario:", error);
    }
}

async function compartirPublicacion(post) {
    const userName = localStorage.getItem("userName");
    const lastName = localStorage.getItem("lastName");
    const userId = localStorage.getItem("userId");

    const nuevaPublicacion = {
        Text: post.text,
        ImageUrl: post.imageUrl,
        UserId: userId,
        UserName: userName,
        LastName: lastName,
    };

    try {
        const response = await getPublishing(nuevaPublicacion);
        if (response.success) {
            alert("¡Publicación compartida con éxito!");
            window.location.reload();
        } else {
            alert("Hubo un error al compartir la publicación.");
        }
    } catch (error) {
        console.error("Error al compartir la publicación:", error);
    }
}

async function mostrarPublicaciones(publicaciones) {
    const articleBox = document.getElementById("articleBox");

    if (!articleBox) {
        console.error("❌ Error: No se encontró el contenedor de publicaciones en el DOM.");
        return;
    }

    articleBox.innerHTML = "";
    publicaciones.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

    for (let publicacion of publicaciones) {
        const publicacionElement = document.createElement("div");
        publicacionElement.classList.add("articleBox");
        publicacionElement.style.maxWidth = "540px";

        publicacionElement.innerHTML = `
        <div class="content">
            <div class="imageBox">
                ${publicacion.imageUrl ? `<img src="${publicacion.imageUrl}" alt="Imagen de la publicación">` : ""}
            </div>
            <div class="cardBody">
                <h5 class="card-title">${localStorage.getItem("userName")} ${localStorage.getItem("lastName")}</h5>
                <p class="text">${publicacion.text || "Sin contenido"}</p>
                <p class="card-text">
                    <small class="text-body-secondary">
                        Publicado el ${publicacion.dateTime ? new Date(publicacion.dateTime).toLocaleString("es-ES") : "Fecha desconocida"}
                    </small>
                </p>
            </div>

            <div class="barraComentario">
                <button class="boton-publicacion meGusta">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path class="boton-emoticon" fill="#9c4251" d="M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0h32c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64H64c123.7 0 224 100.3 224 224v32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V320C100.3 320 0 219.7 0 96z"/>
                    </svg>
                </button>

                <button class="boton-publicacion compartir">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path class="boton-emoticon" fill="#9c4251" d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/>
                    </svg>
                </button>
            </div>
          
            <div class="comentario">
                <input type="text" class="inputComentario" placeholder="Escribe un comentario...">
                <button class="botonComentario">Comentar</button>
                <div class="ComentariosRealizados" id="comentarios-${publicacion.id}"></div>
            </div>
        </div>
        `;

        articleBox.appendChild(publicacionElement);
        
        // Cargar comentarios
        const comentarioContainer = publicacionElement.querySelector(`#comentarios-${publicacion.id}`);
        const comentarios = await obtenerComentarios(publicacion.id);
        mostrarComentarios(comentarioContainer, comentarios);

        // Agregar eventos a los botones
        agregarEventosPost(publicacion, publicacionElement);
    }
}
function agregarEventosPost(post, postHTML) {
    const botonLove = postHTML.querySelector(".meGusta");
    if (botonLove) {
        botonLove.addEventListener("click", () => manejarReaccion(post.id));
    }
    
    const botonCompartir = postHTML.querySelector(".compartir");
    if (botonCompartir) {
        botonCompartir.addEventListener("click", async () => {
            await compartirPublicacion(post);
        });
    }

    // Agregar evento al botón de comentar
    const inputComentario = postHTML.querySelector(".inputComentario");
    const botonComentar = postHTML.querySelector(".botonComentario");
    const comentarioContainer = postHTML.querySelector(`#comentarios-${post.id}`);

    if (botonComentar && inputComentario && comentarioContainer) {
        botonComentar.addEventListener("click", async () => {
            await manejarComentario(post.id, inputComentario, comentarioContainer);
        });
    } else {
        console.error(`No se encontró el botón de comentar o el input de comentario para el post ${post.id}`);
    }
}

function mostrarComentarios(container, comentarios) {
    container.innerHTML = "";
    if (comentarios.length === 0) {
        container.innerHTML = "<p>No hay comentarios aún.</p>";
    } else {
        comentarios.forEach(comment => {
            // Crear el enlace con el username que lleva al perfil del usuario
            const userProfileLink = `/perfilUsuario.html?userId=${comment.userId}`;
            console.log("userId del comentario:", comment.userId);
            container.innerHTML += `
                <div class="ComentariosRealizados">
                    <p>
                        <strong><a href="${userProfileLink}">${comment.userName}</a></strong>: ${comment.text}
                    </p>
                </div>
            `;
        });
    }
}
