document.addEventListener("DOMContentLoaded", function () {
    // Obtener el ID del usuario desde la URL
    const params = new URLSearchParams(window.location.search);
    const searchedUserId = params.get("query"); // ID del usuario buscado en la URL

    // Si no hay usuario en la URL, tomar el del usuario logueado
    const loggedUserId = localStorage.getItem("userId");
    console.log("User ID desde URL:", searchedUserId);
    console.log("User ID desde localStorage:", loggedUserId);

    // Determinar qué ID usar
    const userId = searchedUserId || loggedUserId;

    if (!userId) {
        console.error("Error: No hay userId disponible (ni en la URL ni en localStorage).");
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
    const articleBox = document.getElementById("articleBox");
    const nombreUsuario = document.getElementById("nombreUsuario");

    if (!articleBox || !nombreUsuario) {
        console.error("❌ Error: No se encontró el contenedor de publicaciones o el nombre de usuario en el DOM.");
        return;
    }

    nombreUsuario.textContent = user.name; // Cambiar el nombre del usuario en la página
    articleBox.innerHTML = ""; // Limpiar publicaciones anteriores

    publicaciones.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

    publicaciones.forEach(publicacion => {
        const publicacionElement = document.createElement("div");
        publicacionElement.classList.add("articleBox");
        publicacionElement.style.maxWidth = "540px";

        publicacionElement.innerHTML = `
            <div class="content">
                <div class="imageBox">
                    ${publicacion.imageUrl ? `<img src="${publicacion.imageUrl}" alt="Imagen de la publicación">` : ""}
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
        `;

        articleBox.appendChild(publicacionElement);
    });
}
