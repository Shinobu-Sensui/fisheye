/**
 * Classe Api contenant des fonctionnalités utilitaires
 */
export default class Api {
    /**
     * Constructeur de la classe Api.
     * @param {string} url - L'URL de base pour les requêtes.
     */
    constructor(url) {
      this.url = url;
    }
  
    /**
     * Effectue une requête GET à l'URL spécifiée.
     * @returns {Promise} - Une promesse qui résout avec les données de la réponse JSON ou est rejetée avec une erreur.
     */
    async get() {
      try {
        // Effectue la requête GET à l'URL
        const response = await fetch(this.url);
  
        // Vérifie si la requête a réussi (statut HTTP 200-299)
        if (!response.ok) {
          throw new Error(`Erreur lors de la requête : ${response.status} ${response.statusText}`);
        }
  
        // Analyse la réponse JSON
        const data = await response.json();
        
        // Renvoie les données obtenues
        return data;
      } catch (error) {
        // Capture et rejette toute erreur survenue pendant la requête
        throw new Error(`Erreur lors de la requête : ${error.message}`);
      }
    }
  }
  