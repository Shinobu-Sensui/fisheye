export default class Photographe {
  // Le constructeur prend un objet 'data' en paramètre contenant les informations du photographe
  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.portrait = data.portrait;
  }
}
