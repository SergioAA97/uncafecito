export const FormatDate = (year, month, day) => {
  if (year < 2000) year = 2000;
  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;
  return `${year}${month}${day}`;
};
