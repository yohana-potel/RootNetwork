import { obtenerPublicaciones, obtenerComentarios, enviarComentarioAPI, manejarReaccion } from './publishingRepository.js';

document.addEventListener("DOMContentLoaded", iniciarApp);
 
async function iniciarApp() {
    const userName = localStorage.getItem("userName");
    const lastName = localStorage.getItem("lastName");

    // Verifica si userName y lastName existen en localStorage
    if (userName && lastName) {
        const fullName = `${userName} ${lastName}`;  
        console.log("Nombre completo desde localStorage:", fullName); // Verifica los valores
        document.getElementById("nombreUsuario").textContent = fullName; // Asigna el nombre completo al DOM
    } else {
        console.error("El nombre o el apellido no están disponibles en localStorage.");
    }
    
    try {
        const posts = await obtenerPublicaciones();
        const container = document.getElementById("articleBox");
        container.innerHTML = "";

        posts.forEach(async post => {
            const { postHTML, comentarioContainer } = crearPostHTML(post);
            container.appendChild(postHTML);

            const botonLove = postHTML.querySelector(`button[name="meGusta"]`);
            botonLove.addEventListener("click", () => {
                manejarReaccion(post.id);
            });

            try {
                const comentarios = await obtenerComentarios(post.id);
                mostrarComentarios(comentarioContainer, comentarios);
            } catch (error) {
                console.error(`Error al cargar comentarios del post ${post.id}:`, error);
            }

            const botonComentar = postHTML.querySelector(".botonComentario");
            const inputComentario = postHTML.querySelector(".inputComentario");

            botonComentar.addEventListener("click", async () => {
                await manejarComentario(post.id, inputComentario, comentarioContainer);
            });
        });
    } catch (error) {
        console.error("Error al cargar publicaciones:", error);
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


function crearPostHTML(post) {
    const postHTML = document.createElement("article");
    postHTML.classList.add("articleBox");
    postHTML.style.maxWidth = "540px";
    
    postHTML.innerHTML = `
        <div class="content">
            <div class="imageBox"><img src="${post.imageUrl}" alt="Imagen de la publicación"></div>
            <div class="cardBody">
                <h5 class="card-title">${post.fullName}</h5>
                <p class="text">${post.text}</p>
                <p class="card-text"><small>${new Date(post.PublishDate).toLocaleString()}</small></p>
            </div>

            <div class="barraComentario">
                <button class="boton-publicacion" name="meGusta" id="${post.id}">
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
                <input type="text" class="inputComentario" placeholder="Escribe un comentario...">
                <button class="botonComentario">Comentar</button>
                <div class="ComentariosRealizados"><p>No hay comentarios aún.</p></div>
            </div>
        </div>
    `;

    const comentarioContainer = postHTML.querySelector(".ComentariosRealizados");

    return { postHTML, comentarioContainer };
}

function mostrarComentarios(container, comentarios) {
    container.innerHTML = "";
    if (comentarios.length === 0) {
        container.innerHTML = "<p>No hay comentarios aún.</p>";
    } else {
        comentarios.forEach(comment => {
            container.innerHTML += `<div class="ComentariosRealizados"><p> <strong>${comment.userName}</strong>: ${comment.text}</p></div>`;
        });
    }
}


