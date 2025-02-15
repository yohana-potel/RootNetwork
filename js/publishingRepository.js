export async function obtenerPublicaciones() {
    const response = await fetch("http://localhost:5156/Publishing/all");
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
}

export async function obtenerComentarios(postId) {
    const response = await fetch(`http://localhost:5156/api/Comment/post/${postId}`);
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
}

export async function enviarComentarioAPI(postId, texto) {
    const userId = 6; // Ajusta esto según tu lógica
    const comentario = { userId, publishingId: postId, text: texto };

    const response = await fetch("http://localhost:5156/api/Comment/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comentario)
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.message);
}

export async function manejarReaccion(postId) {
    const userId = 1; // Cambiar por el ID del usuario autenticado
    const type = "love";

    try {
        const response = await fetch("http://localhost:5156/Reaction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId,
                postId,
                type
            })
        });

        if (!response.ok) {
            throw new Error(`Error al reaccionar: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Reacción añadida:", data);
        alert("¡Reaccionaste con ❤️!");
    } catch (error) {
        console.error("Error al enviar reacción:", error);
    }
}