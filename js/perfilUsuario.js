import { obtenerComentarios, enviarComentarioAPI, manejarReaccion, getPublishing } from './publishingRepository.js';

document.addEventListener("DOMContentLoaded", async function() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("userId");

    // Depuración para verificar qué valor tiene 'userId' en la URL
    console.log("userId desde la URL:", userId);
    
    if (userId) {
        try {
            const response = await fetch(`http://localhost:5156/User/${userId}`);
            const data = await response.json();
            if (response.ok) {
                // Aquí manejas los datos del usuario, pero solo mostrar el nombre
                console.log(data);
                mostrarPerfil(data);  // Mostrar solo el nombre del usuario
                const publicaciones = await obtenerPublicacionesUsuario(userId);
                mostrarPublicaciones(publicaciones);  // Mostrar solo las publicaciones del usuario
            } else {
                console.error("Error al cargar el perfil del usuario", data);
            }
        } catch (error) {
            console.error("Error al obtener los datos del usuario", error);
        }
    } else {
        console.error("No se ha proporcionado un userId válido en la URL.");
    }
});

function agregarEventosPost(post, postHTML, comentarioContainer) {
    // Botón "me gusta"
    const botonLove = postHTML.querySelector('button[name="meGusta"]');
    botonLove.addEventListener("click", () => manejarReaccion(post.id));

    // Cargar comentarios
    cargarComentarios(post, comentarioContainer);

    // Manejo del botón de comentar
    const botonComentar = postHTML.querySelector(".botonComentario");
    const inputComentario = postHTML.querySelector(".inputComentario");
    botonComentar.addEventListener("click", async () => {
        await manejarComentario(post.id, inputComentario, comentarioContainer);
    });

    // Manejo del botón de compartir
    const botonCompartir = postHTML.querySelector(".boton-publicacion[name='compartir']");
    botonCompartir.addEventListener("click", async () => {
        await compartirPublicacion(post);
    });
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

async function cargarComentarios(post, comentarioContainer) {
    try {
        const comentarios = await obtenerComentarios(post.id);
        mostrarComentarios(comentarioContainer, comentarios);
    } catch (error) {
        console.error(`Error al cargar comentarios del post ${post.id}:`, error);
    }
}


async function obtenerPublicacionesUsuario(userId) {
    const response = await fetch(`http://localhost:5156/Publishing/GetPostsByUser/${userId}`);  // Llamada a la API para obtener publicaciones
    if (!response.ok) {
        throw new Error("No se pudo obtener las publicaciones del usuario");
    }
    const data = await response.json();
    return data.posts; 
}

function mostrarPerfil(usuario) {
    document.getElementById("nombreUsuario").textContent = usuario.name; 
}

function mostrarPublicaciones(publicaciones) {
    const publicacionesContainer = document.getElementById("publicacionesContainer");
    publicacionesContainer.innerHTML = ""; // Limpiar contenido anterior

    if (publicaciones.length === 0) {
        publicacionesContainer.innerHTML = "<p>No hay publicaciones de este usuario.</p>";
    } else {
        publicaciones.forEach(publicacion => {
            const postElement = document.createElement("div");
            postElement.classList.add("articleBox");

            postElement.innerHTML = `
                <div class="content">
                    <!-- Sección de la imagen -->
                    <div class="imageBox">
                        <img src="${publicacion.imageUrl}" alt="${publicacion.text}" width="200"/>
                    </div>

                    <!-- Sección del cuerpo de la publicación -->
                    <div class="cardBody">
                        <h5 class="card-title">${publicacion.text}</h5>
                        <p><small>Publicado el ${new Date(publicacion.dateTime).toLocaleDateString()}</small></p>
                    </div>

                    <!-- Barra de interacciones (botones) -->
                    <div class="barraComentario">
                        <!-- Botón de Me Gusta -->
                        <button class="boton-publicacion" name="meGusta" id="love-${publicacion.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path class="boton-emoticon" fill="#9c4251" d="M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0h32c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64H64c123.7 0 224 100.3 224 224v32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V320C100.3 320 0 219.7 0 96z"/>
                            </svg>
                        </button>

                        <!-- Botón de Compartir -->
                        <button class="boton-publicacion" name="compartir" id="compartir-${publicacion.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path class="boton-emoticon" fill="#9c4251" d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/>
                            </svg>
                        </button>
                    </div>

                    <!-- Sección de comentarios -->
                    <div class="comentario">
                        <input type="text" class="inputComentario" placeholder="Escribe un comentario...">
                        <button class="botonComentario">Comentar</button>
                        <div class="ComentariosRealizados">
                            <p>Cargando comentarios...</p> <!-- Mensaje mientras se cargan -->
                        </div>
                    </div>
                </div>
            `;

            // 🔹 Agregar eventos para los botones después de insertar el HTML
            const botonLove = postElement.querySelector(`button#love-${publicacion.id}`);
            botonLove.addEventListener("click", () => manejarReaccion(publicacion.id));

            const botonCompartir = postElement.querySelector(`button#compartir-${publicacion.id}`);
            botonCompartir.addEventListener("click", async () => {
                await compartirPublicacion(publicacion);
            });

            const botonComentar = postElement.querySelector(".botonComentario");
            const inputComentario = postElement.querySelector(".inputComentario");
            const comentarioContainer = postElement.querySelector(".ComentariosRealizados");

            botonComentar.addEventListener("click", async () => {
                await manejarComentario(publicacion.id, inputComentario, comentarioContainer);
            });

           
            cargarComentarios(publicacion, comentarioContainer);

            publicacionesContainer.appendChild(postElement);
        });
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
