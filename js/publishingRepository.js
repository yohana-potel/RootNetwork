export async function obtenerPublicaciones(page = 1, pageSize = 10) {
    try {
        const response = await fetch(`http://localhost:5156/Publishing/all?page=${page}&pageSize=${pageSize}`);
        const data = await response.json();

        console.log("Datos de las publicaciones:", data);  // Ver para depuración

        if (!data.success) throw new Error(data.message);

        // Convertir PublishDate a Date y agregar fullName
        data.data.forEach(post => {
            let publishDateString = post.PublishDate;

            // Verificar si PublishDate es una cadena válida
            if (typeof publishDateString === 'string' && publishDateString) {
                // Eliminar los microsegundos de la fecha (si están presentes)
                const formattedDateString = publishDateString.split(".")[0]; // Solo dejamos hasta los segundos

                // Crear un objeto Date
                const publishDate = new Date(formattedDateString);
                console.log("Fecha convertida:", publishDate);  // Verificar si la conversión de fecha funciona correctamente

                if (!isNaN(publishDate)) {
                    post.PublishDate = publishDate;  // Solo asignamos si la fecha es válida
                } else {
                    console.error("Fecha inválida para el post", post);
                    post.PublishDate = new Date();  // Asignamos la fecha actual si es inválida
                }
            } else {
                console.error("Fecha no válida en el post", post);
                post.PublishDate = new Date();  // Asignamos la fecha actual si no existe PublishDate
            }

            post.fullName = `${post.userName} ${post.lastName}`;  // Concatenar el nombre completo
        });

        // 🟢 ORDENAR las publicaciones de más reciente a más antigua
        data.data.sort((a, b) => b.PublishDate - a.PublishDate);  // Ordenar las publicaciones
        console.log("Publicaciones ordenadas:", data.data);  // Verificación

        return { posts: data.data, totalRecords: data.totalRecords };
    } catch (error) {
        console.error("Error al obtener publicaciones:", error);
        return { posts: [], totalRecords: 0 };
    }
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