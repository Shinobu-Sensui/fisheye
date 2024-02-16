import { displayTotalLikes } from "../utils/likes.js";
import { displayLightbox } from "../utils/lightbox.js";

export const openCloseFilterMenu = () => {
  // on récupère les éléments du dom
  const filterMenu = document.querySelector(".dropdown_content");
  const filterMenuButton = document.querySelector(".btn_drop");
  const filterButtons = document.querySelectorAll(".dropdown_content button");
  const btns = document.querySelectorAll(".dropdown button");
  
  // on écoute le click du bouton trier & on ferme les les types de tri non utilisés
  for (let btn of btns) {
    btn.addEventListener("click", () => {
      const isExpanded =
        filterMenuButton.getAttribute("aria-expanded") === "true" || false;
      filterMenuButton.setAttribute("aria-expanded", !isExpanded);
      filterMenu.classList.toggle("curtain_effect");
      document.querySelector(".fa-chevron-up").classList.toggle("rotate");

      const newAriaHiddenValue = filterMenu.classList.contains("curtain_effect")
        ? "false"
        : "true";
      filterMenu.setAttribute("aria-hidden", newAriaHiddenValue);

      const newTabIndexValue = filterMenu.classList.contains("curtain_effect")
        ? "0"
        : "-1";
      filterButtons.forEach((button) =>
        button.setAttribute("tabindex", newTabIndexValue)
      );
    });
  }
};

export const displayMediaWithFilter = (mediasTemplate) => {
  const currentFilter = document.querySelector("#current_filter");
  const allFilters = Array.from(
    document.querySelectorAll(".dropdown_content li button")
  );

  let filterAlreadySelected = allFilters.find(
    (filter) => filter.textContent == currentFilter.textContent
  );
  filterAlreadySelected.style.display = "none";

  allFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      currentFilter.textContent = filter.textContent;
      if (filterAlreadySelected) filterAlreadySelected.style.display = "block";

      filterAlreadySelected = filter;
      filterAlreadySelected.style.display = "none";

      sortByFilter(filter.textContent);
    });
  });

  // gestion des filtres

  const sortByFilter = (filterValue) => {
    switch (filterValue) {
      case "Titre":
        mediasTemplate.medias.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Popularité":
        mediasTemplate.medias.sort((a, b) => b.likes - a.likes);
        break;
      case "Date":
        mediasTemplate.medias.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        break;
    }

    mediasTemplate.createPhotographerMedias();
    const mediasfiltered = mediasTemplate;
    displayLightbox(mediasfiltered);
    displayTotalLikes();

    const mediaElements = document.querySelectorAll(".gallery_card");
    mediaElements.forEach((media, index) => {
      setTimeout(() => {
        media.classList.add("animeCard");
      }, 100 * index);
    });
  };
};
