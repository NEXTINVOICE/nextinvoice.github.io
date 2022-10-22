export const getCurrDate = (offset = 0) => {
  let currDate = new Date();
  currDate.setDate(currDate.getDate() + offset);
  return currDate.toISOString().split("T")[0];
};

export const setOffset = (mydate) => {
  const date = new Date(mydate);
  date.setDate(date.getDate() + 1);
  return date.toISOString().split("T")[0];
};
