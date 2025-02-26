document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.querySelector(".nav-link[href='index.html']");

    if (logoutButton) {
        logoutButton.addEventListener("click", function (event) {
            event.preventDefault(); // Evita la redirección inmediata

            // Eliminar los datos de sesión del usuario
            localStorage.removeItem("userId");
            localStorage.removeItem("userName");
            localStorage.removeItem("lastName");

            // Redirigir al usuario a la página de inicio de sesión
            window.location.href = "index.html";
        });
    }
});
