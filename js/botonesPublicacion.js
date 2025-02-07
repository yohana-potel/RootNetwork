document.addEventListener("DOMContentLoaded", () => {
    const loveButton = document.getElementById("love");
    const shareButton = document.getElementById("compartir");
    const commentButton = document.getElementById("botonComentar");
    const textComment = document.getElementById("inputComentario");
    const reactionCount = document.getElementById("reactions-count"); // Contador de reacciones
    const commentList = document.getElementsByClassName("ComentariosRealizados"); // Lista de comentarios

    // Registrar "Me Gusta" en la base de datos y actualizar el contador
    loveButton.addEventListener("click", () => {
        fetch("http://localhost:5156/Reaction", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "love" })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Reacción registrada:", data);
            reactionCount.textContent = data.totalReactions; // Actualizar contador
        })
        .catch(error => console.error("Error al enviar reacción:", error));
    });

    // Agregar comentario y mostrarlo en la lista
    commentButton.addEventListener("click", () => {
        const commentText = textComment.value.trim();

        if (commentText !== "") {
            fetch("http://localhost:5156/api/Comment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: commentText })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Comentario registrado:", data);
                const newComment = document.createElement("li");
                newComment.textContent = data.content; // Mostrar el comentario
                commentList.appendChild(newComment);
                textComment.value = ""; // Limpiar el campo
            })
            .catch(error => console.error("Error al enviar comentario:", error));
        } else {
            alert("Por favor, escribe un comentario antes de enviar.");
        }
    });

    
    
});
