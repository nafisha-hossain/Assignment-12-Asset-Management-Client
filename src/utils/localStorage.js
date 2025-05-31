const getUserFromLs = () => {
  return localStorage.getItem('userEmail');
};

const setUserToLs = (email) => {
  console.log(email, '------------------------');
  localStorage.setItem('userEmail', email);
};

const removeUserFromLs = () => {
  localStorage.removeItem('userEmail');
};

export { getUserFromLs, removeUserFromLs, setUserToLs };
