export async function obtenerPublicaciones() {
    const response = await fetch("http://localhost:5156/Publishing/all");
    const data = await response.json();
    if (!data.success) throw new Error(data.message);

    // Convertir PublishDate a un objeto Date (si es necesario)
    data.data.forEach(post => {
        // Convertimos el string en formato ISO a un objeto Date
        post.PublishDate = new Date(post.PublishDate);
        post.fullName = `${post.userName} ${post.lastName}`
    });

    return data.data;
}

export async function obtenerComentarios(postId) {
    const response = await fetch(`http://localhost:5156/api/Comment/post/${postId}`);
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
}

export async function enviarComentarioAPI(postId, texto) {
    const userId = localStorage.getItem("userId"); // Obtener el ID del usuario logueado

    if (!userId) {
        console.error("No hay un usuario logueado.");
        return;
    }

    const comentario = { 
        userId: parseInt(userId), // Convertir a número
        publishingId: postId, 
        text: texto 
    };

    const response = await fetch("http://localhost:5156/api/Comment/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comentario)
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.message);
}

export async function manejarReaccion(postId) {
    const userId = localStorage.getItem("userId"); // Obtener el ID del usuario autenticado

    if (!userId) {
        console.error(" No hay un usuario logueado.");
        alert("Debes iniciar sesión para reaccionar.");
        return;
    }

    const type = "love"; // Tipo de reacción

    try {
        const response = await fetch("http://localhost:5156/Reaction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: parseInt(userId), // Convertimos a número
                postId,
                type
            })
        });

        if (!response.ok) {
            throw new Error(`Error al reaccionar: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Reacción añadida:", data);
        alert("¡Reaccionaste con 🌱!");
    } catch (error) {
        console.error("Error al enviar reacción:", error);
    }
}

export async function getPublishing(peticion, callback) {
    try {
        const response = await fetch("http://localhost:5156/Publishing", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(peticion),
        });

        const data = await response.json();

        if (data.success) {
            callback({ success: true, data: data.data });
        } else {
            callback({ success: false, message: data.message });
        }
    } catch (error) {
        console.error("Error al enviar publicación:", error);
        callback({ success: false, message: "Error en la conexión con el servidor." });
    }
}
