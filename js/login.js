let loginForm = document.getElementById('logueo');

loginForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    let textUserName = document.getElementById('usuario').value;
    let textPassword = document.getElementById('contrasena').value;

    let peticion = {
        mail: textUserName,
        password: textPassword
    };

    getLogin(peticion, (json) => {
        console.log("Respuesta completa del servidor:", json); // 🔍 Ver qué datos devuelve el backend
    
        if (json.id) { // Si la respuesta tiene un ID, el usuario inició sesión correctamente
            localStorage.setItem("userId", json.id);
            localStorage.setItem("userName", json.name);
            localStorage.setItem("lastName", json.lastName);
            window.location.href = "/muroEtiqta.html";
        } else {
            let errorLabel = document.getElementById("error_label");
            errorLabel.style.display = "block";
            errorLabel.innerText = `* ${json.message || "Error en el inicio de sesión"}`;
        }
    });
});
