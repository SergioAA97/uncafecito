//https://cors-anywhere.herokuapp.com/

export const baseDomain =
  "https://cors-anywhere.herokuapp.com/https://webs.adosclicks.net/uncafecito/db/dbdata.php?&format=json";

/*
    RESPONSE:
    - JSON
    [{
      Bebida: string, 
      Codigo: string, 
      Cohorte: string, 
      Comida: string,
      Fecha: string, ==> format = yyyymmdd
      Lugar: string,
      Nombre: string,
      ObsBebida: string,
      ObsComida: string
    }]
  */

export const elementsQueryURL = (group, date) =>
  `https://cors-anywhere.herokuapp.com/https://webs.adosclicks.net/uncafecito/db/dbdata.php?query=0&cohorte=${group}&fecha=${date}&format=json`;

/*
    RESPONSE:
    - JSON
    'TOTAL': NUMBER [0,INF]
  */
export const groupQueryURL = group =>
  `https://cors-anywhere.herokuapp.com/https://webs.adosclicks.net/uncafecito/db/dbdata.php?query=5&cohorte=${group}&format=json`;

export const addOrderURL = ({
  group,
  date,
  name,
  place = "LosRotos",
  drink,
  obsDrink,
  food,
  obsFood,
  code = "1234"
}) =>
  `https://cors-anywhere.herokuapp.com/https://webs.adosclicks.net/uncafecito/db/dbdata.php?query=101&cohorte=${group}&fecha=${date}&nombre=${name}&lugar=${place}&bebida=${drink}&obsbebida=${obsDrink}&comida=${food}&obscomida=${obsFood}&codigo=${code}`;
