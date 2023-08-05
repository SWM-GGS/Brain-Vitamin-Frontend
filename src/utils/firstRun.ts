export const checkIsFirstRun = () => {
  const isFirstRun = localStorage.getItem('isFirstRun');

  return isFirstRun === null ? true : false;
};

export const setFirstRun = () => {
  localStorage.setItem('isFirstRun', 'false');
};
