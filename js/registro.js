document.addEventListener("DOMContentLoaded", function () {
    let registrationForm = document.getElementById('formularioRegistro');

    if (!registrationForm) {
        console.error("El formulario de registro no se encontró en el DOM.");
        return;
    }

    registrationForm.addEventListener("submit", (evt) => {
        evt.preventDefault();

        let nombre = document.getElementById('nombre');
        let apellido = document.getElementById('apellido');
        let fechaNacimiento = document.getElementById('fechaNacimiento'); // Corregido
        let correo = document.getElementById('correo');
        let contrasena = document.getElementById('contrasena');

        if (!nombre || !apellido || !fechaNacimiento || !correo || !contrasena) {
            console.error("Uno o más campos del formulario no se encontraron.");
            return;
        }

        let peticion = {
            name: nombre.value,
            lastName: apellido.value,
            birthdate: fechaNacimiento.value,
            mail: correo.value,
            password: contrasena.value,
            isAdmin: false
        };

        getRegister(peticion, (json) => {
            console.log("📥 Respuesta del servidor:", json);
        
            // En lugar de json.success, verifica si json.id existe y es mayor a 0
            if (json.id && json.id > 0) {  
                alert("✅ Registro exitoso. Redirigiendo al login...");
                window.location.href = "/muroEtiqta.html"; // O "" si quieres enviarlo al muro directamente
            } else {
                let errorLabel = document.getElementById("error_label");
                errorLabel.style.display = "block";
                errorLabel.innerText = ` ${json.message || "Error en el registro"}`;
            }
        });
        
    });
});