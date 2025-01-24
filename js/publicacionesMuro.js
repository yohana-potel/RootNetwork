// Archivo: muro.js  Carga las publicaciones existentes para que el usuario las vea.

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
            <article class="articleBox" id="articleBox" style="max-width: 540px>
                <div class="content">
                    <div class="imageBox">
                        <img src="${post.imageUrl}" alt="Imagen de la publicación" id="imageUrl">
                    </div>
                    <div class="cardBody" id="cardPublicacion">
                        
                        <p class="card-text" id="text">${post.text}</p>
                        <p class="card-text"><small class="text-body-secondary">${new Date(post.PublishDate).toLocaleString()}</small></p>
                    </div>
                </div>`;
    
    container.innerHTML += postHTML;
    
    });
}
