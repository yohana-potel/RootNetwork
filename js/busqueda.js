document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que la página se recargue

        const searchQuery = searchInput.value.trim(); // Obtiene el texto ingresado
        if (searchQuery) {
            // Redirige a la página de resultados con el término de búsqueda en la URL
            window.location.href = `resultadoBusqueda.html?query=${encodeURIComponent(searchQuery)}`;
        }
    });
});
