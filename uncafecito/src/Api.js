export const baseDomain =
  "https://cors-anywhere.herokuapp.com/https://webs.adosclicks.net/uncafecito/db/dbdata.php?&format=json";

export const elementsQueyURL = (group, date) =>
  `https://cors-anywhere.herokuapp.com/https://webs.adosclicks.net/uncafecito/db/dbdata.php?query=0&cohorte=${group}&fecha=${date}&format=json`;
