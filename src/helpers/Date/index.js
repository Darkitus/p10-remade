export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};

export const getMonth = (date) => MONTHS[date.getMonth() + 1]; // getMonth() retourne un index de 0 à 11, donc on ajoute 1 pour correspondre à notre objet MONTHS

// Pour vérifier quel mois est retourné
// console.log(getMonth(new Date()));
