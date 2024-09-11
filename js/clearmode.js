const body = document.body;
const btnDarkMode = document.getElementById("dark_mode");
const moonPath = btnDarkMode.querySelector("path");

btnDarkMode.addEventListener("click", (e) => {
    const mode = localStorage.getItem("mode");

    if (mode === "dark") {
        // Cambia al modo claro
        body.classList.remove("dark");
        moonPath.setAttribute("fill", "#16765a"); // Cambia el color de la luna al modo claro
        localStorage.setItem("mode", "clear");
    } else {
        // Cambia al modo oscuro
        body.classList.add("dark");
        moonPath.setAttribute("fill", "#f1c40f"); // Cambia el color de la luna al modo oscuro (por ejemplo, amarillo)
        localStorage.setItem("mode", "dark");
    }
});

// Al cargar la página, aplica el modo guardado
const mode = localStorage.getItem("mode");

if (mode === "dark") {
    body.classList.add("dark");
    moonPath.setAttribute("fill", "#f1c40f"); // Modo oscuro
} else {
    body.classList.remove("dark");
    moonPath.setAttribute("fill", "#16765a"); // Modo claro
}
