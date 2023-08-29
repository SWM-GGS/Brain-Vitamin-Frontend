export const checkIsFirstRun = () => {
  const isFirstRun = localStorage.getItem('isFirstRun');

  return isFirstRun === null;
};

export const setFirstRun = () => {
  localStorage.setItem('isFirstRun', 'false');
};
