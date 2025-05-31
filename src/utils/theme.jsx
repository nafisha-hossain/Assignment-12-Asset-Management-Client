const getThemeFromLs = () => {
    const theme = window.localStorage.getItem("theme");
    return theme;
  };
  
  const setThemeToLs = (theme) => {
    localStorage.setItem("theme", theme);
  };
  
  export { getThemeFromLs, setThemeToLs };
  