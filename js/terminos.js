document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formularioRegistro");
    const termsCheckbox = document.getElementById("terminos");

    form.addEventListener("submit", (event) => {
        if (!termsCheckbox.checked) {
            event.preventDefault(); // Evita que el formulario se envíe
            alert("Debes aceptar los Términos y Condiciones para registrarte.");
        }
    });
});
