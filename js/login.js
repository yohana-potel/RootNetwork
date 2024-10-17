let loginForm = document.getElementById("logueo");

loginForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    let textUserName = document.getElementById('usuario').value;
    let textPassword = document.getElementById('contrasena').value;

    let peticion = {
        mail : textUserName, 
        password : textPassword
    };

    getLogin(peticion, 
        (json) => {
            if(json.success) {
                window.location.href = "/muroEtiqta.html";
            } else {
                let errorLabel = document.getElementById("error_label");
                errorLabel.style.display = "block";
                errorLabel.innerText = `* ${json.message}`;
            }
        });

})