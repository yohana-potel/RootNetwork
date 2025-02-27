document.addEventListener("DOMContentLoaded", function () {
    let registrationForm = document.getElementById('formularioRegistro');
    let termsCheckbox = document.getElementById('terminos'); // Agregar referencia al checkbox

    if (!registrationForm) {
        console.error("El formulario de registro no se encontró en el DOM.");
        return;
    }

    registrationForm.addEventListener("submit", (evt) => {
        evt.preventDefault();

        if (!termsCheckbox.checked) { 
            alert("Debes aceptar los Términos y Condiciones para registrarte.");
            return; // Detiene el proceso si no están aceptados
        }

        let nombre = document.getElementById('nombre');
        let apellido = document.getElementById('apellido');
        let fechaNacimiento = document.getElementById('fechaNacimiento');
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
            console.log("Respuesta del servidor:", json);
        
            if (json.id && json.id > 0) {  
                localStorage.setItem("userId", json.id);
                localStorage.setItem("userName", json.name);
                localStorage.setItem("lastName", json.lastName);
                
                alert("Registro exitoso. Redirigiendo al muro...");
                window.location.href = "/muroEtiqta.html"; 
            } else {
                let errorLabel = document.getElementById("error_label");
                if (errorLabel) {
                    errorLabel.style.display = "block";
                    errorLabel.innerText = ` ${json.message || "Error en el registro"}`;
                }
            }
        });
    });
});