export default class PhotographerCard {
  constructor(photographer) {
    this.photographer = photographer;
  }
  // on génère la card d'un photographe
  createPhotographerCard() {
    const article = document.createElement("article");
    const photographerCard = `
            <a href="photographer.html?id=${this.photographer.id}" role="link" aria-label="Voir le profil de ${this.photographer.name}">
                <img class="photographer_thumbnail" src="./assets/images/photographers/thumbnails/${this.photographer.portrait}" alt="${this.photographer.name}">
                <h2 class="photographer_name">${this.photographer.name}</h2>
            </a>
            <p class="photographer_location">${this.photographer.city}, ${this.photographer.country}</p>
            <p class="photographer_tagline">${this.photographer.tagline}</p>
            <span class="photographer_price">${this.photographer.price}€/jour</span>
        `;
    article.innerHTML = photographerCard;
    return article;
  }
}
