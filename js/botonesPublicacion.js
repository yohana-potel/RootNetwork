// Selección de elementos
const likeButton = document.querySelector('button[name="meGusta"]');
const shareButton = document.querySelector('button[name="compartir"]');
const commentButton = document.querySelector('.botonComentario');
const commentInput = document.getElementById('TextoComentario');

// Función para manejar el clic en "Me Gusta"
likeButton.addEventListener("click", () => {
    // Mostrar un mensaje o realizar alguna acción al hacer clic en "Me Gusta"
    console.log("Me gusta!");
    alert("¡Te ha gustado la publicación!");
});

// Función para manejar el clic en "Compartir"
shareButton.addEventListener("click", () => {
    // Mostrar un mensaje o realizar alguna acción al hacer clic en "Compartir"
    console.log("Compartir!");
    alert("¡Publicación compartida!");
});

// Función para manejar el clic en "Comentar"
commentButton.addEventListener("click", () => {
    // Obtener el valor del campo de comentario
    const commentText = commentInput.value.trim();
    
    if (commentText !== "") {
        // Mostrar el comentario (esto se puede guardar en una base de datos, o procesar de alguna forma)
        console.log("Comentario: ", commentText);
        alert(`Comentario enviado: ${commentText}`);
        
        // Limpiar el campo de comentario después de enviar
        commentInput.value = "";
    } else {
        alert("Por favor, escribe un comentario antes de enviar.");
    }
});
