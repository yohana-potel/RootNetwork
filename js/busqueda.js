const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchResultsDiv = document.getElementById('searchResults');

// Función para manejar la búsqueda
async function handleSearch(event) {
  event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

  const query = searchInput.value.trim();
  
  if (!query) {
    searchResultsDiv.innerHTML = ''; // Limpiar los resultados si la búsqueda está vacía
    return;
  }

  try {
    // Realizamos una petición GET al endpoint de la API para obtener usuarios
    const response = await fetch(`/user?query=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      console.error('Error al obtener los usuarios:', response.statusText);
      searchResultsDiv.innerHTML = 'Error al obtener los resultados.';
      return;
    }
    
    // Convertimos la respuesta a formato JSON
    const users = await response.json();
    
    // Mostrar los resultados de la búsqueda
    if (users.length === 0) {
      searchResultsDiv.innerHTML = 'No se encontraron usuarios.';
    } else {
      searchResultsDiv.innerHTML = ''; // Limpiar los resultados anteriores
      users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('search-result-item');
        userDiv.innerHTML = `<a href="perfil_${user.id}.html">${user.name} ${user.lastName}</a>`;
        searchResultsDiv.appendChild(userDiv);
      });
    }
  } catch (error) {
    console.error('Error en la búsqueda de usuarios:', error);
    searchResultsDiv.innerHTML = 'Error al realizar la búsqueda.';
  }
}

// Evento al enviar el formulario
searchForm.addEventListener('submit', handleSearch);