//https://cors-anywhere.herokuapp.com/

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
<<<<<<< HEAD
  `https://cors-anywhere.herokuapp.com/https://webs.adosclicks.net/uncafecito/db/dbdata.php?query=0&cohorte=${group}&fecha=${date}&format=json`;
=======
  `${
    process.env.REACT_APP_BASE_DOMAIN
  }query=0&cohorte=${group}&fecha=${date}&format=json`;
>>>>>>> DateFormatting

/*
    RESPONSE:
    - JSON
    'TOTAL': NUMBER [0,INF]
  */
export const groupQueryURL = group =>
<<<<<<< HEAD
  `https://cors-anywhere.herokuapp.com/https://webs.adosclicks.net/uncafecito/db/dbdata.php?query=5&cohorte=${group}&format=json`;
=======
  `${process.env.REACT_APP_BASE_DOMAIN}query=5&cohorte=${group}&format=json`;
>>>>>>> DateFormatting

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
<<<<<<< HEAD
  `https://cors-anywhere.herokuapp.com/https://webs.adosclicks.net/uncafecito/db/dbdata.php?query=101&cohorte=${group}&fecha=${date}&nombre=${name}&lugar=${place}&bebida=${drink}&obsbebida=${obsDrink}&comida=${food}&obscomida=${obsFood}&codigo=${code}`;
=======
  `${
    process.env.REACT_APP_BASE_DOMAIN
  }query=101&cohorte=${group}&fecha=${date}&nombre=${name}&lugar=${place}&bebida=${drink}&obsbebida=${obsDrink}&comida=${food}&obscomida=${obsFood}&codigo=${code}`;
>>>>>>> DateFormatting
