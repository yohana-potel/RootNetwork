export async function obtenerPublicaciones(page = 1, pageSize = 10) {
    try {
        const response = await fetch(`http://localhost:5156/Publishing/all?page=${page}&pageSize=${pageSize}`);
        const data = await response.json();

        if (!data.success) throw new Error(data.message);

        // Asegurarnos de que todos los posts tengan el nombre completo
        data.data.forEach(post => {
            post.fullName = `${post.userName} ${post.lastName}`;  
        });
        
        // Ordenar publicaciones por ID en orden descendente
        data.data.sort((a, b) => b.id - a.id);

        return { posts: data.data, totalRecords: data.totalRecords };
    } catch (error) {
        console.error("Error al obtener publicaciones:", error);
        return { posts: [], totalRecords: 0 };
    }
}


export async function obtenerComentarios(postId) {
    try {
        const response = await fetch(`http://localhost:5156/api/Comment/post/${postId}`);
        
        if (!response.ok) {
            const data = await response.json();
            if (response.status === 404) {
                console.warn(`No hay comentarios para la publicación con ID: ${postId}`);
                return [];
            }
            console.error("Error en la respuesta de comentarios:", data.message);
            throw new Error(data.message);
        }

        const data = await response.json();
        
        if (!data.success) {
            console.error("Error: No se pudieron obtener los comentarios:", data.message);
            throw new Error(data.message);
        }

        // Verificar la estructura de los comentarios
        console.log("Comentarios recibidos:", data.data);

        // Verificar si los comentarios contienen el userId
        data.data.forEach(comentario => {
            console.log("Estructura de comentario:", comentario); // Muestra todo el comentario
            console.log(`Comentario escrito por el usuario con ID: ${comentario.userId}`); // Verifica si existe userId
        });

        return data.data;  // Devuelve los comentarios
    } catch (error) {
        console.error("Error al obtener los comentarios:", error);
        return [];  // Retorna un array vacío en caso de error
    }
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

export async function getPublishing(peticion) {
    try {
        const response = await fetch("http://localhost:5156/Publishing", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(peticion),
        });

        const data = await response.json();
        if (data.success) {
            return { success: true, data: data.data };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        console.error("Error al enviar publicación:", error);
        return { success: false, message: "Error en la conexión con el servidor." };
    }


}

export async function crearPublicacionAPI(publicacion) {
    try {
        const response = await fetch("http://127.0.0.1:5000/Publishing", { // Asegúrate de cambiar esta URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(publicacion)
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error en la API:", error);
        throw error;
    }
}