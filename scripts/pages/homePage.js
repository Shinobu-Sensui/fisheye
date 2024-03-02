import Api from "../api/Api.js";
import Photographer from "../models/Photographer.js";
import PhotographerCard from "../templates/HomePage.js";

const photographersSection = document.querySelector(".main_photographers");
const photographersApi = new Api("./data/photographers.json");

const displayPhotographers = async () => {
  // on récupère les data des photographes
  const photographersData = await photographersApi.get();
  const photographers = photographersData.photographers;
  // on map sur tous les photographes et on attribue leurs valeurs à leurs classes respectives
  photographers
    .map((photographer) => new Photographer(photographer))
    // on créé nos cards via la classe photographerCard en récupérant les valeurs des classes
    .forEach((photographer) => {
      const template = new PhotographerCard(photographer);
      const photographerCard = template.createPhotographerCard();
      photographersSection.appendChild(photographerCard);
    });
};

displayPhotographers();
