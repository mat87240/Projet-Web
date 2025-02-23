document.addEventListener("DOMContentLoaded", () => {
  // Sélection des éléments du DOM
  const profileButton = document.getElementById("profile-button");
  const popupForm = document.getElementById("popup-Form-login");
  const cancelButton = document.getElementById("cancel-button");
  const registerMsg = document.getElementById("register-msg");
  const registerForm = document.getElementById("popup-Form-register");

    // Ajout d'un événement au clic sur le texte
    registerMsg.addEventListener("click", function () {
        popupForm.style.display = "none";
        registerForm.style.display = "block";
    });

  // Vérification si les éléments existent
  if (profileButton && popupForm && cancelButton) {
      // Écouteur d'événement pour ouvrir le formulaire
      profileButton.addEventListener("click", () => {
        if (popupForm.style.display === "block" && registerForm.style.display === "none") {
            closeForm(); // Si ouvert, fermer
        }if (popupForm.style.display === "none" && registerForm.style.display === "block") {
            registerForm.style.display = "none";
        } else {
            openForm(); // Sinon, ouvrir
        }
    });

      // Écouteur d'événement pour fermer le formulaire
      cancelButton.addEventListener("click", () => {
          closeForm();
      });

      // Fermer le formulaire en cliquant à l'extérieur
      document.addEventListener("click", (event) => {
          if (!popupForm.contains(event.target) && !profileButton.contains(event.target) && !registerForm.contains(event.target)) {
              closeForm();
          }
      });
  } else {
      console.error("❌ Erreur : Les éléments nécessaires ne sont pas trouvés !");
  }

  function openForm() {
    popupForm.style.display = "block";
    document.body.classList.add("popup-open");
}

function closeForm() {
    popupForm.style.display = "none";
    registerForm.style.display = "none";
    document.body.classList.remove("popup-open");
}
});
