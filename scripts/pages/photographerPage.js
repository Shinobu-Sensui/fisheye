import Api from "../api/Api.js";

//template
import PhotographerHeader from "../templates/PhotographerHeader.js";
import PhotographerMedias from "../templates/PhotographerMedias.js";

//model
import Photographer from "../models/Photographer.js";

//factory
import MediasFactory from "../factories/MediasFactory.js";

//ultils
import { displayTotalLikes } from "../utils/likes.js";
import { openCloseFormContact, validateForm } from "../utils/form.js";
import {
  openCloseFilterMenu,
  displayMediaWithFilter,
} from "../utils/filter.js";
import { displayLightbox } from "../utils/lightbox.js";

// On récupère les data
const photographersApi = new Api("./data/photographers.json");

// On match le photographe grâce à l'id de l'url
const photographerId = new URLSearchParams(window.location.search).get("id");

export const getPhotographerById = async () => {
  // On récupère les données formatées sous forme de tableau contenant des objets
  const { photographers, media } = await photographersApi.get();
  // On matche avec l'id du photographe
  const photographer = photographers
    .map((photographer) => new Photographer(photographer))
    .find((photographer) => photographer.id == photographerId);

  // On matche avec l'id du media
  const medias = media
    .map((media) => new MediasFactory(media))
    .filter((media) => media.photographerId == photographerId);
  return { photographer, medias };
};

const displayProfilePage = async () => {
  const { photographer, medias } = await getPhotographerById();
  const headerTemplate = new PhotographerHeader(photographer);
  headerTemplate.createPhotographerHeader();
  const mediasTemplate = new PhotographerMedias(photographer, medias);
  mediasTemplate.createPhotographerMedias();

  displayTotalLikes();
  openCloseFormContact();
  validateForm();
  openCloseFilterMenu();
  displayMediaWithFilter(mediasTemplate);
  displayLightbox(mediasTemplate);
};

displayProfilePage();
