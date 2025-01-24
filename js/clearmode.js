const body = document.body;
const btnDarkMode = document.getElementById("dark_mode");
const moonPath = btnDarkMode ? btnDarkMode.querySelector("path") : null;

// Cambia al modo oscuro
function switchToDarkMode() {
    body.classList.add("dark");
    if (moonPath) moonPath.setAttribute("fill", "#f1c40f"); // Cambia el color de la luna (si existe)
    localStorage.setItem("mode", "dark"); // Guarda el modo en localStorage
}

// Cambia al modo claro
function switchToLightMode() {
    body.classList.remove("dark");
    if (moonPath) moonPath.setAttribute("fill", "#16765a"); // Cambia el color de la luna (si existe)
    localStorage.setItem("mode", "clear"); // Guarda el modo en localStorage
}

// Aplica el modo actual al cargar la página
function applyStoredMode() {
    const mode = localStorage.getItem("mode");
    if (mode === "dark") {
        switchToDarkMode();
    } else {
        switchToLightMode();
    }
}

// Escucha el clic en el botón (solo si existe)
if (btnDarkMode) {
    btnDarkMode.addEventListener("click", () => {
        const mode = localStorage.getItem("mode");
        if (mode === "dark") {
            switchToLightMode();
        } else {
            switchToDarkMode();
        }
    });
}

// Sincroniza las pestañas escuchando cambios en localStorage
window.addEventListener("storage", (event) => {
    if (event.key === "mode") {
        applyStoredMode();
    }
});

// Aplica el modo al cargar la página
applyStoredMode();

