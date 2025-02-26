import { crearPublicacionAPI } from './publishingRepository.js'; // Asumimos que esta función existe y maneja el backend

document.addEventListener("DOMContentLoaded", iniciarApp);

async function iniciarApp() {
    const userName = localStorage.getItem("userName");
    const lastName = localStorage.getItem("lastName");
    const userId = localStorage.getItem("userId");

    if (userName && lastName) {
        const fullName = `${userName} ${lastName}`;
        document.getElementById("userName").textContent = fullName;
    } else {
        console.error("El nombre o el apellido no están disponibles en localStorage.");
    }

    // Formulario de creación de publicación
    const formulario = document.getElementById("publi");

    formulario.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evitar que se recargue la página

        const texto = document.getElementById("text").value.trim();
        const imageUrl = document.getElementById("imageUrl").value.trim();

        if (!texto || !imageUrl) {
            document.getElementById("error_label").textContent = "El texto y la URL de la imagen son obligatorios.";
            document.getElementById("error_label").style.display = "block";
            return;
        }

        const nuevaPublicacion = {
            text: texto,
            imageUrl: imageUrl,
            userId: userId,
            userName: userName,
            lastName: lastName
        };

        try {
            const response = await crearPublicacionAPI(nuevaPublicacion); // Llamamos a la función para crear la publicación
            if (response.success) {
                alert("¡Publicación creada con éxito!");
                window.location.href = "muroEtiqta.html"; // Redirige al muro después de crear la publicación
            } else {
                alert("Hubo un error al crear la publicación.");
            }
        } catch (error) {
            console.error("Error al crear la publicación:", error);
            alert("Hubo un error al crear la publicación.");
        }
    });
}