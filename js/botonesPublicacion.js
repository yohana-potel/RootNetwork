document.addEventListener("DOMContentLoaded", () => {
  const loveButton = document.getElementById("love");

  // Obtener el usuario autenticado desde localStorage
  const userId = localStorage.getItem("userId");

  if (!userId) {
      alert("Debes iniciar sesión para reaccionar.");
      return;
  }

  loveButton.addEventListener("click", async () => {
      try {
          const postId = 123; // Aquí deberías obtener dinámicamente el ID del post

          const response = await fetch("http://localhost:5156/Reaction", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  userId: userId,
                  postId: postId,
                  type: "like",
              }),
          });

          if (!response.ok) {
              const errorText = await response.text();
              console.error("Error al reaccionar:", errorText);
              alert(`Error: ${errorText}`);
              return;
          }

          const result = await response.json();
          console.log("Reacción guardada:", result);
          alert("¡Reacción guardada correctamente!");
      } catch (error) {
          console.error("Error en la petición:", error);
          alert("Error al enviar la reacción");
      }
  });
});