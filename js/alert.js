document.getElementById("btnIniciarSesion").addEventListener("click", function() {
    // Obtenemos los valores de los campos de usuario y contraseña
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;

    // Verificamos si los campos están vacíos
    if (usuario === "" || contrasena === "") {
        // Mostramos una notificación más pequeña y alineada a la derecha
        Toastify({
            text: "Complete todos los campos",
            duration: 3000, // Duración de 3 segundos
            close: true, // Opción para cerrar la notificación
            gravity: "top", // Aparece en la parte superior
            position: "right", // Alineado a la derecha
            stopOnFocus: true, // Evita que se cierre al pasar el ratón por encima
            style: {
                background: "linear-gradient(to right, #ff5f6d, #ffc371)", // Color de fondo
                fontSize: "12px", // Tamaño de fuente más pequeño
                padding: "5px 10px", // Reducción del tamaño de la caja
            },
            onClick: function(){} // Puedes añadir una acción aquí si es necesario
        }).showToast();
    } else {
        // Mostramos una notificación de éxito más pequeña y alineada a la derecha
        Toastify({
            text: "Iniciando sesión...",
            duration: 3000, // Duración de 3 segundos
            close: true, // Opción para cerrar la notificación
            gravity: "top", // Aparece en la parte superior
            position: "right", // Alineado a la derecha
            stopOnFocus: true, // Evita que se cierre al pasar el ratón por encima
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)", // Color de fondo verde
                fontSize: "12px", // Tamaño de fuente más pequeño
                padding: "5px 10px", // Reducción del tamaño de la caja
            },
            onClick: function(){} // Callback en caso de necesitar alguna acción
        }).showToast();
    }
});