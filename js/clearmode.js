const body = document.body;
const btnDarkMode = document.getElementById("dark_mode");
const slider = btnDarkMode.querySelector(".slider");

// Cambia al modo oscuro
function switchToDarkMode() {
    body.classList.add("dark");
    localStorage.setItem("mode", "dark");
}

// Cambia al modo claro
function switchToLightMode() {
    body.classList.remove("dark");
    localStorage.setItem("mode", "clear");
}

// Aplica el modo guardado
function applyStoredMode() {
    const mode = localStorage.getItem("mode");
    if (mode === "dark") {
        switchToDarkMode();
    } else {
        switchToLightMode();
    }
}

// Evento de clic en el switch
btnDarkMode.addEventListener("click", () => {
    if (body.classList.contains("dark")) {
        switchToLightMode();
    } else {
        switchToDarkMode();
    }
});

// Aplica el modo al cargar la página
applyStoredMode();
