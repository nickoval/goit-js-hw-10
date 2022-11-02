document.querySelector("#search-box"),document.querySelector(".country-list"),document.querySelector(".country-info");fetch(`https://restcountries.com/v3.1/name/${"sw"}?fields=name.official,capital,population,flags.svg,languages`).then((e=>{e.json(),console.log(e)})).catch((e=>{console.log(e)}));
//# sourceMappingURL=index.5bff5332.js.map
