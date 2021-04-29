
const SetFirstTheme = () => {
  //get theme value from loacal storage
  //if found in localstorage then set
  if (localStorage.getItem("isDark") !== null) {
    if (localStorage.getItem("isDark") === "true") {
      document.body.classList.add("dark");
      document.body.classList.add("bg-coolGray-800");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.remove("bg-coolGray-800");
    
    }
  } else {
    //default color is dark
    localStorage.setItem("isDark", true);
    document.body.classList.add("dark");
    document.body.classList.add("bg-coolGray-800");
  }
};
//default dark
const toggleTheme = () => {
  let t = JSON.parse(localStorage.getItem("isDark"));
  localStorage.setItem("isDark", `${!t}`);
  SetFirstTheme();
};

export { SetFirstTheme, toggleTheme };
