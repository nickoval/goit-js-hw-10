export function markupCountriesList({ flags, name }) {
  return ` 
  <li class='country-item'> 
    <img src='${flags.svg}' alt='${name.official}' width='150'/>
    <h3 class='country-name'>${name.official}</h3> 
  </li>`;
}

export function markupCountryInfo({
  flags,
  name,
  capital,
  population,
  languages,
}) {
  return `  
    <img src='${flags.svg}' alt='${name.official}' width='200'/>
    <h2 class='country-name'>${name.official}</h2>  
    <p class='country-capital'><b>Capital: </b>${capital}</p>
    <p class='country-population'><b>Population: </b>${population}</p>  
    <p class='country-languages'><b>Languages: </b>${Object.values(
      languages
    )}</p>
    `;
}
