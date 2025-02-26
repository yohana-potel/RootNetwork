let registrationForm = document.getElementById('formularioRegistro');

registrationForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let fechaNacimiento = document.getElementById('fechaNaciemiento').value; // Corregido
    let correo = document.getElementById('correo').value;
    let contrasena = document.getElementById('contrasena').value;

    let peticion = {
        name: nombre,
        lastName: apellido,
        birthdate: fechaNacimiento, 
        mail: correo, 
        password: contrasena,
        isAdmin: false
    };

    getRegister(peticion, 
        (json) => {
            if(json.success) {
                window.location.assign = "/muroEtiqta.html";
            } else {
                let errorLabel = document.getElementById("error_label");
                errorLabel.style.display = "block";
                errorLabel.innerText = `* ${json.message}`;
            }
        });
});

