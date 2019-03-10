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
  `https://cors-anywhere.herokuapp.com/https://webs.adosclicks.net/uncafecito/db/dbdata.php?query=0&cohorte=${group}&fecha=${date}&format=json`;

/*
    RESPONSE:
    - JSON
    'TOTAL': NUMBER [0,INF]
  */
export const groupQueryURL = group =>
  `https://cors-anywhere.herokuapp.com/https://webs.adosclicks.net/uncafecito/db/dbdata.php?query=5&cohorte=${group}&format=json`;

/*
    RESPONSE:
    - JSON
    _id
    Cohorte : STRING
    users : ARRAY[STRING]

    NOT FOUND RESPONSE:
    false : Bool
*/
export const getGroupQueryURL = () => 
  `https://eu-west-1.aws.webhooks.mongodb-stitch.com/api/client/v2.0/app/uncafecito-bbfml/service/endpoint/incoming_webhook/getGroup`


export const createGroupQueryURL = () => 
  `https://eu-west-1.aws.webhooks.mongodb-stitch.com/api/client/v2.0/app/uncafecito-bbfml/service/endpoint/incoming_webhook/createGroup?secret=uncafecitosecret`


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

