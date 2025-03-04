document.getElementById("btnIniciarSesion").addEventListener("click", async function() {
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;

    if (usuario === "" || contrasena === "") {
        mostrarNotificacion("Complete todos los campos", "#ff5f6d", "#ffc371");
        return;
    }

    try {
        let response = await fetch("http://localhost:5156/Login", { // Ajusta la URL si es diferente
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mail: usuario,
                password: contrasena
            })
        });

        let data = await response.json();

        if (response.ok && data.success) {
            mostrarNotificacion("Inicio de sesión exitoso", "#00b09b", "#96c93d");

            // Puedes guardar los datos en el localStorage o redirigir al usuario
            localStorage.setItem("usuario", JSON.stringify(data));
            setTimeout(() => {
                window.location.href = "dashboard.html"; // Ajusta la página de redirección
            }, 2000);
        } else {
            mostrarNotificacion("Email o contraseña incorrectos", "#ff5f6d", "#ffc371");
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        mostrarNotificacion("Error al conectar con el servidor", "#ff5f6d", "#ffc371");
    }
});

function mostrarNotificacion(mensaje, color1, color2) {
    Toastify({
        text: mensaje,
        duration: 3000, 
        close: true, 
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: `linear-gradient(to right, ${color1}, ${color2})`,
            fontSize: "12px",
            padding: "5px 10px",
        }
    }).showToast();
}
