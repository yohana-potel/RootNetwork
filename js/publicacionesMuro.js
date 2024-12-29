// Archivo: muro.js
document.addEventListener("DOMContentLoaded", () => {
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
});

function renderPosts(posts) {
    const container = document.getElementById("publicaciones-container");
    container.innerHTML = ""; // Limpiar contenido previo
    posts.forEach(post => {
        const postHTML = `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${post.ImageUrl}" class="img-fluid rounded-start" alt="Imagen de la publicación">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${post.UserName}</h5>
                            <p class="card-text">${post.Text}</p>
                            <p class="card-text"><small class="text-body-secondary">${new Date(post.PublishDate).toLocaleString()}</small></p>
                        </div>
                    </div>
                </div>
            </div>`;
        container.innerHTML += postHTML;
    });
}





/*function obtenerPublicaciones() {
    return [{
        titulo: "Post 1",
        mensaje: "Cuerpo 1",
        cantidad: 1,
        urlImagen: "https://th.bing.com/th?id=ORMS.1ea589573470ac6fa20db9ec3930b1d1&pid=Wdp&w=612&h=328&qlt=90&c=1&rs=1&dpr=1&p=0"
    }, {
        titulo: "Post 2",
        mensaje: "Cuerpo 2",
        cantidad: 2,
        urlImagen: "https://th.bing.com/th?id=ORMS.1ea589573470ac6fa20db9ec3930b1d1&pid=Wdp&w=612&h=328&qlt=90&c=1&rs=1&dpr=1&p=0"
    }, {
        titulo: "Post 3",
        mensaje: "Cuerpo 3",
        cantidad: 3,
        urlImagen: "https://th.bing.com/th?id=ORMS.1ea589573470ac6fa20db9ec3930b1d1&pid=Wdp&w=612&h=328&qlt=90&c=1&rs=1&dpr=1&p=0"
    }];
}


const posts = obtenerPublicaciones();

for(let post of posts) {
    showCard(post, "posts");
}

function showCard(post, idContenedor) {
    let card = document.createElement("div");
    card.className = "card-body";

    card.innerHTML = getCardTemplate(post);

    let posts = document.getElementById(idContenedor);
    posts.append(card);
}

function getCardTemplate(card) {
    return `
        <img src="${card.urlImagen}"/>
        <h2>${card.titulo}</h2>
        <div class="body">${card.mensaje}</div>
        <div class="reacciones">${card.cantidad}</div>
    `;
}

let ts = document.querySelectorAll("h2");

for(let t of ts)
{
    console.log(t.innerText);
}

*/


