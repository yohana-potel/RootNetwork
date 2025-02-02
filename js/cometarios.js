document.addEventListener("DOMContentLoaded", function () {
    const comentariosDiv = document.querySelector(".ComentariosRealizados");
    const inputComentario = document.getElementById("inputComentario");
    const botonComentar = document.getElementById("botonComentar");

    // Función para agregar comentarios a la lista sin recargar la página
    const agregarComentarioLocal = (texto) => {
        const p = document.createElement("p");
        p.textContent = texto;
        comentariosDiv.appendChild(p);
    };

    // Obtiene los comentarios desde el backend
    const obtenerComentarios = async () => {
        try {
            const response = await fetch("http://localhost:5156/api/Comment");
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);

            const comentarios = await response.json();
            comentariosDiv.innerHTML = ""; // Limpiar comentarios anteriores

            comentarios.forEach(comentario => {
                agregarComentarioLocal(comentario.texto);
            });
        } catch (error) {
            console.error("Error al obtener comentarios:", error);
        }
    };

    // Función para enviar un nuevo comentario
    const enviarComentario = async () => {
        const texto = inputComentario.value.trim();
        if (!texto) return; // Evita enviar comentarios vacíos

        botonComentar.disabled = true; // Desactiva el botón temporalmente

        try {
            const response = await fetch("http://localhost:5156/api/Comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ texto }) // Ajustado según la estructura de la API
            });

            if (!response.ok) throw new Error(`Error: ${response.statusText}`);

            agregarComentarioLocal(texto); // Agregar comentario sin recargar la página
            inputComentario.value = ""; // Limpia el campo después de enviar
        } catch (error) {
            console.error("Error al enviar comentario:", error);
        } finally {
            botonComentar.disabled = false; // Reactiva el botón después de la petición
        }
    };

    // Cargar comentarios cuando se carga la página
    obtenerComentarios();

    // Agregar evento al botón para enviar comentarios
    botonComentar.addEventListener("click", enviarComentario);

    // Permitir enviar comentario con la tecla Enter
    inputComentario.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            enviarComentario();
        }
    });
});