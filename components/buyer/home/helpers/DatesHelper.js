const getDates = (date) => {
  const dateArr = [];
  if (date == 'today') {
    return getCurrentDate();
  }

  if (date == 'tomorrow') {
    return getCustomDate(1);
  }

  if (date == 'this-week') {
    dateArr[0] = getCurrentDate();
    dateArr[1] = getCustomDate(6);
    return dateArr;
  }

  if (date == 'this-month') {
    dateArr[0] = getCurrentDate();
    dateArr[1] = getCustomDate(30);
    return dateArr;
  }

  if (date == 'single-custom-date') {
    return dateArr[0] = 'single-custom-date';
  }

  if (date == 'custom-date-range') {
    return dateArr[0] = 'custom-date-range';
  }
};

const getCustomDate = (days) => {
  return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + days);
};

const getCurrentDate = () => {
  return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
};

const selectOpenHouse = (selectedDates) => {
  let date = [];
  date = getDates(selectedDates);
  return date;
};

export default selectOpenHouse;
