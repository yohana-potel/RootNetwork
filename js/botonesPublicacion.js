document.addEventListener('DOMContentLoaded', () => {
    // Capturamos el botón por ID
    const loveButton = document.getElementById('love');
  
    // Suponiendo que tienes identificadores de usuario y publicación
    const userId = 1; // Reemplaza con el ID del usuario autenticado
    const postId = 123; // Reemplaza con el ID del post en el que se hace clic
  
    loveButton.addEventListener('click', async () => {
      try {
        const response = await fetch('https://localhost:5156/Reaction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            postId: postId,
            type: 'like', // o el tipo de reacción que prefieras
          }),
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error al reaccionar:', errorText);
          alert(`Error: ${errorText}`);
          return;
        }
  
        const result = await response.json();
        console.log('Reacción guardada:', result);
        alert('¡Reacción guardada correctamente!');
      } catch (error) {
        console.error('Error en la petición:', error);
        alert('Error al enviar la reacción');
      }
    });
  });
  