document.addEventListener("DOMContentLoaded", () => {
    // Selección de elementos

    // Referencias a los elementos HTML
    const loveButton = document.getElementById('love');
    const shareButton = document.getElementById('compartir');
    const commentButton = document.getElementById('botonComentar');
    const TextComment = document.getElementById('TextoComentario');

    // Función para manejar el clic en "Me Gusta"
    loveButton.addEventListener("click", () => {
        const requestPayload = {
            action: "love",  // Tipo de acción
            content: "Lo Amo",  // Detalles de la acción
        };

        console.log("Lo Amo!", requestPayload);
        alert("¡Te ha gustado la publicación!");

        // Aquí podrías enviar el objeto requestPayload a un servidor
        // Por ejemplo, usando fetch:
         fetch('http://localhost:5156/User', {
            method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(requestPayload)
         });
    });

    // Función para manejar el clic en "Compartir"
    shareButton.addEventListener("click", () => {
        const requestPayload = {
            action: "share",  // Tipo de acción
            content: "Compartir publicación",  // Detalles de la acción
        };

        console.log("Compartir!", requestPayload);
        alert("¡Publicación compartida!");

        // Enviar al servidor si es necesario
        // fetch('/api/acciones', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(requestPayload)
        // });
    });

    // Función para manejar el clic en "Comentar"
    commentButton.addEventListener("click", () => {
        const commentText = TextComment.value.trim();

        if (commentText !== "") {
            // Crear el objeto de petición con los datos
            const requestPayload = {
                action: "comment",  // Tipo de acción
                content: commentText,  // El contenido del comentario
            };

            console.log("Comentario: ", requestPayload);
            alert(`Comentario enviado: ${commentText}`);

            // Aquí podrías enviar el objeto requestPayload a un servidor
            // Por ejemplo, usando fetch:
            // fetch('/api/comentarios', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(requestPayload)
            // });

            // Limpiar el campo de comentario después de enviar
            TextComment.value = "";
        } else {
            alert("Por favor, escribe un comentario antes de enviar.");
        }
    });
});
