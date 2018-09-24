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
  `https://webs.adosclicks.net/uncafecito/db/dbdata.php?query=0&cohorte=${group}&fecha=${date}&format=json`;

/*
    RESPONSE:
    - JSON
    'TOTAL': NUMBER [0,INF]
  */
export const groupQueryURL = group =>
  `https://webs.adosclicks.net/uncafecito/db/dbdata.php?query=5&cohorte=${group}&format=json`;
