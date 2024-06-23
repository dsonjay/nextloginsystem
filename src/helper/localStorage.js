export const removeLocalStorage = (args) => {
    localStorage.removeItem(args)
}

export const getLocalStorage = (args) => {
  return  localStorage.getItem(args);
};