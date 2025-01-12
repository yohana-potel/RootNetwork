// Archivo: muro.js

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

// Renderizar las publicaciones en el contenedor
function renderPosts(posts) {
    const container = document.getElementById("articleBox");
    container.innerHTML = ""; // Limpiar contenido previo

    posts.forEach(post => {
        const postHTML = `
            <article class="articleBox" id="articleBox">
                <div class="content">
                    <div class="imageBox">
                        <img src="${post.ImageUrl}" alt="Imagen de la publicación" id="text">
                    </div>
                    <div class="cardBody" id="cardPublicacion">
                        <h5 class="card-title" id="userName">${post.userName}</h5>
                        <p class="card-text" id="imageUrl">${post.text}</p>
                        <p class="card-text"><small class="text-body-secondary">${new Date(post.PublishDate).toLocaleString()}</small></p>
                    </div>
                </div>`;
    
    container.innerHTML += postHTML;
    
    });
}
